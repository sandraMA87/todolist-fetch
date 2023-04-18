import React, { useState, useEffect } from "react";


const TodoList = () => {
  const [tareaActual, setTareaActual] = useState("");
  const [tareas, setTareas] = useState([]);
  

  useEffect(() => {
    getAllTasks()
  }, []);

  const getAllTasks = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/smontero")
    .then((respuesta) => respuesta.json())
    .then((data) => setTareas(data))
    .catch((error) => console.log(error));
  
  }

  const handleAddTask = (e) => {
  if (e.key === "Enter" && tareaActual.trim()) {
    let aux = {
      "label": tareaActual, 
      "done" : false,
    }
    let newTarea = [aux, ...tareas]
    setTareas(newTarea);
  
    setTareaActual("");

    fetch('https://assets.breatheco.de/apis/fake/todos/user/smontero', {
      method: "PUT",
      body: JSON.stringify(newTarea),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data);
        getAllTasks(); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
 }
 }

 const handleDelete = (index) => {
    let tareaActualizada = [...tareas]
    tareaActualizada.splice(index, 1)
    setTareas(tareaActualizada);

    fetch('https://assets.breatheco.de/apis/fake/todos/user/smontero', {
      method: "PUT",
      body: JSON.stringify(tareaActualizada),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data);
        getAllTasks(); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });

 }


 return (
    <div className="todolist justify-content-center align-items-center">
      <h1>TodoList</h1>
      <input
        value={tareaActual}
        onChange={(e) => {setTareaActual(e.target.value);
        }}
        onKeyDown={(e) => handleAddTask(e)}
      />
      <div className="lista-tareas justify-content-center align-items-center">
      <ul className="list-group" >
        {tareas.map((item, index) => (
          <li key={index}>{item.label}
          <button onClick={() => handleDelete(index)}><i className="fa fa-trash"></i></button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TodoList;
