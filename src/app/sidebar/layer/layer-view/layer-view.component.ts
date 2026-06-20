import {Component, ChangeDetectionStrategy} from '@angular/core';
import {environment} from '../../../../environments/environment';
import packageInfo from '../../../../../package.json';
import {LayerListComponent} from '../layer-list/layer-list.component';
import {LanguageSelectionComponent} from '../language-selection/language-selection.component';

import {EditControlsComponent} from '../edit-controls/edit-controls.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';

@Component({
  selector: 'app-layer-view',
  imports: [
    LayerListComponent,
    LanguageSelectionComponent,
    EditControlsComponent,
    IconButtonComponent
  ],
  templateUrl: './layer-view.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './layer-view.component.scss'
})
export class LayerViewComponent {
  protected version = packageInfo.version;
  protected sourceRepoUrl = environment.sourceRepoUrl;
  protected expanded = true;
}
