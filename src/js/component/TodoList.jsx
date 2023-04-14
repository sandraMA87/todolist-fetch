import React, { useState, useEffect } from "react";


const TodoList = () => {
    const [todoList, setTodoList] = useState("");
    const [todosLists, setTodosLists] = useState([]);

    const HandleSubmit = (e) => {
      e.preventDefault ();

      if (todoList !== "")
      setTodosLists([{id:`${todoList}` , todoList}, ...todosLists])
      setTodoList("");
    };

    const handleDelete = (id) => {
      const deleteTodoList = todosLists.filter((todo) => todo.id !== id);
      setTodosLists([...deleteTodoList]);
    }

    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/smontero')
        .then((respuesta) => respuesta.json())
        .then((todoList) => {
        setTodosLists(todoList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className="todolist">
      <div className="container">
       <h1> ToDo List </h1>
       <form className="form-container" onSubmit={HandleSubmit}>
        <input type="text" 
               value={todoList} 
               onChange={(e) => setTodoList(e.target.value)}/>
        <button className="btn">Add</button>

       </form>

       <ul className="all-todos">
        {
          todosLists.map((t) => (
            <li className="list-todo" key={t.id}>
            <span className="todo-text" >
            {t.todoList}
            </span>
          <button onClick={() => handleDelete(t.id)}><i className="fa fa-trash"></i></button>
          </li>
          ))
        }
       </ul>
      </div>
     </div>
 );
}

export default TodoList;