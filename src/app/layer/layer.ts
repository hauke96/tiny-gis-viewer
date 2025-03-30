import {BehaviorSubject, Observable} from 'rxjs';

export class Layer {
  private visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    public name: string,
    public wmsBaseUrl: string,
    public wmsLayerName: string
  ) {
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
