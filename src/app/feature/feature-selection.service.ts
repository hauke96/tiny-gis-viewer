import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Layer} from '../sidebar/layer/layer';
import {Feature} from 'ol';
import {FeatureLike} from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureSelectionService {
  private selectionOnMap$: BehaviorSubject<Map<Layer, Feature[]>> = new BehaviorSubject<Map<Layer, Feature[]>>(new Map<Layer, Feature[]>());
  private focussedFeature$: BehaviorSubject<Feature | undefined> = new BehaviorSubject<Feature | undefined>(undefined);

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

  public focusFeature(feature: Feature | undefined): void {
    this.focussedFeature$.next(feature);
  }

  public get currentlyFocussedFeature(): Feature | undefined {
    return this.focussedFeature$.value;
  }

  public get focussedFeature(): Observable<Feature | undefined> {
    return this.focussedFeature$.asObservable();
  }

  isSelected(otherFeature: FeatureLike): boolean {
    return this.focussedFeature$.value != null && otherFeature === this.focussedFeature$.value;
  }
}
