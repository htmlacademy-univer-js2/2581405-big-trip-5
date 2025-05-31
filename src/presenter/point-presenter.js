import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class PointPresenter {
  constructor({container, point, destinations, offersByType, onDataChange, onModeChange}) {
    this.container = container;
    this.point = point;
    this.destinations = destinations;
    this.offersByType = offersByType;
    this.onDataChange = onDataChange;
    this.onModeChange = onModeChange;

    this.pointComponent = null;
    this.editPointComponent = null;
    this.mode = 'DEFAULT';
  }

  init() {
    this.pointComponent = new PointView();

    this.pointComponent.setFavoriteClickHandler(() => {
      const updatedPoint = { ...this.point, isFavorite: !this.point.isFavorite };
      this.onDataChange(updatedPoint);
    });

    render(this.pointComponent, this.container);
  }

  resetView() {
    if (this.mode !== 'DEFAULT') {
      this.mode = 'DEFAULT';
    }
  }
}

