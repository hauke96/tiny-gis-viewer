import {Component, OnInit} from '@angular/core';
import {MapComponent} from './map/map/map.component';
import {LayerService} from './layer/layer.service';
import {LayerSidebarComponent} from './sidebar/layer/layer-sidebar/layer-sidebar.component';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {ConfigService} from './config/config.service';
import {SelectionSidebarComponent} from './sidebar/feature-selection/selection-sidebar/selection-sidebar.component';
import {NgForOf, NgIf} from '@angular/common';
import {FeatureSelectionService} from './feature/feature-selection.service';
import {FeatureLayerComponent} from './layer/feature-layer/feature-layer.component';
import {ControlPanelComponent} from './map/control-panel/control-panel.component';
import {MeasureLengthLayerComponent} from './layer/measure/measure-length-layer.component';
import {MeasureAreaLayerComponent} from './layer/measure/measure-area-layer.component';
import {Unsubscriber} from './common/unsubscriber';
import {MapLayerComponent} from './layer/map-layer/map-layer.component';
import {PinLayerComponent} from './layer/pin-layer/pin-layer.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent, LayerSidebarComponent, SelectionSidebarComponent, NgIf, FeatureLayerComponent, ControlPanelComponent, MeasureLengthLayerComponent, MeasureAreaLayerComponent, MapLayerComponent, NgForOf, PinLayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends Unsubscriber implements OnInit {
  private readonly supportedLanguages = ['de', 'en'];
  private readonly defaultLanguage = 'en';

  constructor(
    protected layerService: LayerService,
    protected featureSelectionService: FeatureSelectionService,
    private translate: TranslateService,
    private configService: ConfigService,
    title: Title
  ) {
    super();

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
      translate.get("title").subscribe((res: string) => {
        title.setTitle(res);
      });
    });
  }

  ngOnInit() {
    this.unsubscribeLater(
      this.configService.config.subscribe(config => this.layerService.loadFromConfig(config))
    )
  }
}
