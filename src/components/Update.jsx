import React, { useContext } from 'react';
import TodoForm from './TodoForm';
import { MyContext } from '../context/Context';

function Update({ onClose, data }) {
  const { dispatch } = useContext(MyContext);

  const updateForm = (value) => {
    dispatch({ type: "UPDATE", payload: value });
    onClose();
  };

  return (
    <div>
      <TodoForm onSubmit={updateForm} initialData={data} />
    </div>
  );
}

export default Update;
