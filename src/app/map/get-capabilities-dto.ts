/*
 * DTO objects representing the JSON representation of an XML GetCapabilities response.
 */

export interface GetCapabilitiesDto {
  Service: GetCapabilitiesServiceDto,
  Capability: GetCapabilitiesCapabilityDto
}

export interface GetCapabilitiesServiceDto {
  Name: string
  Title: string
}

export interface GetCapabilitiesCapabilityDto {
  Layer: GetCapabilitiesLayerDto
}

export interface GetCapabilitiesLayerDto {
  Name: string,
  Title: string,
  Layer: GetCapabilitiesLayerDto[],
  queryable: boolean,
  Attribution: GetCapabilitiesLayerAttributionDto,
}

export interface GetCapabilitiesLayerAttributionDto {
  Title: string
}
