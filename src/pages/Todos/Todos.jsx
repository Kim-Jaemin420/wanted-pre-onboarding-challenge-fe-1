import React, { useEffect, useState } from 'react';
import styles from './todos.module.scss';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, getTodos } from '../../api/todo';
import { TodoForm } from '../../components';
import TodoCard from '../../components/TodoCard/TodoCard';

const { wrapper, title, cardWrapper } = styles;

function Todos() {
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
    <div className={wrapper}>
      <h1 className={title}>todos</h1>
      <TodoForm setTodos={setTodos} />
      <ul className={cardWrapper}>
        {todos.map(({ title, content, id }) => (
          <TodoCard
            key={id}
            id={id}
            title={title}
            content={content}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </div>
  );
}

export default Todos;
