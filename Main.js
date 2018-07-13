const renderAll = () => {

    let todoKey = +localStorage.key(localStorage.length - 1);
    let header = document.createElement('div');
    let deleteTodoButon = document.createElement('button');
    let toDo = document.createElement('span');
    let todoContainer = document.createElement('div');

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

            mainContainer.appendChild(todoContainer);
            todoContainer.appendChild(toDo);

            todoKey += 1;
            todoContainer.id = todoKey;
            localStorage.setItem(todoKey, toDo.innerHTML);
            toDo.id = todoKey;

            todoContainer.appendChild(deleteTodoButon);
            deleteTodoButon.innerHTML = 'Delete';
            deleteTodoButon.name = 'buttonDelete';

    }


    getTodo = () => {
        if (localStorage.length > 0){
            for (let i = 1; i <= localStorage.length; i++) {
                const todoContainerForGeted = document.createElement('div');
                mainContainer.appendChild(todoContainerForGeted);

                let getedTodo = document.createElement('span');
                getedTodo.innerHTML = localStorage.getItem(i);
                todoContainerForGeted.appendChild(getedTodo);
                getedTodo.id = i;
                todoContainerForGeted.id = i;
                let deleteTodo = document.createElement('button');
                todoContainerForGeted.appendChild(deleteTodo);
                deleteTodo.innerHTML = 'Delete';
                deleteTodo.name = 'buttonDelete';
            }
        }
    }

    getTodo();
    mainContainer.addEventListener("click", ({target}) =>{
        if (target.name === 'buttonDelete'){
            console.log('Done');
            mainContainer.removeChild(target.parentNode);
            localStorage.removeItem(target.parentNode.id);
        }
    })
}
renderAll();