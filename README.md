Editor Backend - Mikael Menonen
===============================

Appen använder sig av modulerna:
- CORS
- DotENV
- Express
- MongoDB
- Morgan

Man kan installera modulerna genom att köra 'npm install'.

Man startar appen i två lägen:  
För att starta i test läge som kör mot en lokal databas med 'npm start'.  
För att starta i production läge som kör mot en mongodb atlas databas med 'npm run production'.

Webappen använder 4 routes i koppling med docs databasen.
- /docs - Visar alla dokument i databasen.
- /doc/:name - Visar dokumentet med det specifika namnet i databasen.
- /create - Skapar ett nytt dokument i databasen. Dokumentets namn och html skickas med i bodyn av post requesten.
- /update - Uppdaterar ett dokument i databasen. Dokumentets namn och html skickas med i bodyn av put requesten.
