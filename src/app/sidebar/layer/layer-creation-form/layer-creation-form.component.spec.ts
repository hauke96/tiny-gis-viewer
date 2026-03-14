import {LayerCreationFormComponent} from './layer-creation-form.component';
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';
import {TranslateService} from '@ngx-translate/core';

describe(LayerCreationFormComponent.name, () => {
  let component: LayerCreationFormComponent;
  let fixture: MockedComponentFixture<LayerCreationFormComponent>;

  let translateService: TranslateService;

  beforeEach(() => {
    translateService = {
      instant: jest.fn().mockReturnValue('foo'),
    } as never as TranslateService;

    return MockBuilder(LayerCreationFormComponent)
      .provide({provide: TranslateService, useValue: translateService});
  });

  beforeEach(() => {
    fixture = MockRender(LayerCreationFormComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
