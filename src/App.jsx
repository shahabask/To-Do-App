import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToDo = () => {
    if (!toDos.some((item) => item.text === toDo)) {
      if (toDo.trim() !== '') {
        setErrorMessage('');
        setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
        setToDo('');
      } else {
        setErrorMessage('Please write something');
      }
    } else {
      setErrorMessage('Add something new');
    }
  };

  const handleToggleStatus = (id) => {
    setToDos((prevToDos) =>
      prevToDos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const handleDeleteToDo = (id) => {
    setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Tuesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={handleAddToDo} className="fas fa-plus"></i>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="todos">
        {toDos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="left">
              <input
                onChange={() => handleToggleStatus(todo.id)}
                checked={todo.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{todo.text}</p>
            </div>
            <div className="right">
              <i
                onClick={() => handleDeleteToDo(todo.id)}
                value={todo.id}
                className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
        {toDos
          .filter((todo) => todo.status)
          .map((todo) => (
            <h1 key={todo.id}>{todo.text}</h1>
          ))}
      </div>
    </div>
  );
}

export default App;
 