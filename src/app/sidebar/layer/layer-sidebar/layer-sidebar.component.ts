import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import packageInfo from '../../../../../package.json';
import {LayerListComponent} from '../layer-list/layer-list.component';
import {LanguageSelectionComponent} from '../language-selection/language-selection.component';
import {LucideAngularModule} from 'lucide-angular';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layer-sidebar',
  imports: [
    LayerListComponent,
    LanguageSelectionComponent,
    LucideAngularModule,
    NgIf
  ],
  templateUrl: './layer-sidebar.component.html',
  styleUrl: './layer-sidebar.component.scss'
})
export class LayerSidebarComponent {
  protected version = packageInfo.version;
  protected sourceRepoUrl = environment.sourceRepoUrl;
  protected expanded = true;
}
