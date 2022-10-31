Editor Backend - Mikael Menonen
===============================

Appen använder sig av modulerna:
- CORS
- DotENV
- Express
- MongoDB
- Morgan
- Socket.io
- Bcryptjs
- JsonWebToken
- graphql
- express-graphql

Optionella moduler:
- Bufferutil
- UTF-8-validate

Man kan installera modulerna genom att köra 'npm install'.

Man startar appen i två lägen:  
För att starta i test läge som kör mot en lokal databas med 'npm start'.  
För att starta i production läge som kör mot en mongodb atlas databas med 'npm run production'.

Webappen använder 12 routes i koppling med databasen.
- /docs - Visar alla dokument i databasen.
- /doc/:name - Visar dokumentet med det specifika namnet i databasen.
- /create - Skapar ett nytt dokument i databasen. Dokumentets namn och html skickas med i bodyn av post requesten.
- /update - Uppdaterar ett dokument i databasen. Dokumentets namn och html skickas med i bodyn av put requesten.
- /register - Registrerar en användare i databasen.
- /login - Loggar in en användare där användaren för en jwt token som används för att testa auktorisation.
- /verify - Testar användarens jwt token.
- /updatepermission - Uppdaterar vilka användare som har tillåtelse till ett dokument.
- /createcomment - Skapa en ny kommentar för att dokument.
- /removecomment - Ta bort en kommentar från ett dokument.
- /graphql - Använd graphql för att söka i databasen.
- /reset - Återställer databasen genom att ta bort alla dokument och användare sparade i den.