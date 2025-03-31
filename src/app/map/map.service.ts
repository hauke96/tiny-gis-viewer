import BaseLayer from 'ol/layer/Base';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

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
