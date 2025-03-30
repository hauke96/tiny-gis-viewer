import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Layer} from '../layer/layer';
import {Feature} from 'ol';

@Injectable({
  providedIn: 'root'
})
export class FeatureSelectionService {
  private selectionOnMap$: BehaviorSubject<Map<Layer, Feature[]>> = new BehaviorSubject<Map<Layer, Feature[]>>(new Map<Layer, Feature[]>());

  constructor() {
  }

  public get selectionOnMap(): Observable<Map<Layer, Feature[]>> {
    return this.selectionOnMap$.asObservable();
  }

  public setSelectedFeaturesOnMap(layerToFeaturesMap: Map<Layer, Feature[]>): void {
    this.selectionOnMap$.next(layerToFeaturesMap);
  }

  public get selectedFeaturesOnMap(): Map<Layer, Feature[]> {
    return this.selectionOnMap$.value;
  }

  deselectAllFeaturesOnMap() {
    this.setSelectedFeaturesOnMap(new Map<Layer, Feature[]>());
  }

  public get hasSelectionOnMap(): boolean {
    return this.selectionOnMap$.value.size > 0;
  }
}
