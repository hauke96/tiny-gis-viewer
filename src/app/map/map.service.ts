import BaseLayer from 'ol/layer/Base';
import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Observable, Subject} from 'rxjs';
import {Interaction} from 'ol/interaction';
import {MapClickEvent} from '../common/map-click-event';
import {ProjectionLike} from 'ol/proj';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  //
  // Layer add/remove
  //

  private layerAdded$: Subject<BaseLayer> = new Subject<BaseLayer>();

  public addLayer(layer: BaseLayer): void {
    this.layerAdded$.next(layer);
  }

  public get layerAdded(): Observable<BaseLayer> {
    return this.layerAdded$.asObservable()
  }

  private layerRemoved$: Subject<BaseLayer> = new Subject<BaseLayer>();

  public removeLayer(layer: BaseLayer): void {
    this.layerRemoved$.next(layer);
  }

  public get layerRemoved(): Observable<BaseLayer> {
    return this.layerRemoved$.asObservable()
  }

  //
  // Interaction add/remove
  //

  private interactionAdded$: Subject<Interaction> = new Subject<Interaction>();

  public addInteraction(interaction: Interaction): void {
    this.interactionAdded$.next(interaction);
  }

  public get interactionAdded(): Observable<Interaction> {
    return this.interactionAdded$.asObservable()
  }

  private interactionRemoved$: Subject<Interaction> = new Subject<Interaction>();

  public removeInteraction(interaction: Interaction): void {
    this.interactionRemoved$.next(interaction);
  }

  public get interactionRemoved(): Observable<Interaction> {
    return this.interactionRemoved$.asObservable()
  }

  private clicked$: BehaviorSubject<MapClickEvent | undefined> = new BehaviorSubject<MapClickEvent | undefined>(undefined);

  public click(event: MapClickEvent): void {
    this.clicked$.next(event);

    let queryParams = {click: event.toString()};
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"})
  }

  public get clicked(): Observable<MapClickEvent> {
    return this.clicked$.asObservable().pipe(filter(event => !!event));
  }

  public resetClick(): void {
    let queryParams = {click: null};
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"})
    this.clicked$.next(undefined);
  }

  private resolutionChanged$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  public changeResolution(resolution: number | undefined): void {
    this.resolutionChanged$.next(resolution);
  }

  private projectionChanged$: BehaviorSubject<ProjectionLike | undefined> = new BehaviorSubject<ProjectionLike | undefined>(undefined);

  public changeProjection(projection: ProjectionLike | undefined): void {
    this.projectionChanged$.next(projection);
  }

  //
  // Length measurement start/end
  //

  private lengthMeasurementStarted$: Subject<void> = new Subject<void>();

  public startLengthMeasurement(): void {
    this.lengthMeasurementStarted$.next();
  }

  public get lengthMeasurementStarted(): Observable<void> {
    return this.lengthMeasurementStarted$.asObservable()
  }

  private lengthMeasurementEnded$: Subject<void> = new Subject<void>();

  public endLengthMeasurement(): void {
    this.lengthMeasurementEnded$.next();
  }

  public get lengthMeasurementEnded(): Observable<void> {
    return this.lengthMeasurementEnded$.asObservable()
  }

  //
  // Area measurement start/end
  //

  private areaMeasurementStarted$: Subject<void> = new Subject<void>();

  public startAreaMeasurement(): void {
    this.areaMeasurementStarted$.next();
  }

  public get areaMeasurementStarted(): Observable<void> {
    return this.areaMeasurementStarted$.asObservable()
  }

  private areaMeasurementEnded$: Subject<void> = new Subject<void>();

  public endAreaMeasurement(): void {
    this.areaMeasurementEnded$.next();
  }

  public get areaMeasurementEnded(): Observable<void> {
    return this.areaMeasurementEnded$.asObservable()
  }

  //
  // Zoom in/out
  //

  private zoomedIn$: Subject<void> = new Subject<void>();

  public zoomIn(): void {
    this.zoomedIn$.next();
  }

  public get zoomedIn(): Observable<void> {
    return this.zoomedIn$.asObservable()
  }

  private zoomedOut$: Subject<void> = new Subject<void>();

  public zoomOut(): void {
    this.zoomedOut$.next();
  }

  public get zoomedOut(): Observable<void> {
    return this.zoomedOut$.asObservable()
  }
}
