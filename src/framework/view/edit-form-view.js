import AbstractStatefulView from './framework/view/abstract-stateful-view.js';

export default class EditFormView extends AbstractStatefulView {
  constructor(point, destinations, offersByType) {
    super();
    this._state = EditFormView.parsePointToState(point);
    this._destinations = destinations;
    this._offersByType = offersByType;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this._destinations, this._offersByType);
  }

  _restoreHandlers() {
    this.element.querySelector('[name="type"]').addEventListener('change', this._typeChangeHandler.bind(this));
    this.element.querySelector('[name="destination"]').addEventListener('change', this._destinationChangeHandler.bind(this));
  }

  _updateState(update) {
    this.updateElement({...this._state, ...update});
  }

  _typeChangeHandler(evt) {
    const newType = evt.target.value;
    this._updateState({
      type: newType,
      offers: [],
    });
  }

  _destinationChangeHandler(evt) {
    const newDestination = evt.target.value;
    this._updateState({
      destination: newDestination,
    });
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}

function createEditFormTemplate(point, destinations, offersByType) {
  const typeOptions = Object.keys(offersByType).map((type) =>
    `<option value="${type}" ${point.type == type ? 'selected' : ''}>${type}</option>`
  ).join('');

  const cityOptions = destinations.map((dest) =>
    `<option value="${dest.id}" ${point.destination == dest.id ? 'selected' : ''}>${dest.city}</option>`
  ).join('');

  const offersForType = offersByType[point.type] || [];
  const offerCheckboxes = offersForType.map((offer) =>
    `<label>
      <input type="checkbox" name="offers" value="${offer.id}" ${point.offers.includes(offer.id) ? 'checked' : ''}>
      ${offer.title} (+€${offer.price})
    </label>`
  ).join('');

  const currentDestination = destinations.find((d) => d.id == point.destination);
  const description = currentDestination ? `<p>${currentDestination.description}</p>` : '';
  const photos = currentDestination && currentDestination.pictures
    ? `<div>${currentDestination.pictures.map((img) => `<img src="${img.src}" alt="${img.description}">`).join('')}</div>`
    : '';

  return `
    <form>
      <select name="type">${typeOptions}</select>
      <select name="destination">${cityOptions}</select>
      <input name="price" value="${point.price}">
      <div>${offerCheckboxes}</div>
      ${description}
      ${photos}
      <button type="submit">Save</button>
    </form>
  `;
}
