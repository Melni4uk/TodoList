const renderAll = () => {



    let todoKey = +localStorage.key(localStorage.length - 1);
    let header = document.createElement('div');

    let todoContainer = document.getElementById('todos-Container');
    let deleteTodoButon = document.createElement('button');
    let toDo = document.createElement('span');
    const todosContainer = document.createElement('div');
    document.body.appendChild(todosContainer);


    function renderHeader() {

        document.body.appendChild(header);
        let inputToDo = document.createElement('input');
        header.appendChild(inputToDo);
        inputToDo.placeholder = 'Input todo';

        let submitToDo = document.createElement('button');
        header.appendChild(submitToDo);
        submitToDo.innerHTML = 'Submit';
        submitToDo.addEventListener('click', () => {
            createToDos(inputToDo.value);
            inputToDo.value = '';
        });
    }

    renderHeader();

    let mainContainer = document.createElement('div');
    document.body.appendChild(mainContainer);
    function createToDos(text) {


        toDo.innerHTML = text;

        if (todoContainer) {
            todoContainer.appendChild(toDo);
            todoKey += 1;
            localStorage.setItem(todoKey, toDo.innerHTML);
            toDo.id = todoKey;

            toDo.appendChild(deleteTodoButon);
            deleteTodoButon.innerHTML = 'Delete';
        } else {


            document.body.appendChild(todosContainer);
            todosContainer.id = 'todos-Container';
            todosContainer.appendChild(toDo);
            todoKey += 1;
            localStorage.setItem(todoKey, toDo.innerHTML);
            toDo.id = todoKey;

            todosContainer.appendChild(deleteTodoButon);
            deleteTodoButon.innerHTML = 'Delete';
        }

    }

    getTodo = () => {

        for (let i = 1; i <= localStorage.length; i++) {
            const todoContainerForGeted = document.createElement('div');
            mainContainer.appendChild(todoContainerForGeted);

            let getedTodo = document.createElement('span');
            getedTodo.innerHTML = localStorage.getItem(i);
            todoContainerForGeted.appendChild(getedTodo);
            getedTodo.id = i;

            let deleteTodo = document.createElement('button');
            todoContainerForGeted.appendChild(deleteTodo);
            deleteTodo.innerHTML = 'Delete';
        }
    }

    getTodo();

}
renderAll();