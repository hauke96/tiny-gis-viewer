import {Component, OnInit} from '@angular/core';
import {MapComponent} from './map/map/map.component';
import {LayerService} from './map/layer.service';
import {LayerViewComponent} from './sidebar/layer/layer-view/layer-view.component';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {ConfigService} from './config/config.service';
import {SelectionViewComponent} from './sidebar/feature-selection/selection-view/selection-view.component';
import {NgIf} from '@angular/common';
import {FeatureSelectionService} from './map/feature-selection.service';
import {FeatureLayerComponent} from './map/feature-layer/feature-layer.component';
import {ControlPanelComponent} from './map/control-panel/control-panel.component';
import {MeasureLengthLayerComponent} from './map/measure/measure-length-layer.component';
import {MeasureAreaLayerComponent} from './map/measure/measure-area-layer.component';
import {Unsubscriber} from './common/unsubscriber';
import {LegendGraphicViewComponent} from './sidebar/legend-graphic/legend-graphic-view/legend-graphic-view.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent, LayerViewComponent, SelectionViewComponent, NgIf, FeatureLayerComponent, ControlPanelComponent, MeasureLengthLayerComponent, MeasureAreaLayerComponent, LegendGraphicViewComponent],
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
