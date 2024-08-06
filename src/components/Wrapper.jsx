import React, { useContext, useState } from "react";
import Create from "./Create";
import TodoList from "./TodoList";
import { MyContext } from "../context/Context";
import Update from "./Update";

const Wrapper = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const onClose = () => setOpenCreateForm((prev) => !prev);
  const onCloseUpdate = () => setOpenUpdate((prev) => !prev);

  const { state } = useContext(MyContext);

  const { data } = state;

  return (
    <div>
      <button onClick={onClose}>{openCreateForm ? "Close" : "Open"}</button>
      {openCreateForm && <Create onClose={onClose} />}
      {openUpdate && <Update data={data} onClose={onCloseUpdate} />}
      {!openCreateForm && <TodoList onCloseUpdate={onCloseUpdate} />}
    </div>
  );
};

export default Wrapper;
