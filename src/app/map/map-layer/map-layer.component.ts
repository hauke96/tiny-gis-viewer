import {Component, DestroyRef, Input, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../map.service';
import {Layer as OlLayer} from 'ol/layer';
import {Layer, WmsLayer, XyzLayer} from '../layer';
import ImageLayer from 'ol/layer/Image';
import {ImageWMS, XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {Coordinate} from 'ol/coordinate';
import {ConfigService} from '../../config/config.service';
import {ProjectionLike} from 'ol/proj';
import {HttpClient} from '@angular/common/http';
import {GeoJSON} from 'ol/format';
import {FeatureSelectionService} from '../feature-selection.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Feature} from 'ol';
import GML32 from 'ol/format/GML32';
import GML2 from 'ol/format/GML2';
import GML3 from 'ol/format/GML3';

@Component({
  selector: 'app-map-layer',
  imports: [],
  template: '',
})
export class MapLayerComponent implements OnInit, OnDestroy {
  @Input()
  public layer!: Layer;

  private geoJSON: GeoJSON;
  private gml32: GML32;
  private gml3: GML3;
  private gml2: GML2;
  private olLayer: OlLayer | undefined;

  constructor(
    private mapService: MapService,
    private configService: ConfigService,
    private httpClient: HttpClient,
    private featureSelectionService: FeatureSelectionService,
    private destroyRef: DestroyRef
  ) {
    this.geoJSON = new GeoJSON();
    this.gml32 = new GML32();
    this.gml3 = new GML3();
    this.gml2 = new GML2();
  }

  ngOnInit(): void {
    if (this.layer instanceof WmsLayer) {
      let wmsSource = new ImageWMS({
        url: this.layer.url,
        params: {'LAYERS': this.layer.name}
      });
      this.olLayer = new ImageLayer({
        source: wmsSource
      });

      let legendGraphicUrl = wmsSource.getLegendUrl(undefined);
      if (legendGraphicUrl) {
        this.layer.legendGraphicUrl = legendGraphicUrl;
      }
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

    this.layer.visible.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((visible) => this.olLayer?.setVisible(visible));
    this.mapService.clicked.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event && this.layer.queryable) {
        this.selectFeaturesAtCoordinate(event.coordinate, event.resolution, event.projection);
      }
    });
  }

  public ngOnDestroy() {
    if (!!this.olLayer) {
      this.mapService.removeLayer(this.olLayer);
    }
  }

  private selectFeaturesAtCoordinate(coordinate: Coordinate, resolution: number | undefined, projection: ProjectionLike | undefined) {
    if (!this.olLayer || !resolution || !projection || !this.olLayer.isVisible()) {
      return;
    }

    let source = this.olLayer.getSource() as ImageWMS;

    let featureFormat: 'geojson' | 'gml32' | 'gml3' | 'gml2' | undefined = undefined;
    let infoRequestMimeType = undefined;
    if (this.layer instanceof WmsLayer) {
      infoRequestMimeType = this.getBestGeoJsonMatch(this.layer.featureInfoResponseTypes);
      if (!!infoRequestMimeType) {
        featureFormat = 'geojson';
      }

      if (!infoRequestMimeType) {
        infoRequestMimeType = this.getBestGML32Match(this.layer.featureInfoResponseTypes);
        if (!!infoRequestMimeType) {
          featureFormat = 'gml32';
        }
      }

      if (!infoRequestMimeType) {
        infoRequestMimeType = this.getBestGML3Match(this.layer.featureInfoResponseTypes);
        if (!!infoRequestMimeType) {
          featureFormat = 'gml3';
        }
      }

      if (!infoRequestMimeType) {
        infoRequestMimeType = this.getBestGML2Match(this.layer.featureInfoResponseTypes);
        if (!!infoRequestMimeType) {
          featureFormat = 'gml2';
        }
      }
    }

    if (!infoRequestMimeType) {
      console.log("No supported MIME format (GeoJSON, GML32, GML3, GML2) for layer " + this.layer.name + " found. I'll try GeoJSON.");
      infoRequestMimeType = "application/geo+json";
      featureFormat = 'geojson';
    }

    let featureInfoUrl = source.getFeatureInfoUrl(
      coordinate,
      resolution,
      projection,
      {
        "INFO_FORMAT": infoRequestMimeType,
        "FEATURE_COUNT": this.configService.currentConfig?.queryFeatureCount ?? 3,
        "WITH_GEOMETRY": "TRUE"
      }
    );
    if (!featureInfoUrl) {
      console.log("Could not query features: No feature info URL for layer " + this.layer.name + " could be created");
      return;
    }

    this.httpClient.get(featureInfoUrl, {responseType: 'text'}).subscribe(response => {
      let features: Feature[] = [];
      switch (featureFormat) {
        case "geojson":
          features = this.geoJSON.readFeatures(response);
          break;
        case "gml32":
          features = this.gml32.readFeatures(response);
          break;
        case "gml3":
          features = this.gml3.readFeatures(response);
          break;
        case "gml2":
          features = this.gml2.readFeatures(response);
          break;
      }
      this.featureSelectionService.setSelectedFeaturesOnMap([coordinate, this.layer, features]);
    })
  }

  private getBestGeoJsonMatch(mimeTypes: string[]): string | undefined {
    return mimeTypes.find(mimeType => {
      mimeType = mimeType.toLowerCase();
      return mimeType.includes("geojson") || mimeType.includes("geo+json");
    })
  }

  private getBestGML32Match(mimeTypes: string[]): string | undefined {
    return mimeTypes.find(mimeType => {
      mimeType = mimeType.toLowerCase();
      return mimeType.includes("gml/3.2") || mimeType.match("gml.*version=3\.2");
    })
  }

  private getBestGML3Match(mimeTypes: string[]): string | undefined {
    return mimeTypes.find(mimeType => {
      mimeType = mimeType.toLowerCase();
      return mimeType.includes("gml/3.") || mimeType.match("gml.*version=3\.");
    })
  }

  private getBestGML2Match(mimeTypes: string[]): string | undefined {
    return mimeTypes.find(mimeType => {
      mimeType = mimeType.toLowerCase();
      return mimeType.includes("gml/2.") || mimeType.match("gml.*version=2\.");
    })
  }
}
