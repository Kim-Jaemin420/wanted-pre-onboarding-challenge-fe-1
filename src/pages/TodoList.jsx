import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, getTodos } from '../api/todo';
import { ACCESS_TOKEN } from '../consts/net';
import { getLocalStorage } from '../utils/common';
import TodoForm from '../components/TodoForm';

function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTodos();
        console.log(data);
        await setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!getLocalStorage(ACCESS_TOKEN)) {
      navigate('/login');
    }
  }, [getLocalStorage(ACCESS_TOKEN)]);

  const handleClickRemoveButton = async id => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickTodoList = id => {
    navigate(`/todos/${id}`);
  };

  return (
    <div>
      <h1 className="title">Todo list</h1>
      <TodoForm setTodos={setTodos} />
      <ul>
        {todos.map(({ title, content, id }) => (
          <li key={id} className="todo-list">
            <div onClick={() => handleClickTodoList(id)} className="todo-content">
              <span>{title}</span> <span>{content}</span>
            </div>
            <button
              className="remove-button"
              aria-label="삭제"
              onClick={() => handleClickRemoveButton(id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
