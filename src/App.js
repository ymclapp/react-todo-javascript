import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';


import InputField from './components/InputField';
//import { Todo } from './components/model';
import TodoList from './components/TodoList';
import ProductList from '../src/components/products/ProductList'


export default function App() {  

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId 
      && 
      destination.index === source.index
      )
      return;

      let add, 
      active = todos, 
      complete = completedTodos;

      if(source.droppableId === 'TodosList') {
        add=active[source.index];
        active.splice(source.index, 1);
      } else {
        add=complete[source.index];
        complete.splice(source.index, 1);
      }

      if(destination.droppableId === 'TodosList') {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }

      setCompletedTodos(complete);
      setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
        <ProductList />

      </div>
    </DragDropContext>
  );
};

