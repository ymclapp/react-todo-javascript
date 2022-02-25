import React, { useState, useRef } from 'react';
import { Todo } from './model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import '../components/styles.css';
import { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';


type Props = {  //only using type to get a chance to use it vs all interfaces
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number,
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {

    const [edit, setEdit] = useState(false);
    const [editTodo, setEditTodo] = useState(todo.todo);

    const handleDone = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const inputRef = useRef(null);


    return (
        <Draggable draggableId={todo.id.toString()} index={index}>

            {
                (provided, snapshot) => (
                    <form
                    className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} 
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                {edit ? (
                    <input
                        ref={inputRef}
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className='todos__single--text'
                    />
                ) : todo.isDone ? (
                    <s className='todos__single--text'>{todo.todo}</s>
                ) : (
                    <span className='todos__single--text'>{todo.todo}</span>
                )}


                <div>
                    <span
                        className="icon"
                        onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}
                    >
                        <AiFillEdit />
                    </span>

                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <AiFillDelete />
                    </span>

                    <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </div>
            </form>
    )}


        </Draggable>
    );
};

export default SingleTodo