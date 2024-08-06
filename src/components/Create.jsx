import React, { useContext, useState } from 'react'
import TodoForm from './TodoForm'
import { MyContext } from '../context/Context'

const Create = ({onClose}) => {
  const {dispatch} = useContext(MyContext)
  const onSubmit = (data) => {
    dispatch({type: "ADD",payload: data})
    onClose()
  }
  return (
    <div>
      <TodoForm onClose={onClose} onSubmit={onSubmit}/>
    </div>
  )
}

export default Create