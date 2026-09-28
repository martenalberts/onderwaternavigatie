const rows = document.getElementById('rows');
    const distanceInput = document.getElementById('distance');

    function num(value) {
      const n = parseFloat(String(value).replace(',', '.'));
      return Number.isFinite(n) ? n : null;
    }

    function format(value, decimals = 1) {
      if (value === null || !Number.isFinite(value)) return '';
      return value.toLocaleString('nl-NL', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    function createRow(data = {}) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="name" data-label="Naam"><input class="name-input" type="text" placeholder="Naam" value="${escapeHtml(data.name || '')}"></td>
        <td data-label="Tijd 1 (sec)"><input class="time1" type="number" min="0" step="0.1" inputmode="decimal" value="${data.time1 ?? ''}"></td>
        <td data-label="Tijd 2 (sec)"><input class="time2" type="number" min="0" step="0.1" inputmode="decimal" value="${data.time2 ?? ''}"></td>
        <td class="avg avg-time" data-label="Gem. tijd (sec)"></td>
        <td data-label="Vinslagen 1"><input class="stroke1" type="number" min="0" step="1" inputmode="numeric" value="${data.stroke1 ?? ''}"></td>
        <td data-label="Vinslagen 2"><input class="stroke2" type="number" min="0" step="1" inputmode="numeric" value="${data.stroke2 ?? ''}"></td>
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

    function escapeHtml(value) {
      return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    function calculateRow(tr) {
      const distance = num(distanceInput.value);
      const t1 = num(tr.querySelector('.time1').value);
      const t2 = num(tr.querySelector('.time2').value);
      const s1 = num(tr.querySelector('.stroke1').value);
      const s2 = num(tr.querySelector('.stroke2').value);

      const result = calculateNavigation(distance, t1, t2, s1, s2);

      tr.querySelector('.avg-time').textContent = format(result.averageTime, 1);
      tr.querySelector('.avg-strokes').textContent = format(result.averageStrokes, 1);

      tr.querySelector('.meters-minute').textContent =
        result.metersPerMinute === null ? '' : format(result.metersPerMinute, 1);
      tr.querySelector('.meters-stroke').textContent =
        result.metersPerStroke === null ? '' : format(result.metersPerStroke, 2);

      save();
    }

    function recalculateAll() {
      document.querySelectorAll('#rows tr').forEach(calculateRow);
    }

    function save() {
      saveConfiguration(distanceInput.value);
    }

    function load() {
      const configuration = loadConfiguration();

      if (configuration.distance) {
        distanceInput.value = configuration.distance;
      }

      // Elke nieuwe sessie start met één lege cursist.
      createRow();
    }

    distanceInput.addEventListener('input', recalculateAll);

    document.getElementById('add').addEventListener('click', () => {
      const tr = createRow();
      tr.querySelector('.name-input').focus();
    });

    document.getElementById('print').addEventListener('click', () => {
      window.print();
    });

    document.getElementById('clear').addEventListener('click', () => {
      if (!confirm('Alle ingevoerde cursisten verwijderen?')) return;
      rows.innerHTML = '';
      rows.innerHTML = '';
      createRow();
    });

    load();
