import AbstractView from '../framework/view/abstract-view.js';

const createFormTemplate = () => (
  `<form class="trip-events__item  event  event--edit">
    <!--  -->
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/taxi.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <!--  -->
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Taxi
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Amsterdam" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Chamonix"></option>
          <option value="Geneva"></option>
        </datalist>
      </div>
      <!--  -->
    </header>
    <section class="event__details">
      <!--  -->
    </section>
  </form>`
);

export default class CreateFormView extends AbstractView {
  get template() {
    return createFormTemplate();
  }
}
