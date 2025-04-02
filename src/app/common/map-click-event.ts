import {Coordinate} from 'ol/coordinate';
import {ProjectionLike} from 'ol/proj';

export class MapClickEvent {
  constructor(
    public coordinate: Coordinate,
    public resolution: number,
    public projection: ProjectionLike
  ) {
  }
}
