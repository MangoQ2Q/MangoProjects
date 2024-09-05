export function render(data, planets, starships) {
  console.log(data, planets, starships)
  // <div class="container">
  //     <h1 class="title">A New Hope IV</h1> title
  //     <a class="btn-goBack" href="" >Back to episodes</a> !btnGoBack
  //     <p class="text">text</p> !paragraph
  //       <div class="wrap">  !blockwrap
  //         <div class="block"> !block
  //           <h2 class="subtitle">Planets</h2>
  //           <ul class="list">
  //             <li class="item">Harui</li>
  //             <li class="item">Harui</li>
  //             <li class="item">Harui</li>
  //           </ul>
  //         </div>
  //         <div class="block"> !block
  //           <h2 class="subtitle">Species</h2>
  //           <ul class="list">
  //             <li class="item">Orc</li>
  //             <li class="item">Elf</li>
  //             <li class="item">Human</li>
  //           </ul>
//           </div>
  //       </div>
//       <div class="wrap"> !spanWrap
//        <span class="signature">Director: George Lucas</span>
//        <span class="signature">Producer: Gary Kurtz, Rick McCallum</span>
//        <span class="signature">Release date: 1977-05-25</span>
//       </div>
        
//   </div>
  let filmID
   switch (data.episode_id) {
    case 1: filmID = 'I' 
    break
    case 2: filmID = 'II'
    break
    case 3: filmID = 'III'
    break
    case 4: filmID = 'IV'
    break
    case 5: filmID = 'V'
    break
    case 6: filmID = 'VI'
    break
  }

  const container = document.createElement('div')
  const title = document.createElement('h1')
  const btnGoBack = document.createElement('a')
  const paragraph = document.createElement('p')
  const blockWrap = document.createElement('div')
  const spanWrap = document.createElement('div')
  const directorSpan = document.createElement('span')
  const producerSpan = document.createElement('span')
  const releaseSpan = document.createElement('span')

  container.classList.add('container')
  title.classList.add('title')
  btnGoBack.classList.add('btn-goBack')
  paragraph.classList.add('text')
  blockWrap.classList.add('wrap')
  spanWrap.classList.add('wrap')
  directorSpan.classList.add('signature')
  producerSpan.classList.add('signature')
  releaseSpan.classList.add('signature')

  title.textContent = `${data.title} ${filmID}`
  btnGoBack.textContent = 'Back to episodes'
  btnGoBack.href = './main.html'
  paragraph.textContent = data.opening_crawl
  directorSpan.textContent = data.director
  producerSpan.textContent = data.producer 
  releaseSpan.textContent = data.release_date

  const planetsBlock = createBlock('Planets', planets)
  const starshipsBlock = createBlock('Starships', starships)

  blockWrap.append(planetsBlock, starshipsBlock)
  spanWrap.append(directorSpan, producerSpan, releaseSpan)
  container.append(title, btnGoBack, paragraph, blockWrap, spanWrap)
  
  function createBlock(title, unitArr) {
    const block = document.createElement('div')
    const subtitle = document.createElement('h2')
    const list = document.createElement('ul')

    block.classList.add('block')
    subtitle.classList.add('subtitle')
    list.classList.add('list')

    subtitle.textContent = title

    for (const unit of unitArr) {
      const item = document.createElement('li')
      item.classList.add('item')

      item.textContent = unit.name
      list.append(item)
    }

    block.append(subtitle)
    block.append(list)
    
    return block
  }
  // Side quest
  let linkURL = './main.html'
  btnGoBack.addEventListener('click', async e => {
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

  return container
}