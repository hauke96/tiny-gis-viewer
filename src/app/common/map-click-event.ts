import {Coordinate} from 'ol/coordinate';
import {Projection, ProjectionLike} from 'ol/proj';

export class MapClickEvent {
  constructor(
    public coordinate: Coordinate,
    public resolution: number | undefined,
    public projection: ProjectionLike | undefined
  ) {
  }

  public toString(): string {
    let projString = "";
    if (this.projection) {
      if (this.projection instanceof Projection) {
        projString = this.projection.getCode();
      } else {
        projString = this.projection
      }
    }
    return JSON.stringify([this.coordinate, this.resolution, projString]);
  }

  public static fromString(value: string): MapClickEvent {
    let parsedObj = JSON.parse(value) as [Coordinate, number | undefined, Projection | undefined];
    return new MapClickEvent(parsedObj[0], parsedObj[1], parsedObj[2]);
  }
}
