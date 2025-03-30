import { Component } from '@angular/core';
import {environment} from '../../../environments/environment';
import packageInfo from '../../../../package.json';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  version = packageInfo.version;
  sourceRepoUrl = environment.sourceRepoUrl;

}
