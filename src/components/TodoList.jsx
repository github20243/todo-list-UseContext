import React, { useContext } from "react";
import { MyContext } from "../context/Context";
import Todo from "./Todo";

const TodoList = ({onCloseUpdate}) => {
	const { state } = useContext(MyContext);
	const { todo } = state;
	return (
		<div>
			{todo?.map((item) => (
				<Todo {...item} key={item.id} onCloseUpdate={onCloseUpdate}/>
			))}
		</div>
	);
};

export default TodoList;
