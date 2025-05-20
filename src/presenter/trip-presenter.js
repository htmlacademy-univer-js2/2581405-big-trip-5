import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
// import CreateFormView from '../view/create-form.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';
import { render } from '../render.js';

const POINTS_COUNT = 3;

export default class TripPresenter {
  constructor({tripContainer, filterContainer, sortContainer}) {
    this.tripContainer = tripContainer;
    this.filterContainer = filterContainer;
    this.sortContainer = sortContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer);

    render(new SortView(), this.sortContainer);

    render(new EditFormView(), this.tripContainer);

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.tripContainer);
    }


  }
}
