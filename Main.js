(renderAll = () =>{

    const mainContainer = document.createElement('div');
    document.body.appendChild(mainContainer);
    mainContainer.className = 'mainContainer';

    const header = document.createElement('div');
    mainContainer.appendChild(header);

    const mainTodoContainer = document.createElement('div');
    mainContainer.appendChild(mainTodoContainer);

    let inputToDo = document.createElement('input');
    header.appendChild(inputToDo);
    inputToDo.placeholder = 'Input todo';
    inputToDo.addEventListener('keyup', () =>{
        if (inputToDo.value.length > 3) {
            submitToDo.disabled = false;
        } else {
            submitToDo.disabled = true;
        }
    })

    let submitToDo = document.createElement('button');
    header.appendChild(submitToDo);
    submitToDo.innerHTML = 'Submit';
    submitToDo.disabled = true;
    submitToDo.addEventListener('click', () => {
            createNewTodoItem(inputToDo.value);
            inputToDo.value = '';
            submitToDo.disabled = true;
    });

    let uuid = () => {

        let uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }

    let showTodoItem = (parsedTodo) =>{

        let todoContainer = document.createElement('div');
        mainContainer.lastChild.insertBefore(todoContainer, mainContainer.lastChild.firstChild);
        todoContainer.id = parsedTodo.id;
        todoContainer.className = 'todoContainer';

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = parsedTodo.checked;
        todoContainer.appendChild(checkbox);

        let todoValue = document.createElement('span');
        todoValue.innerHTML = parsedTodo.value;
        todoContainer.appendChild(todoValue);

        let deleteTodo = document.createElement('button');
        todoContainer.appendChild(deleteTodo);
        deleteTodo.innerHTML = 'Delete';
        deleteTodo.name = 'buttonDelete';

        let editTodoButton = document.createElement('button');
        todoContainer.appendChild(editTodoButton);
        editTodoButton.innerHTML = 'Edit todo';
        editTodoButton.name = 'buttonEdit';
        editTodoButton.hidden = false;

        let saveEditedTodoButton = document.createElement('button');
        todoContainer.appendChild(saveEditedTodoButton);
        saveEditedTodoButton.innerHTML = 'Save changes';
        saveEditedTodoButton.name = 'buttonSaveChange';
        saveEditedTodoButton.hidden = true;

    }

    let createNewTodoItem = (value) => {
        let key = uuid();

        if (localStorage.getItem('keys') === null){
            let keys = [key];
            localStorage.setItem('keys', JSON.stringify(keys));
        }else {
            keys =  JSON.parse(localStorage.getItem('keys'));
            keys[keys.length] = key;
            localStorage.setItem('keys', JSON.stringify(keys));
    }

        let parsedTodo = {
            'value' : value,
            'checked' : false,
            'id' : key
        }


        localStorage.setItem(key, JSON.stringify(parsedTodo));
        showTodoItem(parsedTodo);
    }

    (getTodosFromLS = () =>{
        if (localStorage.length > 0){
            let getedKeys = JSON.parse(localStorage.getItem('keys'));

            /* Object.keys(getedKeys).forEach(function (key){
               let parsedItem =  JSON.parse(localStorage.getItem(key));
               showTodoItem(parsedItem);
             })*/
            for (let i = 0; i <getedKeys.length; i++ ){
                let parsedItem =  JSON.parse(localStorage.getItem(getedKeys[i]));
                showTodoItem(parsedItem);
            }}

    })()

    let changeCheckboxValue = (key) => {

        let parsedJSON = JSON.parse(localStorage.getItem(key));
        if (parsedJSON.checked === true){
            parsedJSON.checked = false;
        }
        else {
            parsedJSON.checked = true;
        }
        localStorage.setItem(key, JSON.stringify(parsedJSON));
    }

    mainTodoContainer.addEventListener("click", ({target}) =>{

        if (target.name === 'buttonDelete'){

            console.log('Done');
            mainTodoContainer.removeChild(target.parentNode);
            localStorage.removeItem(target.parentNode.id);
            /*removeValue(JSON.parse(localStorage.getItem('keys'), target.parentNode.id));*/

            (removeValue = ( keys = JSON.parse(localStorage.getItem('keys'))) => {
                let value = target.parentNode.id;
                for(let i = 0; i <= keys.length; i++) {
                    if(keys[i] === value) {
                        keys.splice(i, 1);
                        localStorage.setItem('keys', JSON.stringify(keys));
                        break;
                    }
                }

                console.log(keys.length);
            })();

            if (localStorage.length === 1){
                localStorage.removeItem('keys');
            }

        }
    })

    mainTodoContainer.addEventListener("change", ({target}) =>{

        if (target.type === 'checkbox'){
            changeCheckboxValue(target.parentNode.id);
        }
    })

    mainTodoContainer.addEventListener("click", ({target}) =>{

        if (target.name === 'buttonEdit'){

            let editTodoInput = document.createElement('input');
            editTodoInput.placeholder = 'Input todo';


            let editingTodoValue = target.parentNode.firstChild.nextSibling.innerHTML;

            editTodoInput.value = editingTodoValue;
            target.parentNode.removeChild(target.parentNode.firstChild.nextSibling);
            target.parentNode.insertBefore(editTodoInput, target.parentNode.firstChild.nextSibling);
            target.hidden = true;
            target.parentNode.lastChild.hidden = false;

            let editedTodo = document.createElement('span');
            editedTodo.innerHTML = editTodoInput.value;

            if (target.parentNode.lastChild.name === 'buttonSaveChange'){

                target.parentNode.lastChild.addEventListener("click", ()=>{

                    editedTodo.innerHTML = editTodoInput.value;
                    target.parentNode.removeChild(target.parentNode.firstChild.nextSibling);
                    target.parentNode.insertBefore(editedTodo, target.parentNode.firstChild.nextSibling);
                    target.hidden = false;
                    target.parentNode.lastChild.hidden = true;
                    
                    let parsedJSON = JSON.parse(localStorage.getItem(target.parentNode.id));
                    parsedJSON.value = editedTodo.innerHTML;
                    localStorage.setItem(target.parentNode.id, JSON.stringify(parsedJSON));
                })

            }
        }
    })
})()


