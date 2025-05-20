import TripPresenter from './presenter/trip-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events__sort');
const tripContainer = document.querySelector('.trip-events__list');

const tripPresenter = new TripPresenter({
  tripContainer,
  filterContainer,
  sortContainer
});

tripPresenter.init();
