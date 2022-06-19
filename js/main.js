let listDOM = document.querySelector('#list')
let taskDOM = document.querySelector('#task')
let alert = document.querySelector('#alert')


taskDOM.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("liveToastBtn").click();
    }
}); 
listDOM.addEventListener('click', deleteTodo)
document.addEventListener('DOMContentLoaded',loadAllTodosToUI)

//Liste elemanı ekleme
function newElement() {
    const newTodo = taskDOM.value.trim();

    if(newTodo == ''){
        alertFunction("danger","Lütfen Giriş Yapınız!")
    }else{
        addTodoUI(newTodo)
        addTodoToStorage(newTodo)
        alertFunction("success",'Hedef Başarılı Bir Şekilde Eklendi.')
    }
}

//Eklenen Eleman Görünümü
function addTodoUI(newTodo){
    const listItem = document.createElement('li')
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center'
   
    const deleteIcon = document.createElement('a')
    deleteIcon.href = '#'
    deleteIcon.className = 'delete-item'
    deleteIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>'

    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(deleteIcon)
 
    

    listDOM.appendChild(listItem)
    taskDOM.value = ''
}

//Eklenen eleman silme

function deleteTodo(event){
    if(event.target.className === 'fa-solid fa-xmark'){
        event.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(event.target.parentElement.parentElement.textContent)
        alertFunction("warning",'Hedef Başarılı Bir Şekilde Silindi.')
    }    
}

// Yapıldı kontrol işareti
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

//Local Storage Ekleme ve Silme

function addTodoToStorage(newTodo){
let todos = getTodosFromStorage()
todos.push(newTodo)

localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodosFromStorage(){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage()
    todos.forEach(todo => {
        addTodoUI(todo)
    })
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage()

    todos.forEach(
        function(todo,index){
            if(todo === deleteTodo){
                todos.splice(index,1)
            }
        }

    )
    localStorage.setItem('todos', JSON.stringify(todos))
}


//Alert Başlangıç
function alertFunction(type, message){
    const alertDiv = document.createElement('div')
    alertDiv.className = `alert alert-${type}`
    alertDiv.textContent = message;
    alert.append(alertDiv)

    setTimeout(function(){ // gelen uyarıyı 1,5 saniye sonra siler
        alertDiv.remove()
    },1500)
}
//Alert Bitiş



