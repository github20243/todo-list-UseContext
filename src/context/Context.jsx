import React, { useReducer, useEffect, createContext } from "react";

export const MyContext = createContext();

const initialState = {
  todo: JSON.parse(localStorage.getItem("todos")) || [],
  data: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case "DELETE":
      return {
        ...state,
        todo: state.todo.filter(item => item.id !== action.payload),
      };
    case "TOGGLE":
      return {
        ...state,
        data: state.todo.find(item => item.id === action.payload),
      };
    case "UPDATE":
      return {
        ...state,
        todo: state.todo.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        data: {}, 
      };
    default:
      return state;
  }
};

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todo));
  }, [state.todo]);

  return (
    <MyContext.Provider value={{ dispatch, state }}>
      {children}
    </MyContext.Provider>
  );
};
