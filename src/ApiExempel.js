// Spara bas-url för att slippa skriva in vid varje request
const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?'

// Vänta på att DOMen är färdigladdad för att sedan lyssna på knapparna efter Klick-event
/*
window.addEventListener('DOMContentLoaded', function() {
  const getListBtn = document.getElementById('getListBtn')
  const storeBookBtn = document.getElementById('storeBookBtn')
  getListBtn.addEventListener('click', fetchBooks)
  storeBookBtn.addEventListener('click', addBook)
})
*/

// Funktion som körs när användaren klickar på knappen för att spara bok
function addBook(e) {
  // Spara nyckeln i en vaiabel ifall den finns i localStorage annars blir värdet null
  const key = localStorage.getItem('apiKey')
  // Hämta värdena av inputfälten
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  
  
  // Kolla ifall vi har en api-nyckel (key !== null)
  if (key) {
    // Har vi nyckeln behöver vi bara göra ett request
    request(`key=${key}&op=insert&title=${title}&author=${author}`, function(
      data
    ) {
      console.log(data)
    })
  } else {
    // Har vi inte nyckeln behöver vi hämta ny nyckel från apiet
    // getApiKey tar emot en callback == anonym funktion i det här fallet som kör ett request när 
    // ny api-nyckel hämtats från apiet
    getApiKey(function(key) {
      request(`key=${key}&op=insert&title=${title}&author=${author}`, function(
      data
    ) {
      console.log(data)
    })
    })
  }
}

// Funcktion som körs när användaren trycker på knappen för att hämta lista med böcker
function fetchBooks(e) {
   // Spara nyckeln i en vaiabel ifall den finns i localStorage annars blir värdet null
  const key = localStorage.getItem('apiKey')
  
  // Kolla ifall vi har en api-nyckel (key !== null)
  if (key) {
    // Har vi nyckeln behöver vi bara göra ett request
    request(`key=${key}&op=select`, function(data) {
        console.log(data)
      })
  } else {
    // Har vi inte nyckeln behöver vi hämta ny nyckel från apiet
    // getApiKey tar emot en callback == anonym funktion i det här fallet som kör ett request när 
    // ny api-nyckel hämtats från apiet
    getApiKey(function(key) {
      request(`key=${key}&op=select`, function(data) {
        console.log(data)
      })
    })
  }
}

// Funktion för att göra ett request mot apiet
// Tar emot en sträng (qs) som används som querystring för requesten
// Tar emot en callback (funktion) som körs när svaret från servern kommit (cb)
// Tar emot ett nummer som parameter som indikerar en gräns på hur många försöka som får göras (limit)
export function request(qs, cb, limit = 10) {
  // Initiera ett request med basurl och querystring
  fetch(`${url}${qs}`)
    .then(function(response) {
      // Konverta svaret till JavaScript-objekt
      return response.json()
    })
    .then(function(data) {
      // Kolla hur svaret ser ut från apiet
      // Om operationen lyckades så kör funktionen cb
      if (data.status === 'success') {
        if (cb) {
          cb(data)
        }
      // Lyckas inte operationen och gränsen för hur många requests som får göras inte är nådd
      // Gör ett nytt request
      } else if (limit > 0) {
        request(qs, cb, limit - 1)
      // Om operationen inte lyckats innan gränsen för antalet requests uppnåtts
      // Skicka inte ett nytt request utan bara skriv ut felmeddelande i konsolen
      } else {
        console.log(data.message)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// Funktion för att hämta en ny api-nyckel
// Tar emot en funktion (callback) som parameter som körs om operationen lyckas
export function getApiKey(callback) {
  request('requestKey', function(data) {
    // Spara api-nyckel i localStorage
    localStorage.setItem('apiKey', data.key)
    
    // Om callback är definerad kör callback
    if (callback) {
      callback(data.key)
    }
  })
}
