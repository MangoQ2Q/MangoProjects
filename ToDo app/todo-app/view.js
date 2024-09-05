

  // создание заголовка
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }
  // создание формы
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form, input, button
    }
  }
  // создание списка для дел
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list
  }
  // создание элемента дела(на странице)
  function createTodoItemElement(todoItem, {onDone, onDelete}) {
    console.log(todoItem);
    const doneClass = 'list-group-item-success'

    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button')

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (todoItem.done) {
      item.classList.add(doneClass)
    }
    item.textContent = todoItem.name;

    item.classList.add('mb-2')
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', function() {
      onDone({todoItem, element: item})
      item.classList.toggle(doneClass, todoItem.done)
    })
    deleteButton.addEventListener('click', function() {
      onDelete({todoItem, element: item})
    })

    buttonGroup.append(doneButton, deleteButton)
    item.append(buttonGroup);

    return item
  }

  // инициализация приложения
  async function createTodoApp(container, {title, owner, todoItemList = [], onCreateFormSubmit, onDoneClick, onDeleteClick}) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = { onDone: onDoneClick, onDelete: onDeleteClick }
    
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    todoItemList.forEach(todoItem => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement)
    })

    todoItemForm.form.addEventListener('submit', async function(e) {
      e.preventDefault();
  
      if (!todoItemForm.input.value) {
        return
      }

      const todoItem = await onCreateFormSubmit({
        owner,
        name: todoItemForm.input.value.trim(), 
      });
      
  
      let todoItemElement = createTodoItemElement(todoItem, handlers)

      todoList.append(todoItemElement);

      todoItemForm.input.value = '';
    })
  }

export {createTodoApp} 

  

  
