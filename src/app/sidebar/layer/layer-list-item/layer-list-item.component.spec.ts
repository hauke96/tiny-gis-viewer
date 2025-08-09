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

    layerService = {
      moveLayerDown: jest.fn(),
      deleteLayer: jest.fn(),
    } as never as LayerService;
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

  it('should set visibility on layer', () => {
    // Arrange
    component.layer.setVisible(false);

    // Act & Assert
    component.onLayerSelectionClicked(true);
    expect(component.layer.isVisible()).toEqual(true);

    // Act & Assert (to check that this is not a toggle)
    component.onLayerSelectionClicked(true);
    expect(component.layer.isVisible()).toEqual(true);

    // Act & Assert
    component.onLayerSelectionClicked(false);
    expect(component.layer.isVisible()).toEqual(false);

    // Act & Assert (to check that this is not a toggle)
    component.onLayerSelectionClicked(false);
    expect(component.layer.isVisible()).toEqual(false);
  });

  it('should call service when moving layers down', () => {
    // Act
    component.onMoveDownClicked();

    // Assert
    expect(layerService.moveLayerDown).toHaveBeenCalled();
  });

  it('should call service when deleting layers', () => {
    // Act
    component.onDeleteClicked();

    // Assert
    expect(layerService.deleteLayer).toHaveBeenCalled();
  });
});
