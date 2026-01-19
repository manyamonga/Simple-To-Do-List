document.addEventListener('DOMContentLoaded' , () => {
    //select all the elements
    const todoTitle = document.getElementById("todoTitle");
    const todoDescription = document.getElementById("todoDescription");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");

    //load todos from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    
    //render todos
    function rendertodos() {
        todoList.innerHTML = todos.map((todo, index)=
        ` <div class="card todo-item">
    <div class="todo-content">
        <h3>(${todo.title})</h3>
        <p>(${todo.description})</p>
        <span class="status status-pending">Pending</span>
    </div>
    </div>
    <!--actions-->
    <div class="todo-actions">
        <button onclick = "deleteTodo(${index})" class="btn edit-btn">
            <i class="fas fa-edit"></i></button>
        <button class="btn delete-btn">
            <i class="fas fa-trash"></i></button>
    </div>
    </div> `
).join("");
}

    //add new todo and save into local storage
    function addTodo (){
      const title = todoTitle.value.trim()
      const description = todoDescription.value.trim()
      if (title) {
        todos.push({
            title,
            description,
        })
        todoTitle.value = "";
        todoDescription.value = "";
      }
      rendertodos();
      //save todo into local storage
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    //delete todo
    window.deleteTodo =(todoIndex)=>{
        todos.splice(todoIndex, 1);
        //update the ui
        rendertodos();
    };

    //edit 
    window.editTodo =(todoIndex)=>{
        const todoToEdit = todos[todoIndex];
        todoTitle.value = todoToEdit.title || "" ;
        todoDescription.value = todoToEdit.description || "" ;
        todos.splice(todoIndex , 1);
        rendertodos();
    };
    addBtn.addEventListener('click', addTodo);
})

console.log(window);