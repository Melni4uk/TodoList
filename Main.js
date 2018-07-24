(renderAll = () => {

    let header = document.createElement('div');

    let todoObj = {};

    (renderHeader = () => {

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
    })();

    let mainContainer = document.createElement('div');
    document.body.appendChild(mainContainer);

    let todoKey = +localStorage.key(localStorage.length - 1);

    let createToDos = (text) => {

        let toDo = document.createElement('span');
        let todoContainer = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        todoKey += 1;
        todoContainer.appendChild(checkbox);
        checkbox.id = todoKey;

        todoObj.value = text;
        todoObj.id = todoKey;
        todoObj.checked = false;
        toDo.innerHTML = text;

        mainContainer.appendChild(todoContainer);
        todoContainer.appendChild(toDo);

        todoContainer.id = todoKey;
        localStorage.setItem(todoKey, JSON.stringify(todoObj));
        toDo.id = todoKey;

        let deleteTodoButon = document.createElement('button');
        todoContainer.appendChild(deleteTodoButon);
        deleteTodoButon.innerHTML = 'Delete';
        deleteTodoButon.name = 'buttonDelete';

        let editTodoButton = document.createElement('button');
        todoContainer.appendChild(editTodoButton);
        editTodoButton.innerHTML = 'Edit todo';
        editTodoButton.name = 'buttonEdit';

        let saveEdiedTodo = document.createElement('button');
        todoContainer.appendChild(saveEdiedTodo);
        saveEdiedTodo.innerHTML = 'Save changes';
        saveEdiedTodo.name = 'buttonSave';
    }

    let changeCheckboxValue = (id) => {
        let parsedJSON = JSON.parse(localStorage.getItem(id));
        if (parsedJSON.checked === true){
            parsedJSON.checked = false;
        }
        else {
            parsedJSON.checked = true;
        }
        localStorage.setItem(id, JSON.stringify(parsedJSON));
    }

    (getTodo = () => {
        if (localStorage.length > 0){
            Object.keys(localStorage).forEach(function (key){
                const localStorageValue = JSON.parse(localStorage.getItem(key));
                const todoItem = document.createElement('div');
                mainContainer.appendChild(todoItem);
                todoItem.id = key;
                let checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.checked = localStorageValue.checked;

                todoItem.appendChild(checkbox);

                let todoValue = document.createElement('span');
                todoValue.innerHTML = localStorageValue.value;
                todoItem.appendChild(todoValue);

                let deleteTodo = document.createElement('button');
                todoItem.appendChild(deleteTodo);
                deleteTodo.innerHTML = 'Delete';
                deleteTodo.name = 'buttonDelete';

                let editTodoButton = document.createElement('button');
                todoItem.appendChild(editTodoButton);
                editTodoButton.innerHTML = 'Edit todo';
                editTodoButton.name = 'buttonEdit';
            })
        }
    })();

    mainContainer.addEventListener("click", ({target}) =>{
        if (target.name === 'buttonDelete'){
            console.log('Done');
            mainContainer.removeChild(target.parentNode);
            localStorage.removeItem(target.parentNode.id);
        }
    })

    mainContainer.addEventListener("change", ({target}) =>{
        if (target.type === 'checkbox'){
            changeCheckboxValue(target.parentNode.id);
        }
    })

    mainContainer.addEventListener("click", ({target}) =>{
        if (target.innerHTML === 'Edit todo'){
            /*mainContainer.removeChild(target.parent);*/
            let editTodoInput = document.createElement('input');
            editTodoInput.placeholder = 'Input todo';


            let editingTodoValue = target.parentNode.firstChild.nextSibling.innerHTML;

            editTodoInput.value = editingTodoValue;
            target.parentNode.removeChild(target.parentNode.firstChild.nextSibling);
            target.parentNode.insertBefore(editTodoInput, target.parentNode.firstChild.nextSibling);
            target.innerHTML = 'Save changes';

            let editedTodo = document.createElement('span');
            editedTodo.innerHTML = editTodoInput.value;
            if (target.parentNode.lastChild.innerHTML === 'Save changes'){
                target.parentNode.lastChild.addEventListener("click", ()=>{
                    console.log('event');
                    editedTodo.innerHTML = editTodoInput.value;
                    target.parentNode.removeChild(target.parentNode.firstChild.nextSibling);
                    target.parentNode.insertBefore(editedTodo, target.parentNode.firstChild.nextSibling);
                })

            }
        }
    })

})();