export default class RoutePointsModel {
  constructor(points) {
    this._points = points;
  }
  get points() {
    return this._points;
  }
}
