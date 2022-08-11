import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './todoItem.module.scss';

const { wrapper, title, buttonWrapper } = styles;

function TodoItem({ title, content, setTitle, setContent, handleSubmit }) {
  const navigate = useNavigate();

  const handleChange = event => {
    let isDisabled = false;
    const { titleField, contentField, submit } = event.currentTarget;

    setTitle(titleField.value);
    setContent(contentField.value);

    if (!titleField.value || !contentField.value) {
      isDisabled = true;
    }

    submit.disabled = isDisabled;
  };

  const handleClickCancelButton = () => {
    navigate('/todos');
  };

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className={wrapper}>
      <h1>Todo</h1>
      <label htmlFor="titleField" className="a11yHidden">
        title
      </label>
      <input type="text" name="titleField" id="titleField" defaultValue={title} />
      <label htmlFor="contentField" className="a11yHidden">
        content
      </label>
      <textarea
        name="contentField"
        id="contentField"
        cols="30"
        rows="10"
        defaultValue={content}
      ></textarea>
      <div className={buttonWrapper}>
        <input type="submit" value="수정" name="submit" disabled />
        <button onClick={handleClickCancelButton}>취소</button>
      </div>
    </form>
  );
}

export default TodoItem;
