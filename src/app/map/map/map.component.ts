import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import {ImageWMS, OSM} from 'ol/source';
import {Layer as OlLayer} from 'ol/layer';
import {Feature, Map as OlMap, MapBrowserEvent, MapEvent, Overlay, View} from 'ol';
import {LayerService} from '../../layer/layer.service';
import {Unsubscriber} from '../../common/unsubscriber';
import {Layer} from '../../layer/layer';
import {forkJoin, map, of, Subscription} from 'rxjs';
import ImageLayer from 'ol/layer/Image';
import {ConfigService} from '../../config/config.service';
import {ViewOptions} from 'ol/View';
import {HttpClient} from '@angular/common/http';
import {GeoJSON} from 'ol/format';
import {FeatureSelectionService} from '../../feature/feature-selection.service';
import {MapService} from '../map.service';
import BaseLayer from 'ol/layer/Base';
import {Draw, Modify} from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {Geometry, LineString, Point, Polygon} from 'ol/geom';
import {getArea, getLength} from 'ol/sphere';
import {FeatureLike} from 'ol/Feature';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends Unsubscriber implements OnInit {
  public map: OlMap;

  private layerSubscriptions: Subscription[] = [];
  private layerMapping: Map<Layer, OlLayer> = new Map<Layer, OlLayer>();

  private measureLengthSource!: VectorSource;
  private measureLengthLayer!: VectorLayer;
  private measureLengthDrawInteraction!: Draw;
  private measureLengthModifyInteraction!: Modify;

  public constructor(
    private mapService: MapService,
    private layerService: LayerService,
    private featureSelectionService: FeatureSelectionService,
    private httpClient: HttpClient,
    private configService: ConfigService,
  ) {
    super();

    let defaultViewOptions: ViewOptions = {
      center: [1110161, 7085688], // Hamburg, Germany
      projection: 'EPSG:3857',
      zoom: 14,
      minZoom: 0,
      maxZoom: 22,
    };

    let storedMapCenter = localStorage.getItem('map_center');
    let storedMapZoom = localStorage.getItem('map_zoom');
    let storedViewOptions: ViewOptions = {
      center: storedMapCenter ? JSON.parse(storedMapCenter) : defaultViewOptions.center,
      zoom: storedMapZoom ? JSON.parse(storedMapZoom) : defaultViewOptions.zoom,
    }

    this.initLengthMeasurement();

    this.map = new OlMap({
      controls: [
        new ScaleLine(),
        new Attribution()
      ],
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.measureLengthLayer
      ],
      view: new View({
        ...defaultViewOptions,
        ...configService.config?.mapView,
        ...storedViewOptions
      })
    });

    this.map.addInteraction(this.measureLengthModifyInteraction);
    this.measureLengthModifyInteraction.setActive(false);

    this.map.addInteraction(this.measureLengthDrawInteraction);
    this.measureLengthDrawInteraction.setActive(false);
  }

  // TODO Refactor this part to make it more generic ans ready to polygon measurements
  private initLengthMeasurement() {
    this.measureLengthSource = new VectorSource();
    this.measureLengthLayer = new VectorLayer({
      source: this.measureLengthSource,
      style: (feature) =>{
        return this.styleFunction(feature, true, "LineString");
      },
      zIndex: 2000
    });

    const modifyStyle = new Style({
      image: new Circle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
      })
    });

    this.measureLengthModifyInteraction = new Modify({source: this.measureLengthSource, style: modifyStyle});

    this.measureLengthDrawInteraction = new Draw({
      source: this.measureLengthSource,
      type: "LineString",
      style: (feature) => this.styleFunction(feature, true, "LineString"),
      stopClick: true,
    });
    this.measureLengthDrawInteraction.on('drawstart', ()=> {
      this.measureLengthSource.clear();
      this.measureLengthModifyInteraction.setActive(false);
    });
    this.measureLengthDrawInteraction.on("drawend", () => {
      this.measureLengthModifyInteraction.setActive(true);
    });
  }

  private styleFunction(feature:FeatureLike, segments:any, drawType:any):Style[] {
    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [5, 7],
        width: 2,
      }),
      image: new Circle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    });

    const labelStyle = new Style({
      text: new Text({
        font: '14px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [3, 3, 3, 3],
        textBaseline: 'bottom',
        offsetY: -15,
      }),
      image: new RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 10],
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
      }),
    });

    const segmentStyle = new Style({
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textBaseline: 'bottom',
        offsetY: -12,
      }),
      image: new RegularShape({
        radius: 6,
        points: 3,
        angle: Math.PI,
        displacement: [0, 8],
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.4)',
        }),
      }),
    });

    const styles = [];
    const segmentStyles = [segmentStyle];
    const geometry = feature.getGeometry();
    const type = geometry!.getType();
    let point, label, line;
    if (!drawType || drawType === type || type === 'Point') {
      styles.push(style);
      if (type === 'Polygon') {
        let polygonGeom = geometry as Polygon;
        point = polygonGeom.getInteriorPoint();
        label = this.formatArea(polygonGeom);
        line = new LineString(polygonGeom.getCoordinates()[0]);
      } else if (type === 'LineString') {
        let lineStringGeom = geometry as LineString;
        point = new Point(lineStringGeom.getLastCoordinate());
        label = this.formatLength(lineStringGeom);
        line = lineStringGeom;
      }
    }
    if (segments && line) {
      let count = 0;
      line.forEachSegment((a, b) =>{
        const segment = new LineString([a, b]);
        const label = this.formatLength(segment);
        if (segmentStyles.length - 1 < count) {
          segmentStyles.push(segmentStyle.clone());
        }
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles[count].setGeometry(segmentPoint);
        segmentStyles[count].getText()?.setText(label);
        styles.push(segmentStyles[count]);
        count++;
      });
    }
    if (label && point) {
      labelStyle.setGeometry(point);
      labelStyle.getText()?.setText(label);
      styles.push(labelStyle);
    }
    return styles;
  }

  private formatLength (line:LineString) {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' km';
    } else {
      output = Math.round(length * 100) / 100 + ' m';
    }
    return output;
  };

  private formatArea(polygon:Polygon) {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
    } else {
      output = Math.round(area * 100) / 100 + ' m\xB2';
    }
    return output;
  };

  ngOnInit(): void {
    this.map.setTarget('map')

    this.map.on('click', (event: MapBrowserEvent<UIEvent>) => {
      let coordinate = event.coordinate;
      console.log('click on coordinate ' + coordinate);

      let geoJSON = new GeoJSON();

      let requestObservables = this.map.getAllLayers()
        .filter(layer => {
          let source = layer.getSource();
          return source && source instanceof ImageWMS;
        })
        .map(layer => {
          let source = layer.getSource() as ImageWMS;

          let featureInfoUrl = source.getFeatureInfoUrl(
            coordinate,
            this.map.getView().getResolution()!,
            this.map.getView().getProjection(),
            {
              "INFO_FORMAT": "application/geo+json",
              "FEATURE_COUNT": this.configService.config?.queryFeatureCount ?? 3,
              "WITH_GEOMETRY": "TRUE"
            }
          );
          if (!featureInfoUrl) {
            return of("").pipe(map(response => [layer, response]));
          }

          return this.httpClient.get<string>(featureInfoUrl).pipe(map(response => [layer, response]));
        });
      forkJoin(requestObservables)
        .subscribe(responseTuples => {
          let layerToFeaturesMap = new Map<Layer, Feature[]>();
          responseTuples
            .map(tuple => {
              const olLayer = tuple[0] as OlLayer;
              const response = tuple[1];

              let features = geoJSON.readFeatures(response);

              let layerName = olLayer.getProperties()["name"] as string;
              let layer = Array.from(this.layerMapping.keys()).filter(l => l.title === layerName)[0];

              return [layer, features] as [Layer, Feature[]];
            })
            .filter(tuple => tuple[1] && tuple[1].length > 0)
            .forEach(tuple => layerToFeaturesMap.set(tuple[0], tuple[1]));
          this.featureSelectionService.setSelectedFeaturesOnMap(layerToFeaturesMap);
        });
    });
    this.map.on('moveend', (e: MapEvent) => {
      localStorage.setItem('map_center', JSON.stringify(e.map.getView().getCenter()));
      localStorage.setItem('map_zoom', '' + e.map.getView().getZoom());
    });

    this.unsubscribeLater(this.layerService.layers.subscribe(layers => {
      console.log(`Updating layers. Got ${layers.length} layers.`);

      // Reverse layers so that the first layer is on top
      layers = layers.slice();
      layers.reverse();

      const oldLayers = Array.from(this.layerMapping.keys()).map(key => this.layerMapping.get(key)!);
      const newLayers: OlLayer[] = [];

      this.layerMapping.clear();
      this.layerSubscriptions.forEach(subscription => subscription.unsubscribe());
      this.layerSubscriptions = [];

      layers.forEach(layer => {
        let wmsLayer = new ImageLayer({
          source: new ImageWMS({
            url: layer.wmsBaseUrl,
            params: {'LAYERS': layer.name}
          }),
          properties: {'name': layer.title}
        });

        let subscription = layer.visible.subscribe((visible) => wmsLayer.setVisible(visible));
        this.layerSubscriptions.push(subscription);

        this.layerMapping.set(layer, wmsLayer);
        newLayers.push(wmsLayer);
      });

      oldLayers.forEach(l => this.map.removeLayer(l));
      newLayers.forEach(layer => this.map.addLayer(layer));
    }));

    this.unsubscribeLater(
      this.mapService.layerAdded.subscribe(layer => this.addLayer(layer)),
      this.mapService.layerRemoved.subscribe(layer => this.removeLayer(layer)),
      this.mapService.lengthMeasurementStarted.subscribe(() => this.startLengthMeasurement()),
      this.mapService.lengthMeasurementEnded.subscribe(() => this.endLengthMeasurement()),
      this.mapService.zoomedIn.subscribe(() => this.zoomIn()),
      this.mapService.zoomedOut.subscribe(() => this.zoomOut()),
    )
  }

  public addLayer(layer: BaseLayer): void {
    this.map.addLayer(layer);
  }

  public removeLayer(layer: BaseLayer): void {
    this.map.removeLayer(layer);
  }

  public startLengthMeasurement(): void {
    this.measureLengthDrawInteraction.setActive(true);
  }

  public endLengthMeasurement(): void {
    this.measureLengthDrawInteraction.setActive(false);
    this.measureLengthSource.clear();
  }

  public zoomIn(): void {
    const zoom = this.map?.getView()?.getZoom();
    if (zoom) {
      this.map?.getView().animate({zoom: zoom + 0.5, duration: 250});
    }
  }

  public zoomOut(): void {
    const zoom = this.map?.getView()?.getZoom();
    if (zoom) {
      this.map?.getView().animate({zoom: zoom - 0.5, duration: 250});
    }
  }
}
