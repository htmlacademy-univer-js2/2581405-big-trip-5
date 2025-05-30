export default class Filter {
  getTemplate() {
    return `
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          <div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
            <label class="trip-filters__filter-label" for="filter-future">Future</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
            <label class="trip-filters__filter-label" for="filter-present">Present</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
            <label class="trip-filters__filter-label" for="filter-past">Past</label>
          </div>
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    `;
  }
}

export function createEditForm(point, destinations, offersByType) {
  const typeOptions = Object.keys(offersByType).map((type) =>
    `<option value="${type}" ${point.type === type ? 'selected' : ''}>${type}</option>`
  ).join('');

  const cityOptions = destinations.map((dest) =>`<option value="${dest.id}" ${point.destination === dest.id ? 'selected' : ''}>${dest.city}</option>`
  ).join('');

  const offersForType = offersByType[point.type] || [];
  const offerCheckboxes = offersForType.map((offer) =>
    `<label>
      <input type="checkbox" name="offers" value="${offer.id}" ${point.offers.includes(offer.id) ? 'checked' : ''}>
      ${offer.title} (+€${offer.price})
    </label>`
  ).join('');

  return `
    <form>
      <select name="type">${typeOptions}</select>
      <select name="destination">${cityOptions}</select>
      <input name="price" value="${point.price}">
      <div>${offerCheckboxes}</div>
      <button type="submit">Save</button>
    </form>
  `;
}
