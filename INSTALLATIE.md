# Onderwaternavigatie als app

Deze versie is een Progressive Web App (PWA).

## Installatie

De app moet via HTTPS worden aangeboden. Open daarna de website op het apparaat en kies de installatieoptie.

### iPhone en iPad
Open de website in Safari, tik op Delen, kies Zet op beginscherm en voeg de app toe.

### Android
Open de website in Chrome, open het menu en kies App installeren of Toevoegen aan startscherm.

### Offline
Open de app eerst online. De app gebruikt daarna een lokale cache voor offline gebruik en bewaart invoer lokaal op het apparaat.

## Responsive weergave
De app is responsief gemaakt voor telefoons en tablets. In portrait op een telefoon worden cursisten als overzichtelijke kaarten weergegeven, zodat horizontaal scrollen niet nodig is. In landscape blijft de compacte tabelweergave beschikbaar. De app ondersteunt portrait en landscape en houdt rekening met veilige schermranden op apparaten met een notch.


## Presentatiemodus

Gebruik per cursist de knop `Resultaat tonen` om de resultaten groot en overzichtelijk aan de cursist te presenteren. De modus toont snelheid in meter/min, afstand per vinslag, gemiddelde tijd en gemiddelde vinslagen. Met `Terug naar invoer` keer je terug naar het invoerscherm.

## Codebase refactor 01

De rekenlogica staat nu los van de gebruikersinterface in `js/calculations.js`.
Deze stap verandert de werking van de app niet. Het maakt toekomstige wijzigingen en controles van de berekeningen veiliger.

## Codebase refactor 02

De opslaglogica staat nu los van de gebruikersinterface in `js/storage.js`.
De bestaande opslag in `localStorage` blijft hetzelfde werken. Er is in deze stap bewust geen functionele wijziging gemaakt.


## Codebase refactor 03

Cursistmetingen worden niet meer permanent opgeslagen. Elke nieuwe sessie start met een lege cursist. Alleen de meetafstand wordt als configuratie bewaard.


## Codebase refactor 04

De UI JavaScript staat nu in `js/app.js` in plaats van inline in `index.html`. De werking en interface zijn niet inhoudelijk gewijzigd.
