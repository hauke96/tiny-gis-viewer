import {BehaviorSubject, Observable} from 'rxjs';

export abstract class Layer {
  private visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * @param title Human-readable title of the layer.
   * @param url Base URL for this layer.
   * @param attribution The attribution to show on the map.
   */
  protected constructor(
    public title: string,
    public url: string,
    public attribution: string,
    public queryable: boolean,
  ) {
    this.setVisible(true);
  }

  public setVisible(visible: boolean): void {
    this.visible$.next(visible);
  }

  public isVisible(): boolean {
    return this.visible$.value;
  }

  public get visible(): Observable<boolean> {
    return this.visible$.asObservable()
  }
}

export class WmsLayer extends Layer {
  /**
   * @param title Human-readable title of the layer.
   * @param url Base URL for this layer.
   * @param name Technical name/ID of this layer.
   * @param queryable Whether the layer can be queried for features or not.
   * @param attribution The attribution to show on the map.
   */
  constructor(
    title: string,
    url: string,
    public name: string,
    queryable: boolean,
    attribution: string,
  ) {
    super(title, url, attribution, queryable);
    this.setVisible(true);
  }
}

export class XyzLayer extends Layer {
  /**
   * @param title Human-readable title of the layer.
   * @param url Base URL for this layer.
   * @param attribution The attribution to show on the map.
   */
  constructor(
    title: string,
    url: string,
    attribution: string,
  ) {
    super(title, url, attribution, false);
    this.setVisible(true);
  }
}
