import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { deleteTodo } from '../../api/todo';
import styles from './todoCard.module.scss';

const { card } = styles;

function TodoCard({ id, title, content, todos, setTodos }) {
  const navigate = useNavigate();

  const handleClickTodoList = id => {
    navigate(`/todos/${id}`);
  };

  const handleClickRemoveButton = async id => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li key={id} className={card}>
      <article onClick={() => handleClickTodoList(id)} className="todo-content">
        <h1>{title}</h1>
        <p>{content}</p>
      </article>
      <button
        className="remove-button"
        aria-label="삭제"
        onClick={() => handleClickRemoveButton(id)}
      >
        삭제
      </button>
    </li>
  );
}

export default TodoCard;
