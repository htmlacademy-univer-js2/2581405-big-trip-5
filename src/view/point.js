import AbstractView from '../framework/view/abstract-view.js';

const createPointTemplate = (point, destinations, offersByType) => {
  const destination = destinations.find((dest) => dest.id === point.destination);
  const offers = (offersByType[point.type] || []).filter((offer) => point.offers.includes(offer.id));

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date">${point.date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} ${destination ? destination.city : ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time">${point.timeStart}</time>
            &mdash;
            <time class="event__end-time">${point.timeEnd}</time>
          </p>
          <p class="event__duration">${point.duration}</p>
        </div>
        <p class="event__price">&euro;&nbsp;<span class="event__price-value">${point.price}</span></p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => `
            <li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </li>
          `).join('')}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class PointView extends AbstractView {
  constructor(point, destinations, offersByType) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offersByType = offersByType;
  }

  get template() {
    return createPointTemplate(this.point, this.destinations, this.offersByType);
  }

  setFavoriteClickHandler(callback) {
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', callback);
  }
}

