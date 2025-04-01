import {Component, OnInit} from '@angular/core';
import {MapComponent} from './map/map/map.component';
import {LayerService} from './layer/layer.service';
import {LayerSidebarComponent} from './layer/layer-sidebar/layer-sidebar.component';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {ConfigService} from './config/config.service';
import {SelectionSidebarComponent} from './selection-sidebar/selection-sidebar/selection-sidebar.component';
import {NgIf} from '@angular/common';
import {FeatureSelectionService} from './feature/feature-selection.service';
import {FeatureLayerComponent} from './map/feature-layer/feature-layer.component';
import {ControlPanelComponent} from './map/control-panel/control-panel.component';
import {MeasurementLayerComponent} from './map/measurement-layer/measurement-layer.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent, LayerSidebarComponent, SelectionSidebarComponent, NgIf, FeatureLayerComponent, ControlPanelComponent, MeasurementLayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly supportedLanguages = ['de', 'en'];
  private readonly defaultLanguage = 'en';

  constructor(
    protected layerService: LayerService,
    protected featureSelectionService: FeatureSelectionService,
    private translate: TranslateService,
    private configService: ConfigService,
    title: Title
  ) {
    this.translate.addLangs(this.supportedLanguages);
    this.translate.setDefaultLang(this.defaultLanguage);

    const storedLanguage = localStorage.getItem("lang");
    const browserLang = translate.getBrowserLang();

    if (!!storedLanguage && storedLanguage !== "") {
      translate.use(storedLanguage);
    } else if (browserLang && this.supportedLanguages.some(l => browserLang?.match(l))) {
      translate.use(browserLang);
    } else {
      translate.use(this.defaultLanguage);
    }

    translate.onLangChange.subscribe(event => {
      localStorage.setItem("lang", event.lang);
      translate.get('title').subscribe((res: string) => {
        title.setTitle(res);
      });
    });
  }

  ngOnInit() {
    this.layerService.loadFromConfig(this.configService.config!);
  }
}
