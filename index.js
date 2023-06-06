const searchBtn = document.querySelector('.search button');
const searchBox = document.querySelector('.search input');
const toDoList = document.querySelector('.todo ol')
const completedToDo = document.querySelector('.completed');
const emptyToDo = document.querySelector('.empty');
const noToDo = document.querySelector('.no-todo');
const error = document.querySelector('.error');
const save = document.querySelector('.save');

const newToDoItem = (item, completed) => {
    const toDoItem = document.createElement('li');
    const toDoText = document.createTextNode(item.charAt(0).toUpperCase() + item.slice(1));
    toDoItem.appendChild(toDoText);

    if (toDoItem) {
        noToDo.style.display = 'none';
        error.style.display = 'none';
    }

    if (completed) {
        toDoItem.classList.add('done');
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener('dblclick', toggleToDoItemState)
}

const toggleToDoItemState = function() {
    if (this.classList.contains('done')) {
        this.classList.remove('done');
    } else {
        this.classList.add('done');
    }
}

completedToDo.addEventListener('click', () => {
    const completedItem = toDoList.getElementsByClassName('done');
    const allToDo = toDoList.children;

    if (completedItem.length > 0) {
        while (completedItem.length > 0) {
            completedItem[0].remove();
        }
        error.style.display = 'none';
    }

    if (allToDo.length === 0) {
        noToDo.style.display = 'block';
    }
})

emptyToDo.addEventListener('click', () => {
    const emptyToDo = toDoList.getElementsByTagName('li');
    while (emptyToDo.length > 0) {
        emptyToDo[0].remove();
    }
    noToDo.style.display = 'block';
    error.style.display = 'none';
})

searchBtn.addEventListener('click', () => {
    if (searchBox.value == '') {
        error.style.display = 'block';
        noToDo.style.display = 'none';
    } else {
        newToDoItem(searchBox.value, false);
        searchBox.value = '';
    }
})

window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'Enter' :
            if (searchBox.value == '') {
                error.style.display = 'block';
                noToDo.style.display = 'none';
            } else {
                newToDoItem(searchBox.value, false);
                searchBox.value = '';
            }
        break;
    }
})

save.addEventListener('click', () => {
    let toDoInfo = {
        "task": "Thing I need to do",
        "completed": false 
    }
    const toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children[i];

        toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('done'),
        }
        toDos.push(toDoInfo);
    }

    localStorage.setItem('List_your_to_do', JSON.stringify(toDos));
    alert('To do saved successfully');
})

const loadTodo = () => {
    if (localStorage.getItem('List_your_to_do') !== null) {
        const toDos = JSON.parse(localStorage.getItem('List_your_to_do'));

        for (let i = 0; i < toDos.length; i++) {
            let toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadTodo();