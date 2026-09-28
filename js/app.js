document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    rows: document.getElementById('rows'),
    distanceInput: document.getElementById('distance'),
    addButton: document.getElementById('add'),
    printButton: document.getElementById('print'),
    clearButton: document.getElementById('clear'),
    resultScreen: document.getElementById('resultScreen'),
    resultName: document.getElementById('resultName'),
    resultMetersMinute: document.getElementById('resultMetersMinute'),
    resultMetersStroke: document.getElementById('resultMetersStroke'),
    resultAvgTime: document.getElementById('resultAvgTime'),
    resultAvgStrokes: document.getElementById('resultAvgStrokes'),
    closeResult: document.getElementById('closeResult')
  };

  const {
    rows,
    distanceInput,
    addButton,
    printButton,
    clearButton,
    resultScreen,
    resultName,
    resultMetersMinute,
    resultMetersStroke,
    resultAvgTime,
    resultAvgStrokes,
    closeResult
  } = elements;

  function num(value) {
    const normalized = String(value ?? '').trim().replace(',', '.');
    if (normalized === '') return null;

    const n = Number(normalized);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  function format(value, decimals = 1) {
    if (value === null || !Number.isFinite(value)) return '';

    return value.toLocaleString('nl-NL', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function createRow(data = {}) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="name" data-label="Naam">
        <input class="name-input" type="text" placeholder="Naam" value="${escapeHtml(data.name || '')}">
      </td>
      <td data-label="Tijd 1 (sec)">
        <input class="time1" type="number" min="0" step="0.1" inputmode="decimal" value="${data.time1 ?? ''}">
      </td>
      <td data-label="Tijd 2 (sec)">
        <input class="time2" type="number" min="0" step="0.1" inputmode="decimal" value="${data.time2 ?? ''}">
      </td>
      <td class="avg avg-time" data-label="Gem. tijd (sec)"></td>
      <td data-label="Vinslagen 1">
        <input class="stroke1" type="number" min="0" step="1" inputmode="numeric" value="${data.stroke1 ?? ''}">
      </td>
      <td data-label="Vinslagen 2">
        <input class="stroke2" type="number" min="0" step="1" inputmode="numeric" value="${data.stroke2 ?? ''}">
      </td>
      <td class="avg avg-strokes" data-label="Gem. vinslagen"></td>
      <td class="result meters-minute" data-label="Meter/min"></td>
      <td class="result meters-stroke" data-label="Meter/vinslag"></td>
      <td class="no-print" data-label="Actie">
        <button class="primary show-result" type="button">Resultaat tonen</button>
        <button class="danger delete" type="button" title="Cursist verwijderen">Verwijderen</button>
      </td>
    `;

    rows.appendChild(tr);

    tr.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => calculateRow(tr));
    });

    tr.querySelector('.delete').addEventListener('click', () => {
      tr.remove();
      save();
    });

    calculateRow(tr);
    return tr;
  }

  function calculateRow(tr) {
    const distance = num(distanceInput.value);
    const t1 = num(tr.querySelector('.time1').value);
    const t2 = num(tr.querySelector('.time2').value);
    const s1 = num(tr.querySelector('.stroke1').value);
    const s2 = num(tr.querySelector('.stroke2').value);

    const result = calculateNavigation(distance, t1, t2, s1, s2);

    tr.classList.toggle(
      'incomplete',
      [t1, t2, s1, s2].some(value => value === null)
    );

    tr.querySelector('.avg-time').textContent =
      result.averageTime === null ? '' : format(result.averageTime, 1);
    tr.querySelector('.avg-strokes').textContent =
      result.averageStrokes === null ? '' : format(result.averageStrokes, 1);
    tr.querySelector('.meters-minute').textContent =
      result.metersPerMinute === null ? '' : format(result.metersPerMinute, 1);
    tr.querySelector('.meters-stroke').textContent =
      result.metersPerStroke === null ? '' : format(result.metersPerStroke, 2);

    save();
  }

  function recalculateAll() {
    rows.querySelectorAll('tr').forEach(calculateRow);
  }

  function save() {
    saveConfiguration(distanceInput.value);
  }

  function load() {
    const configuration = loadConfiguration();

    if (configuration.distance) {
      distanceInput.value = configuration.distance;
    }

    createRow();
  }

  function showResult(tr) {
    const inputs = [
      tr.querySelector('.time1').value,
      tr.querySelector('.time2').value,
      tr.querySelector('.stroke1').value,
      tr.querySelector('.stroke2').value
    ];

    if (inputs.some(value => num(value) === null)) {
      alert('Vul eerst tijd 1, tijd 2, vinslagen 1 en vinslagen 2 in.');
      return;
    }

    resultName.textContent =
      tr.querySelector('.name-input').value.trim() || 'Cursist';
    resultAvgTime.textContent =
      (tr.querySelector('.avg-time').textContent || '0,0') + ' sec';
    resultAvgStrokes.textContent =
      tr.querySelector('.avg-strokes').textContent || '0,0';
    resultMetersMinute.textContent =
      tr.querySelector('.meters-minute').textContent || '0,0';
    resultMetersStroke.textContent =
      tr.querySelector('.meters-stroke').textContent || '0,00';

    resultScreen.classList.add('visible');
    document.body.style.overflow = 'hidden';
    closeResult.focus();
  }

  function hideResult() {
    resultScreen.classList.remove('visible');
    document.body.style.overflow = '';
  }

  distanceInput.addEventListener('input', recalculateAll);

  addButton.addEventListener('click', () => {
    const tr = createRow();
    tr.querySelector('.name-input').focus();
  });

  printButton.addEventListener('click', () => {
    window.print();
  });

  clearButton.addEventListener('click', () => {
    if (!confirm('Alle ingevoerde cursisten verwijderen?')) return;

    rows.innerHTML = '';
    createRow();
  });

  document.addEventListener('click', event => {
    const button = event.target.closest('.show-result');

    if (button) {
      showResult(button.closest('tr'));
    }
  });

  closeResult.addEventListener('click', hideResult);

  resultScreen.addEventListener('click', event => {
    if (event.target === resultScreen) {
      hideResult();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && resultScreen.classList.contains('visible')) {
      hideResult();
    }
  });

  load();
});
