Bar Bestelapp

Bestanden:
- index.html: de app
- products.json: standaard productlijst en prijzen
- manifest.webmanifest: installatie-informatie
- service-worker.js: offline cache
- icon-192.png / icon-512.png: app-iconen

Standaardproducten aanpassen:
Pas products.json aan in de repository. Voorbeeld:

{
  "products": [
    { "id": "bier", "name": "Bier", "price": 3.00 },
    { "id": "wijn", "name": "Wijn", "price": 4.00 }
  ]
}

Belangrijk:
- Productwijzigingen via de instellingen worden in localStorage op het apparaat opgeslagen.
- Ze blijven bestaan na sluiten of opnieuw openen van de app.
- Ze zijn apparaat- en browsergebonden en worden niet automatisch met andere apparaten gesynchroniseerd.
- 'Standaard herstellen' laadt opnieuw de inhoud van products.json.
- Alleen products.json aanpassen overschrijft bestaande lokale instellingen niet automatisch.
