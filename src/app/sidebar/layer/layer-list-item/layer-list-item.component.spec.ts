import {LayerListItemComponent} from './layer-list-item.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {LayerService} from '../../../map/layer.service';
import {TranslateService} from '@ngx-translate/core';
import {Layer, XyzLayer} from '../../../map/layer';
import {LayerConfig} from '../../../config/config';

describe(LayerListItemComponent.name, () => {
  let component: LayerListItemComponent;
  let fixture: MockedComponentFixture<LayerListItemComponent, any>;

  let layerService: LayerService;
  let translateService: TranslateService;

  let layer: Layer;

  beforeEach(() => {
    layer = new XyzLayer(
      new LayerConfig(
        'wms',
        "https://foo.com",
        "Title",
        "Name",
        true,
        "Attribution",
        true,
        undefined
      )
    );

    layerService = {} as never as LayerService;
    translateService = {
      instant: jest.fn(),
    } as never as TranslateService;

    return MockBuilder(LayerListItemComponent)
      .provide({provide: LayerService, useValue: layerService})
      .provide({provide: TranslateService, useValue: translateService});
  });

  beforeEach(() => {
    fixture = MockRender(LayerListItemComponent, {layer: layer});
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
