import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import packageInfo from '../../../../package.json';
import {LayerListComponent} from '../layer-list/layer-list.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    LayerListComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  version = packageInfo.version;
  sourceRepoUrl = environment.sourceRepoUrl;
}
