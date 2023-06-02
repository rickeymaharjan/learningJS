const todoList = JSON.parse(localStorage.getItem('task'));

renderTodoList();

function renderTodoList () {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i ++) {
        const todoObject = todoList[i]
        const { name, dueDate } = todoObject;

        // const name = todoObject.name;
        // const dueDate = todoObject.dueDate;
        const HTML = `
            <div>${name}</div>
            <div>${dueDate}</div>
                
            <button class="delete-button" onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
            ">Delete</button>
        `
        todoListHTML += HTML;
    }

    document.querySelector('.js-todo-html').innerHTML = todoListHTML;
}


function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-date-input');
    const dueDate = dateInputElement.value;

    const task = {
        name,
        dueDate
    };

    todoList.push(task);

    localStorage.setItem('task', JSON.stringify(todoList));

    inputElement.value = ''

    renderTodoList();
}