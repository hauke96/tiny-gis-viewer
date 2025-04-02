import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Layer} from '../layer/layer';
import {Feature} from 'ol';
import {FeatureLike} from 'ol/Feature';
import {Coordinate} from 'ol/coordinate';

@Injectable({
  providedIn: 'root'
})
export class FeatureSelectionService {
  private selectionOnMap$: BehaviorSubject<[Coordinate, Map<Layer, Feature[]>]> = new BehaviorSubject<[Coordinate, Map<Layer, Feature[]>]>([[], new Map<Layer, Feature[]>()]);
  private focussedFeature$: BehaviorSubject<Feature | undefined> = new BehaviorSubject<Feature | undefined>(undefined);

  constructor() {
  }

  public get selectionOnMap(): Observable<[Coordinate, Map<Layer, Feature[]>]> {
    return this.selectionOnMap$.asObservable();
  }

  public setSelectedFeaturesOnMap(layerToFeaturesMap: [Coordinate, Layer, Feature[]]): void {
    const newMap = new Map<Layer, Feature[]>();

    if (this.selectionOnMap$.value[0] === layerToFeaturesMap[0]) {
      const oldMap = this.selectionOnMap$.value[1];
      Array.from(oldMap.keys()).forEach(k => newMap.set(k, oldMap.get(k)!));
    }

    if (layerToFeaturesMap[0].length !== 0) {
      newMap.set(layerToFeaturesMap[1], layerToFeaturesMap[2]);
    }

    this.selectionOnMap$.next([layerToFeaturesMap[0], newMap]);
  }

  public get selectedFeaturesOnMap(): [Coordinate, Map<Layer, Feature[]>] {
    return this.selectionOnMap$.value;
  }

  deselectAllFeaturesOnMap() {
    this.setSelectedFeaturesOnMap([[], undefined!, []]);
  }

  public get hasSelectionOnMap(): boolean {
    return this.selectionOnMap$.value[1].size > 0;
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
