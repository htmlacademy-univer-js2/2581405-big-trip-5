import dayjs from 'dayjs';
import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../render.js';

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

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  init() {
    this.pointComponent = new PointView(this.point, this.destinations, this.offersByType);

    this.pointComponent.setEditClickHandler(this.handleEditClick);
    this.pointComponent.setFavoriteClickHandler(this.handleFavoriteClick);

    render(this.pointComponent, this.container);
  }

  handleEditClick() {
    this.editPointComponent = new EditFormView(this.point, this.destinations, this.offersByType);

    this.editPointComponent.setFormSubmitHandler(this.handleFormSubmit);
    this.editPointComponent.setCancelClickHandler(this.handleCancelClick);

    replace(this.editPointComponent, this.pointComponent);
    this.mode = 'EDITING';
    this.onModeChange();
  }

  handleFormSubmit(updatedPoint) {
    this.onDataChange(updatedPoint);
    this.resetView();
  }

  handleCancelClick() {
    this.resetView();
  }

  handleFavoriteClick() {
    const updatedPoint = { ...this.point, isFavorite: !this.point.isFavorite };
    this.onDataChange(updatedPoint);
  }

  resetView() {
    if (this.mode !== 'DEFAULT') {
      replace(this.pointComponent, this.editPointComponent);
      remove(this.editPointComponent);
      this.editPointComponent = null;
      this.mode = 'DEFAULT';
    }
  }

  update(updatedPoint) {
    this.point = updatedPoint;

    if (this.mode === 'DEFAULT') {
      remove(this.pointComponent);
      this.pointComponent = new PointView(this.point, this.destinations, this.offersByType);

      this.pointComponent.setEditClickHandler(this.handleEditClick);
      this.pointComponent.setFavoriteClickHandler(this.handleFavoriteClick);

      render(this.pointComponent, this.container);
    }
  }

  formatStartDate() {
    return dayjs(this.point.dateFrom).format('DD/MM/YYYY');
  }

  calculateDuration() {
    const startDate = dayjs(this.point.dateFrom);
    const endDate = dayjs(this.point.dateTo);
    return endDate.diff(startDate, 'hour');
  }
}