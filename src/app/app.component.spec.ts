import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LayerService} from './map/layer.service';
import {FeatureSelectionService} from './map/feature-selection.service';
import {of} from 'rxjs';
import {EventEmitter} from '@angular/core';

describe(AppComponent.name, () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let activatedRoute: ActivatedRoute;
  let translateService: TranslateService;
  let layerService: LayerService;
  let featureSelectionService: FeatureSelectionService;

  beforeEach(async () => {
    activatedRoute = {} as never as ActivatedRoute;
    translateService = {
      addLangs: jest.fn(),
      setDefaultLang: jest.fn(),
      getBrowserLang: jest.fn(),
      onLangChange: new EventEmitter(),
      use: jest.fn(),
    } as never as TranslateService;
    layerService = {} as never as LayerService;
    featureSelectionService = {} as never as FeatureSelectionService;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: TranslateService, useValue: translateService},
        {provide: LayerService, useValue: layerService},
        {provide: FeatureSelectionService, useValue: featureSelectionService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
