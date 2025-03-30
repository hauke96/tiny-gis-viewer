import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Unsubscriber implements OnDestroy {
  private subscriptions: Subscription[] = [];

  protected unsubscribeLater(...subject: Subscription[]): void {
    this.subscriptions.push(...subject);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }
}
