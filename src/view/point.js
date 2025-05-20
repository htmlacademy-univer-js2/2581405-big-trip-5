const createPointTemplate = (point) => `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${point.date}">${point.dateLabel}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${point.dateTimeStart}">${point.timeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${point.dateTimeEnd}">${point.timeEnd}</time>
        </p>
        <p class="event__duration">${point.duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.price}</span>
      </p>
      <h4 class="visually-hidden">Offers</h4>
      <ul class="event__selected-offers">
        ${point.offers.map((offer) => `<li class="event__offer"><span class="event__offer-title">${offer.title}</span> &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span></li>`).join('')}
      </ul>
      <button class="event__favorite-btn${point.isFavorite ? ' event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.2282 4.3262 1.5736-9.1816-6.6545-6.4816 9.2174-1.3391 4.0922-8.295l4.0922 8.295 9.2174 1.3391-6.6545 6.4816 1.5736 9.1816z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;

export default class PointView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      const temp = document.createElement('div');
      temp.innerHTML = this.getTemplate();
      this.element = temp.firstElementChild;
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

