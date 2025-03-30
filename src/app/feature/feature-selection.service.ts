import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Layer} from '../layer/layer';
import {Feature} from 'ol';

@Injectable({
  providedIn: 'root'
})
export class FeatureSelectionService {
  private selectionMap$: BehaviorSubject<Map<Layer, Feature[]>> = new BehaviorSubject<Map<Layer, Feature[]>>(new Map<Layer, Feature[]>());

  constructor() { }

  public get selection(): Observable<Map<Layer, Feature[]>> {
    return this.selectionMap$.asObservable();
  }

  public selectFeatureTuples(layerToFeaturesMap: Map<Layer, Feature[]>): void {
    this.selectionMap$.next(layerToFeaturesMap);
  }

  deselectAllFeatures() {
    this.selectFeatureTuples(new Map<Layer, Feature[]>());
  }

  public get hasSelection(): boolean {
    return this.selectionMap$.value.size > 0;
  }
}
