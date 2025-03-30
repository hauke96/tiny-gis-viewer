import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import packageInfo from '../../../../package.json';
import {LayerListComponent} from '../layer-list/layer-list.component';
import {LanguageSelectionComponent} from '../language-selection/language-selection.component';
import {LucideAngularModule} from 'lucide-angular';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    LayerListComponent,
    LanguageSelectionComponent,
    LucideAngularModule,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public version = packageInfo.version;
  public sourceRepoUrl = environment.sourceRepoUrl;
  public expanded = true;
}
