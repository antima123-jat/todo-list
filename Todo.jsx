import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

export default function Todo() {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([])

  useEffect(() => {
    !firebase.user && navigate('/login')
  }, [firebase])

  useEffect(() => {
    firebase.user && firebase.fetchTodos()
      .then(todos => setTodos(todos.docs))
  }, [firebase])

  // console.log(firebase.todos);
  // console.log(Object.values(firebase.todos));

  return (

    <div className="container">
      <h2 className='text-center'>Your Todos</h2>
      <div className="row">
        <Droppable droppableId='Low'>
          {
            (provided) => (
              <div className={`col-md-2 mt-3 m-5 shadow-lg p-3 mb-4 rounded bg-success`} style={{ height: '80vh', textAlign: 'center' }} ref={provided.innerRef} {...provided.droppableProps}>
                <h5>Low Priority</h5>
                {
                  Object.values(firebase.todos).map((todo, index) => {
                    return todo.priority === 'Low' && <SingleTodo key={todo.id} id={todo.id} index={index} {...todo} />
                  })
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        <Droppable droppableId='Medium'>
          {
            (provided) => (
              <div className={`col-md-2 mt-3 m-5 shadow-lg p-3 mb-4 rounded bg-warning`} style={{ height: '80vh', textAlign: 'center' }} ref={provided.innerRef} {...provided.droppableProps}>
                <h5>Medium Priority</h5>

                {
                  Object.values(firebase.todos).map((todo, index) => {
                    return todo.priority === 'Medium' && <SingleTodo key={todo.id} id={todo.id} index={index} {...todo} />
                  })
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        <Droppable droppableId='High'>
          {
            (provided) => (
              <div className={`col-md-2 mt-3 m-5 shadow-lg p-3 mb-4 rounded bg-danger`} style={{ height: '80vh', textAlign: 'center' }} ref={provided.innerRef} {...provided.droppableProps}>
                <h5>High Priority</h5>

                {
                  Object.values(firebase.todos).map((todo, index) => {
                    return todo.priority === 'High' && <SingleTodo key={todo.id} id={todo.id} index={index} {...todo} />
                  })
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        <Droppable droppableId='complete'>
          {
            (provided) => (
              <div className={`col-md-2 mt-3 m-5 shadow-lg p-3 mb-4 rounded bg-primary`} style={{ height: '80vh', textAlign: 'center' }} ref={provided.innerRef} {...provided.droppableProps}>
                <h5>Completed</h5>
                {
                  Object.values(firebase.todos).map((todo, index) => {
                    return todo.priority === 'complete' && <SingleTodo key={todo.id} id={todo.id} index={index} {...todo} />
                  })
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
    </div>
  )
}
