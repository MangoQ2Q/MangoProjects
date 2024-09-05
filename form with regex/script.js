
const inputs = document.querySelectorAll('input')
const form = document.getElementById('form')

const allowedSymbols = ['А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 
      'Ж', 'ж', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 
      'П', 'п', 'Р', 'р', 
      'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 
      'Ъ', 'ъ', 'Ы', 'ы', 'Ь', 'ь', 'Э', 'э', 'Ю', 'ю', 'Я', 'я', '-', ' '
]

inputs.forEach(function(i) {
  // контроль ввода с клавиатуры
  i.addEventListener('keypress', event => {
    const pressedKey = event.key;
    for (const item of allowedSymbols) {
      if(pressedKey === item) {
        i.value = i.value + pressedKey
      } else {
        event.preventDefault()
      }
    }
  })
  i.addEventListener('blur', event => {

     // убираем неправильные символы
    let newLine = ''
    for (let char of i.value) {
      for (const item of allowedSymbols) {
      if(char == item) {
        newLine = newLine + char
      }
      }
    }
    i.value = newLine
    console.log(i.value);
    // спереди и позади
    let regexFirstAndLast = /^(-*\s*)+(.*[А-Яа-я])(-*\s*)+/g;
    i.value = i.value.replace( regexFirstAndLast, '$2')
    
    // несколько пробелов
    let regexSpaces = /( +)/g;
    i.value = i.value.replace(regexSpaces, ' ')
    // /дефисов
    let regexhyphen = /(-+)/g; 
    i.value = i.value.replace(regexhyphen, '-')
    // uppercase and losercase
    i.value = i.value.charAt(0).toUpperCase() + i.value.substring(1).toLowerCase()
    
    console.log(i.value);
    })
 
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = document.getElementById('input-name').value
  let surname = document.getElementById('input-surname').value
  let lastname = document.getElementById('input-lastname').value
  
  let $User = document.createElement('p');
  $User.classList.add('lead')
  $User.textContent = surname + ' ' + name + ' ' + lastname 
  document.querySelector('.container').append($User)

  document.querySelectorAll('input').forEach(clearInput)

})

function clearInput(input) {
  input.value = ''
}

