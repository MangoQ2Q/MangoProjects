// getList
export function getTodoList(owner) {
  let lsList = []
  
  let length = window.localStorage.length
  for (let i = 1; i < length; i++) {
    let key = window.localStorage.key(i)
    if(key.split(" ")[0] == owner){
      lsList.push(getItem(key))
    }
  }
  return lsList
}
//createItem
export function createTodoItem({owner, name}) {
  let length = window.localStorage.length
  let i = 0
  if(length > 1)
    i = 1
  for (; i < length; i++) {
    let key = window.localStorage.key(i)
      if(key != owner+" "+i){
        window.localStorage.setItem(owner+" "+i, JSON.stringify({owner, name, done: false, id: owner+" "+i}))
        let lsItem = JSON.parse(window.localStorage.getItem(owner+" "+i)) 
        return lsItem
    }
  }
}
// switchToDone
export function switchTodoItemDone({todoItem}) {
  todoItem.done = !todoItem.done
  window.localStorage.setItem(todoItem.id, JSON.stringify({owner: todoItem.owner, name: todoItem.name, 
    done: todoItem.done, id: todoItem.id}))
}
// DeleteItem
export function deleteTodoItem({ element, todoItem}) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  element.remove()
  console.log(todoItem.id)
  window.localStorage.removeItem(todoItem.id)
}

  // Локальная функция
  function getItem(key) {
    return JSON.parse(window.localStorage.getItem(key))
    
  }
