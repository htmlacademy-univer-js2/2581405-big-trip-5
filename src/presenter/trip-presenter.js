import RoutePointsModel from '../model/route-points-model.js';
import { destinations } from '../mock/destinations.js';
import { offersByType } from '../mock/offers.js';
import FilterView from '../view-v/filter.js';
import SortView from '../view-v/sort.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

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

    this.pointPresenters = [];
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.sortContainer);

    this.points.forEach((point) => {
      const presenter = new PointPresenter({
        container: this.tripContainer, point,
        destinations: this.destinations,
        offersByType: this.offersByType,
        onDataChange: this.handlePointChange.bind(this),
        onModeChange: this.handleModeChange.bind(this),
      });
      presenter.init();
      this.pointPresenters.push(presenter);
    });
  }

  handlePointChange(updatedPoint) {
    const index = this.points.findIndex((point) => point.id === updatedPoint.id);
    if (index !== -1) {
      this.points[index] = updatedPoint;
      this.pointPresenters[index].update(updatedPoint);
    }
    this.model.points = this.points;
  }

  handleModeChange() {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  }
}

