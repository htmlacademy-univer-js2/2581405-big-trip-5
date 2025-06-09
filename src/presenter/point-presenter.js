import dayjs from 'dayjs';
import PointView from '../view-v/point.js';
import EditFormView from '../framework/view/edit-form-view.js';
import { RenderPosition } from '../framework/render.js';
import AbstractView from '../framework/view/abstract-view.js';


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

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can render only components');
  }

  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }

  container.insertAdjacentElement(place, component.element);
}

function replace(newComponent, oldComponent) {
  if (!(newComponent instanceof AbstractView && oldComponent instanceof AbstractView)) {
    throw new Error('Can replace only components');
  }

  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newElement, oldElement);
}

function remove(component) {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
}
