/*
 * Local storage for the current dive session.
 * No DOM code belongs in this file.
 */

const STORAGE_KEYS = {
  rows: 'duikafstand-data',
  distance: 'duikafstand-distance'
};

function saveSession(rows, distance) {
  localStorage.setItem(STORAGE_KEYS.rows, JSON.stringify(rows));
  localStorage.setItem(STORAGE_KEYS.distance, distance);
}

function loadSession() {
  const savedDistance = localStorage.getItem(STORAGE_KEYS.distance);
  const savedRows = localStorage.getItem(STORAGE_KEYS.rows);

  let rows = null;

  if (savedRows) {
    try {
      const parsed = JSON.parse(savedRows);
      if (Array.isArray(parsed) && parsed.length) {
        rows = parsed;
      }
    } catch (error) {
      rows = null;
    }
  }

  return {
    distance: savedDistance,
    rows
  };
}

function clearSavedRows() {
  localStorage.removeItem(STORAGE_KEYS.rows);
}
