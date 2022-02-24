import React, { useCallback, useReducer, useRef } from 'react';
import Button from '@mui/material/Button';
import { Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';


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
        <Container fixed>
        <Box sx={{bgcolor: '#cfe8fc', height: 'auto', paddingTop:'20px' }}>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                    Note Your Daily Task
                </Typography>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Box sx={{bgcolor: '#ffdbf4',   margin:'10px', padding:'20px' }}>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Add Task
                        </Typography>

                        <input type="text" ref={newTodo}/>
                        <Button variant="outlined" onClick={addTodo} sx={{ margin:'10px' }}> Add a new Item</Button>
                    </Box>    
                </Grid>
                <Grid item xs={6}> 
                    <Box sx={{bgcolor: '#f9f6ac',padding:'20px', margin:'10px' }}>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Show Task
                        </Typography>
                        {
                            todos.map((todo) =>(
                                <div key={todo.id}>
                               
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                    {todo.text}
                                </Typography>
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                    <Button variant="outlined" onClick={()=> dispatch({type:"REMOVE", id: todo.id})}> Remove Item</Button>
                                </Typography>
                                
                                </div>
                            ))
                        }
                    </Box>    
                </Grid>
                
            </Grid>
        </Box>
        </Container>
    );
};

export default Todos;