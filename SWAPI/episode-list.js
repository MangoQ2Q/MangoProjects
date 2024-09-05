export function render(data) {
  console.log(data.results);

  // <div class="container">
  //     <h1 class="title">Фильмы по вселенной Star Wars</h1>
  //     <ul class="list">
  //       <li class="item"><a href="" class="link">1. A New Hope</a></li>
  //       <li class="item"><a href="" class="link">1. A New Hope</a></li>
  //       <li class="item"><a href="" class="link">1. A New Hope</a></li>
  //       <li class="item"><a href="" class="link">1. A New Hope</a></li>
  //       <li class="item"><a href="" class="link">1. A New Hope</a></li>
  //       <li class="item"><a href="" class="link">1. A New Hope</a></li>
  //     </ul>
  //   </div>

  const container = document.createElement('div');
  const title = document.createElement('h1')
  const list = document.createElement('ul')

  container.classList.add('container')
  title.classList.add('title')
  list.classList.add('list')

  title.textContent = 'Фильмы по вселенной Star Wars'

  for(const [index, film] of data.results.entries()) {
    const item = document.createElement('li')
    const link = document.createElement('a')

    item.classList.add('item')
    link.classList.add('link')

    link.textContent = `${index + 1}. ${film.title}`
    link.href = `?film=${index + 1}`
  
    item.append(link)
    list.append(item)

    // Side quest
    let linkURL = `?film=${index + 1}`
    link.addEventListener('click',async e => {
      e.preventDefault()
      history.pushState(null, '', linkURL)
      let module = await import('./main.js')
      const appContainer = document.getElementById('app')
      let filmNumber = module.createFilmNumber()
      
      if(filmNumber) {
        module.renderPage(
          './episode.js', 
          `https://swapi.dev/api/films/${filmNumber}`, 
          './style.css')
      } else {
        module.renderPage(
          './episode-list.js', 
          'https://swapi.dev/api/films', 
          './style.css')
      }
    })
  }

  container.append(title, list)

  return container
}