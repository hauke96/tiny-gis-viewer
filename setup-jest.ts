import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

setupZoneTestEnv();
