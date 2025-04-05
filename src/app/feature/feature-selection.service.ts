import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Layer} from '../layer/layer';
import {Feature} from 'ol';
import {FeatureLike} from 'ol/Feature';
import {Coordinate} from 'ol/coordinate';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeatureSelectionService {
  // Contains all selected features for the given coordinate. When the user click to a new coordinate, this mapping
  // will be empty unless a layer pushes new features into it.
  private selectionOnMap$: BehaviorSubject<[Coordinate, Map<Layer, Feature[]>]> = new BehaviorSubject<[Coordinate, Map<Layer, Feature[]>]>([[], new Map<Layer, Feature[]>()]);
  private focussedFeature$: BehaviorSubject<Feature | undefined> = new BehaviorSubject<Feature | undefined>(undefined);

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public get selectionOnMap(): Observable<[Coordinate, Map<Layer, Feature[]>]> {
    return this.selectionOnMap$.asObservable();
  }

  public setSelectedFeaturesOnMap(layerToFeaturesMap: [Coordinate, Layer, Feature[]]): void {
    const newMap = new Map<Layer, Feature[]>();

    // Selected features for same coordinate -> Add them to the current map of layer-to-features. Leave the map empty
    // otherwise and thus start a new selection.
    if (this.selectionOnMap$.value[0][0] === layerToFeaturesMap[0][0] &&
      this.selectionOnMap$.value[0][1] === layerToFeaturesMap[0][1]) {
      const oldMap = this.selectionOnMap$.value[1];
      Array.from(oldMap.keys()).forEach(k => newMap.set(k, oldMap.get(k)!));
    }

    if (layerToFeaturesMap[2].length !== 0) {
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

  public focusFeature(layer: Layer, feature: Feature): void {
    this.focussedFeature$.next(feature);

    let queryParams = {feature: JSON.stringify([layer.name, feature.getId()])};
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"})
  }

  public unfocusFeature(): Observable<any> {
    this.focussedFeature$.next(undefined);

    let queryParams = {feature: null};
    return from(this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"}));
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
