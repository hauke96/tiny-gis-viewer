import {AppComponent} from './app.component';
import {TranslateService} from '@ngx-translate/core';
import {LayerService} from './map/layer.service';
import {FeatureSelectionService} from './map/feature-selection.service';
import {EventEmitter} from '@angular/core';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {ConfigService} from './config/config.service';
import {BehaviorSubject, of} from 'rxjs';
import {Layer} from './map/layer';
import {Feature} from 'ol';

describe(AppComponent.name, () => {
  let component: AppComponent;
  let fixture: MockedComponentFixture<AppComponent>;

  let configService: ConfigService;
  let translateService: TranslateService;
  let layerService: LayerService;
  let featureSelectionService: FeatureSelectionService;

  beforeEach(() => {
    configService = {
      config: of(),
    } as never as ConfigService;
    translateService = {
      addLangs: jest.fn(),
      setDefaultLang: jest.fn(),
      getBrowserLang: jest.fn(),
      onLangChange: new EventEmitter(),
      use: jest.fn(),
    } as never as TranslateService;
    layerService = {} as never as LayerService;
    featureSelectionService = {
      selectedFeaturesOnMap: [[], new Map<Layer, Feature[]>()],
    } as never as FeatureSelectionService;

    return MockBuilder(AppComponent)
      .provide({provide: ConfigService, useValue: configService})
      .provide({provide: TranslateService, useValue: translateService})
      .provide({provide: LayerService, useValue: layerService})
      .provide({provide: FeatureSelectionService, useValue: featureSelectionService});
  });

  beforeEach(() => {
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
