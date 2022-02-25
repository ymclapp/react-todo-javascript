import React, { useRef, useState } from 'react';
import '../components/styles.css';
// import App from '../App';

// interface Props {
//     todo: string;
//     setTodo: string;
//     handleAdd: (e) => void;
// }

export default function InputField() {

    const inputRef = useRef(null);  //hovered over the ref item below to find the type
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
  
    const handleAdd = (e) => {
      e.preventDefault();
  
      if (todo) {
        setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
        setTodo('');
      }
      console.log(todo);
    };


    return (
        <form className='input' onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
        }}>
            <input
                ref={inputRef}
                action='void'
                type='input'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder='Enter a task'
                className='input__box'
            />
            <button className='input_submit' type='submit'>GO

            </button>
        </form>
    )
};

