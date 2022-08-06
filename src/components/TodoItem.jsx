import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoItem({ title, content, setTitle, setContent, handleSubmit }) {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = event => {
    const { titleField, contentField, submit } = event.currentTarget;

    setTitle(titleField.value);
    setContent(contentField.value);

    if (!titleField.value || !contentField.value) {
      setIsDisabled(true);
    }

    submit.disabled = isDisabled;
  };

  const handleClickCancelButton = () => {
    navigate('/todos');
  };

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <h1 className="title">Todo 수정하기</h1>
      <label htmlFor="titleField">title</label>
      <input type="text" name="titleField" id="titleField" defaultValue={title} />
      <label htmlFor="contentField">content</label>
      <textarea
        name="contentField"
        id="contentField"
        cols="30"
        rows="10"
        defaultValue={content}
      ></textarea>
      <input type="submit" value="수정" name="submit" disabled />
      <button onClick={handleClickCancelButton}>취소</button>
    </form>
  );
}

export default TodoItem;
