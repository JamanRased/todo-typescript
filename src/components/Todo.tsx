import React from 'react';

const Todo = ({items, onClick}:{
    items: string[],
    onClick: (item: string) => void;
}) => {
    return (
        <div>
            {
                items.map((item, index) =>(
                    <li key={index} onClick={() => onClick(item)}>

                    </li>
                ))
            }
        </div>
    );
};

export default Todo;