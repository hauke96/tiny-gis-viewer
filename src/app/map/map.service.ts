import BaseLayer from 'ol/layer/Base';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Interaction} from 'ol/interaction';

@Injectable({
  providedIn: 'root',
})
export class MapService {
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
