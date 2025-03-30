import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Feature} from 'ol';
import {MapService} from '../map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Fill, Stroke, Style} from 'ol/style';
import {Layer} from '../../layer/layer';
import {FeatureLike} from 'ol/Feature';

@Component({
  selector: 'app-feature-layer',
  imports: [],
  templateUrl: './feature-layer.component.html',
  styleUrl: './feature-layer.component.scss',
})
export class FeatureLayerComponent implements OnInit, OnDestroy {
  public _features: Feature[] = [];
  @Input()
  set features(features: Map<Layer, Feature[]>) {
    this._features = Array.from(features.keys()).flatMap(key => features.get(key) ?? []);
    if (this.vectorSource && this.vectorLayer) {
      this.vectorSource.clear();
      this.vectorSource.addFeatures(this._features);
    }
  }

  private vectorSource: VectorSource | undefined = undefined;
  private vectorLayer: VectorLayer | undefined = undefined;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.vectorSource = new VectorSource();

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: (feature, resolution) => this.getStyle(feature, resolution),
      zIndex: 1000 // show selection above everything else
    });

    this.mapService.addLayer(this.vectorLayer);
  }

  ngOnDestroy(): void {
    this.mapService.removeLayer(this.vectorLayer!);
  }

  private getStyle(feature: FeatureLike, resolution: number): Style {
    let stroke = new Stroke({
      color: '#42a5f5',
      width: 2,
    });

    let geometryType = feature.getGeometry()!.getType();
    if (geometryType === 'LineString' || geometryType === 'MultiLineString') {
      stroke.setWidth(5);
    }

    return new Style({
      stroke: stroke,
      fill: new Fill({
        color: '#e3f2fdc0'
      })
    });
  }
}
