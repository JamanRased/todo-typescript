import React, { useCallback, useReducer, useRef } from 'react';

const Todos = () => {
    interface Todo{
        id: number,
        text: string,
    }
    type ActionType = {type: "ADD"; text:string} | {type: "REMOVE"; id:number} 

    function reducer(state: Todo[], action: ActionType){
        switch(action.type){
            case "ADD":
                return[
                    ...state,
                    {
                        id: state.length,
                        text: action.text,
                    },
                ];
                case "REMOVE":
                return state.filter(({id}) => id !== action.id);
        }
    }
    const [todos, dispatch] = useReducer(reducer, []);
    const newTodo = useRef<HTMLInputElement>(null);

    const addTodo=useCallback(() =>{
           if(newTodo.current){
                dispatch({
                    type: "ADD",
                    text:newTodo.current.value
                })
                newTodo.current.value = " ";
            }
           },[])

    return (
        <div>
            <input type="text" ref={newTodo} />
            <button onClick={addTodo}> Add a new Item </button>
            
            {
                todos.map((todo) =>(
                    <div key={todo.id}>{todo.text}
                    <button onClick={()=> dispatch({type:"REMOVE", id: todo.id})}> Remove Item </button>
                    </div>
                ))
            }
        </div>
    );
};

export default Todos;