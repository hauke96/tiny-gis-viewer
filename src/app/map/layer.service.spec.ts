import {LayerService} from './layer.service';
import {ConfigService} from '../config/config.service';
import {HttpClient} from '@angular/common/http';
import {WmsCapabilitiesLayer, WmsLayer, XyzLayer} from './layer';
import {LayerConfig} from '../config/config';

describe(LayerService.name, () => {
  let service: LayerService;

  let configService: ConfigService;
  let httpClient: HttpClient;

  beforeEach(() => {
    configService = {} as never as ConfigService;
    httpClient = {} as never as HttpClient;

    service = new LayerService(httpClient, configService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update configs for layer visibility change', () => {
    // Arrange
    const layer = new XyzLayer(
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

    service.setLayers([layer]);

    configService.updateConfig = jest.fn();

    // Act
    service.setLayerVisibility(layer, false);

    // Assert
    expect(configService.updateConfig).toHaveBeenCalled();
  });

  it('should not update configs for layer visibility change on child of capabilities layer', () => {
    // Arrange
    let wmsLayer = new WmsLayer(
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
    const layer = new WmsCapabilitiesLayer(
      new LayerConfig(
        'wms-capabilities',
        "https://foo.com",
        "Title",
        "Name",
        true,
        "Attribution",
        true,
        undefined
      ),
      [
        wmsLayer
      ]
    );

    service.setLayers([layer]);

    configService.updateConfig = jest.fn();

    // Act
    service.setLayerVisibility(wmsLayer, false);

    // Assert
    expect(configService.updateConfig).not.toHaveBeenCalled();
  });
});
