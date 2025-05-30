import RoutePointsModel from '../model/route-points-model.js';
import { destinations } from '../mock/destinations.js';
import { offersByType } from '../mock/offers.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';
import { render } from '../render.js';

const POINTS_COUNT = 3;

export default class TripPresenter {
  constructor({ tripContainer, filterContainer, sortContainer }) {
    this.tripContainer = tripContainer;
    this.filterContainer = filterContainer;
    this.sortContainer = sortContainer;
    this.destinations = destinations;
    this.offersByType = offersByType;
    this.model = new RoutePointsModel();
    this.points = this.model.points.slice(0, POINTS_COUNT);
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.sortContainer);
    render(
      new EditFormView(this.points[0], this.destinations, this.offersByType),
      this.tripContainer
    );

    for (let i = 1; i < this.points.length; i++) {
      render(
        new PointView(this.points[i], this.destinations, this.offersByType),
        this.tripContainer
      );
    }
  }
}
