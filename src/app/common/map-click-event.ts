import {Coordinate} from 'ol/coordinate';
import {Projection} from 'ol/proj';

export class MapClickEvent {
  constructor(
    public coordinate: Coordinate,
    public resolution: number | undefined,
    public projection: Projection | undefined
  ) {
  }

  public toString(): string {
    return JSON.stringify([this.coordinate, this.resolution, this.projection?.getCode()]);
  }

  public static fromString(value: string): MapClickEvent {
    let parsedObj = JSON.parse(value) as [Coordinate, number | undefined, Projection | undefined];
    return new MapClickEvent(parsedObj[0], parsedObj[1], parsedObj[2]);
  }
}
