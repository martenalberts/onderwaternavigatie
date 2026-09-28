# Onderwaternavigatie als app installeren

Deze versie is een Progressive Web App (PWA). De app kan als een app-icoon op iPhone, iPad en Android worden gezet en gebruikt daarna de lokale cache voor offline gebruik.

## Belangrijk voor installatie

Een PWA moet vanaf een HTTPS-adres worden aangeboden. Het losse HTML-bestand openen vanaf `file://` is daarom niet genoeg om de installatie als PWA te activeren.

Een eenvoudige gratis manier is GitHub Pages.

## Snelste route met GitHub Pages

1. Maak op GitHub een nieuwe repository, bijvoorbeeld `onderwaternavigatie`.
2. Upload de volledige inhoud van deze map naar de repository.
3. Zet GitHub Pages aan via Settings, Pages.
4. Kies de branch `main` en de map `/root`.
5. Open het HTTPS-adres dat GitHub Pages geeft.
6. Open de app één keer terwijl je internet hebt. Daarna kan de eerder geladen app offline functioneren.
7. Installeer de app op je apparaat.

## iPhone

Open de HTTPS-webpagina in Safari.

1. Tik op Delen.
2. Kies `Zet op beginscherm` of `Add to Home Screen`.
3. Zet, als die optie verschijnt, `Open as Web App` aan.
4. Tik op Voeg toe.

Daarna staat het icoon op het beginscherm en opent de app zonder de normale browserinterface.

## iPad

Open de HTTPS-webpagina in Safari.

1. Tik op Delen.
2. Kies `Voeg toe aan beginscherm`.
3. Zet `Open as Web App` aan.
4. Tik op Voeg toe.

## Android

Open de HTTPS-webpagina in Chrome.

1. Tik rechtsboven op het menu.
2. Kies `Install and create shortcut` of `App installeren`, afhankelijk van de versie van Chrome.
3. Bevestig de installatie.

## Offline gebruik

De app zelf heeft geen internetverbinding nodig voor de berekeningen. De service worker bewaart de appbestanden lokaal. De ingevoerde gegevens worden bovendien lokaal in de browser opgeslagen.

Installeer de app eerst terwijl je online bent en open hem minstens één keer. Test daarna eventueel in vliegtuigmodus voordat je hem tijdens een duikopleiding gebruikt.

## Bestanden

- `index.html`, de app
- `manifest.webmanifest`, de installatiegegevens en appnaam
- `sw.js`, de offline cache
- `icons/`, de appiconen
