
const cssPromises = {}

export function loadResource(src) {
  //Js module
  if(src.endsWith('.js')) {
    return import(src)
  }

  //CSS file
  if(src.endsWith('.css')) {
    if(!cssPromises[src]) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = src
      document.head.append(link)
      cssPromises[src] = new Promise (resolve => {
       link.addEventListener('load', () => resolve())
      })
    }
     return cssPromises[src]
  }

  // Fetch request 
  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app')
export function createFilmNumber() {
  const searchParams = new URLSearchParams(window.location.search)
  const filmNumber = searchParams.get('film')
  return filmNumber
}
let filmNumber

export async function renderPage(moduleURL, apiURL, cssURL) {
   filmNumber = createFilmNumber()
  Promise.all([moduleURL, apiURL, cssURL].map(src => loadResource(src)))
  .then(([pageModule, data]) => {
    
    if(filmNumber) {
      Promise.all([
        Promise.all(data.planets.map(src => loadResource(src))),
        Promise.all(data.starships.map(src => loadResource(src))),
      ]).then(([planets, starships]) => {
        
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data, planets, starships))
      })
      
    } else {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data))
    }
    
  })

}

if(filmNumber) {
  renderPage(
    './episode.js', 
    `https://swapi.dev/api/films/${filmNumber}`, 
    './style.css')
} else {
  renderPage(
    './episode-list.js', 
    'https://swapi.dev/api/films', 
    './style.css')
}

window.addEventListener('popstate', () => {
  filmNumber = createFilmNumber()
  if(filmNumber) {
    renderPage(
      './episode.js', 
      `https://swapi.dev/api/films/${filmNumber}`, 
      './style.css')
  } else {
    renderPage(
      './episode-list.js', 
      'https://swapi.dev/api/films', 
      './style.css')
  }
})






















// test fetch functions 
async function getFilmData(filmNumber) {
  let filmResponse = await fetch(`https://swapi.dev/api/films/${filmNumber}/`)
  let filmData = await filmResponse.json()
  return filmData
}

// getFilmData(1).then((data) => console.log(data))

async function getPlanet() {
  let planetRes = await fetch('https://swapi.dev/api/planets/1/')
  let planetData = await planetRes.json()
  console.log(planetData);
}

// getPlanet()


 
  
 
    
  