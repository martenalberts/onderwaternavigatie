/*
 * Persistent application configuration.
 * Cursistmetingen are intentionally not stored between sessions.
 */

const STORAGE_KEYS = {
  distance: 'duikafstand-distance'
};

function saveConfiguration(distance) {
  localStorage.setItem(STORAGE_KEYS.distance, distance);
}

function loadConfiguration() {
  return {
    distance: localStorage.getItem(STORAGE_KEYS.distance)
  };
}
