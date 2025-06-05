import AbstractStatefulView from './view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

    this._initDatePicker();
  }

  _initDatePicker() {
    this._datePickerFrom = flatpickr(
      this.element.querySelector('.event__input--date-start'),
      {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: this._state.dateFrom,
        onChange: this._dateChangeHandler.bind(this)
      }
    );

    this._datePickerTo = flatpickr(
      this.element.querySelector('.event__input--date-end'),
      {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: this._state.dateTo,
        onChange: this._dateChangeHandler.bind(this)
      }
    );
  }

  _dateChangeHandler() {
    const [dateFrom, dateTo] = [this._datePickerFrom.selectedDates[0], this._datePickerTo.selectedDates[0]];
    this._updateState({
      dateFrom,
      dateTo
    });
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
    `<option value="${type}" ${point.type === type ? 'selected' : ''}>${type}</option>`
  ).join('');

  const cityOptions = destinations.map((dest) =>
    `<option value="${dest.id}" ${point.destination === dest.id ? 'selected' : ''}>${dest.city}</option>`
  ).join('');

  const offersForType = offersByType[point.type] || [];
  const offerCheckboxes = offersForType.map((offer) =>
    `<label>
      <input type="checkbox" name="offers" value="${offer.id}" ${point.offers.includes(offer.id) ? 'checked' : ''}>
      ${offer.title} (+€${offer.price})
    </label>`
  ).join('');

  const currentDestination = destinations.find((d) => d.id === point.destination);
  const description = currentDestination ? `<p>${currentDestination.description}</p>` : '';
  const photos = currentDestination && currentDestination.pictures
    ? `<div>${currentDestination.pictures.map((img) => `<img src="${img.src}" alt="${img.description}">`).join('')}</div>`
    : '';

  return `
    <form>
      <select name="type">${typeOptions}</select>
      <select name="destination">${cityOptions}</select>
      <input name="price" value="${point.price}">
      <input type="text" class="event__input--date-start" value="${point.dateFrom}">
      <input type="text" class="event__input--date-end" value="${point.dateTo}">
      <div>${offerCheckboxes}</div>
      ${description}
      ${photos}
      <button type="submit">Save</button>
    </form>
  `;
}

