import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function SingleTodo(props) {
    return (
        <Draggable draggableId={props.id.toString()} index={props.index}>
            {
                (provided) => (
                    <div className='shadow p-3 mb-5 bg-body-tertiary rounded' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                       {props.title}
                    </div>
                )
            }
        </Draggable>
    )
}
