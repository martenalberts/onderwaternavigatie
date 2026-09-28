/*
 * Pure calculation logic for the underwater navigation exercise.
 * No DOM, storage, or UI code belongs in this file.
 */

function calculateNavigation(distance, time1, time2, strokes1, strokes2) {
  const averageTime =
    time1 !== null && time2 !== null
      ? (time1 + time2) / 2
      : null;

  const averageStrokes =
    strokes1 !== null && strokes2 !== null
      ? (strokes1 + strokes2) / 2
      : null;

  const metersPerMinute =
    distance !== null && averageTime !== null && averageTime > 0
      ? (distance / averageTime) * 60
      : null;

  const metersPerStroke =
    distance !== null && averageStrokes !== null && averageStrokes > 0
      ? distance / averageStrokes
      : null;

  return {
    averageTime,
    averageStrokes,
    metersPerMinute,
    metersPerStroke
  };
}
