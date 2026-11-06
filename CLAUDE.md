# Onderwaternavigatie

PWA voor duikinstructeurs: per cursist metingen invoeren (tijd en vinslagen over een vaste afstand) en de resultaten tonen (meter/min, afstand per vinslag). Uitleg en geschiedenis van de opbouw: `INSTALLATIE.md`.

## Opbouw

| Pad | Inhoud |
|---|---|
| `index.html` | Pagina en opmaak; geen inline JavaScript |
| `js/calculations.js` | Alleen rekenlogica: geen DOM, opslag of interface |
| `js/storage.js` | Opslag in `localStorage` (alleen de meetafstand wordt bewaard, geen cursistgegevens) |
| `js/app.js` | Interface en event-handlers |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline gebruik en installatie |
| `tests/calculations-test.html` | Tests van de rekenregels; open in een browser |

## Werkafspraken

- Houd de scheiding tussen rekenen, opslag en interface aan. Na een wijziging in `calculations.js` de testpagina openen en controleren.
- Invoer accepteert Nederlandse decimalen met een komma; negatieve of onvolledige metingen worden niet verwerkt.
- Na een wijziging aan bestanden die de app laadt: de cacheversie in `sw.js` verhogen, anders zien geïnstalleerde apps de wijziging niet.
- Openbare repository `martenalberts/onderwaternavigatie`, gepubliceerd op https://martenalberts.github.io/onderwaternavigatie/. Wijzigingen voortaan lokaal committen (Nederlandse commitberichten) en pushen, in plaats van uploaden via de website.
