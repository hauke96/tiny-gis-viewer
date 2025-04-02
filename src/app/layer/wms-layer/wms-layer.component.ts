import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../map/map.service';
import {Layer as OlLayer} from 'ol/layer';
import {Layer, WmsLayer, XyzLayer} from '../layer';
import ImageLayer from 'ol/layer/Image';
import {ImageWMS, XYZ} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {Unsubscriber} from '../../common/unsubscriber';

@Component({
  selector: 'app-wms-layer',
  imports: [],
  template: '',
})
export class WmsLayerComponent extends Unsubscriber implements OnInit, OnDestroy {
  @Input()
  public layer!: Layer;

  private olLayer: OlLayer | undefined;

  constructor(private mapService: MapService) {
    super();
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
      return;
    }

    this.olLayer.setProperties({"__TGV_LAYER__": this.layer});

    if (this.layer.attribution && this.layer.attribution.trim() !== "") {
      this.olLayer.getSource()?.setAttributions([this.layer.attribution]);
    }

    this.unsubscribeLater(this.layer.visible.subscribe((visible) => this.olLayer?.setVisible(visible)));

    this.mapService.addLayer(this.olLayer);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();

    if (!!this.olLayer) {
      this.mapService.removeLayer(this.olLayer);
    }
  }
}
