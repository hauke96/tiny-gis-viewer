import {BehaviorSubject, Observable} from 'rxjs';

export class Layer {
  private visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * @param title Human-readable title of the layer.
   * @param url Base URL for this layer.
   * @param name Technical name/ID of this layer.
   */
  constructor(
    public title: string,
    public url: string,
    public name: string
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
