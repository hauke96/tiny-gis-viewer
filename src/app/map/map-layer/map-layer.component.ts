import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../map/map.service';
import {Layer as OlLayer} from 'ol/layer';
import {Layer, WmsLayer, XyzLayer} from '../layer';
import ImageLayer from 'ol/layer/Image';
import {ImageWMS, XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {Unsubscriber} from '../../common/unsubscriber';
import {Coordinate} from 'ol/coordinate';
import {ConfigService} from '../../config/config.service';
import {ProjectionLike} from 'ol/proj';
import {HttpClient} from '@angular/common/http';
import {GeoJSON} from 'ol/format';
import {FeatureSelectionService} from '../../feature/feature-selection.service';

@Component({
  selector: 'app-map-layer',
  imports: [],
  template: '',
})
export class MapLayerComponent extends Unsubscriber implements OnInit, OnDestroy {
  @Input()
  public layer!: Layer;

  private geoJSON: GeoJSON;
  private olLayer: OlLayer | undefined;

  constructor(
    private mapService: MapService,
    private configService: ConfigService,
    private httpClient: HttpClient,
    private featureSelectionService: FeatureSelectionService
  ) {
    super();

    this.geoJSON = new GeoJSON();
  }

  ngOnInit(): void {
    if (this.layer instanceof WmsLayer) {
      this.olLayer = new ImageLayer({
        source: new ImageWMS({
          url: this.layer.url,
          params: {'LAYERS': this.layer.name}
        })
      });
    } else if (this.layer instanceof XyzLayer) {
      this.olLayer = new TileLayer({
        source: new XYZ({
          url: this.layer.url,
        })
      });
    } else {
      throw new Error(`Unsupported map type ${this.layer.constructor.name}`);
    }

    this.olLayer.setProperties({"__TGV_LAYER__": this.layer});

    if (this.layer.attribution && this.layer.attribution.trim() !== "") {
      this.olLayer.getSource()?.setAttributions([this.layer.attribution]);
    }

    this.mapService.addLayer(this.olLayer);

    this.unsubscribeLater(
      this.layer.visible.subscribe((visible) => this.olLayer?.setVisible(visible)),
      this.mapService.clicked.subscribe(event => {
        if (event && this.layer.queryable) {
          this.selectFeaturesAtCoordinate(event.coordinate, event.resolution, event.projection);
        }
      }),
    )
  }

  override ngOnDestroy() {
    super.ngOnDestroy();

    if (!!this.olLayer) {
      this.mapService.removeLayer(this.olLayer);
    }
  }

  private selectFeaturesAtCoordinate(coordinate: Coordinate, resolution: number | undefined, projection: ProjectionLike | undefined) {
    if (!this.olLayer || !resolution || !projection || !this.olLayer.isVisible()) {
      return;
    }

    let source = this.olLayer.getSource() as ImageWMS;

    let featureInfoUrl = source.getFeatureInfoUrl(
      coordinate,
      resolution,
      projection,
      {
        "INFO_FORMAT": "application/geo+json",
        "FEATURE_COUNT": this.configService.currentConfig?.queryFeatureCount ?? 3,
        "WITH_GEOMETRY": "TRUE"
      }
    );
    if (!featureInfoUrl) {
      return;
    }

    this.httpClient.get<string>(featureInfoUrl).subscribe(response => {
      let features = this.geoJSON.readFeatures(response);
      this.featureSelectionService.setSelectedFeaturesOnMap([coordinate, this.layer, features]);
    })
  }
}
