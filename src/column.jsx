import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    // width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
//   color: red;
`;
const TaskList = styled.div`
    padding: 8px;
    tansition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    
    // flex-grow: 1;
    // min-height: 100px;

    display: flex;
`;


// class TaskList extends React.Component {
//     render() {
//         const { provided, innerRef, children } = this.props;        
//         return (
//             <div    {...provided.draggableProps}
//                     {...provided.dragHandleProps}                    
//                     ref={innerRef}
//             >
//                 {children}
//             </div>
//         );
//     }
// }

export default class Column extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskWidth: 200
        }
    }
    

    render() {
        return (
            <Container>                
                <Title>{this.props.column.title}</Title>
                <Droppable  droppableId={this.props.column.id}
                            isDropDisabled={this.props.isDropDisabled}
                            direction="horizontal">
                    {(provided, snapshot) => (
                            <TaskList   ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        isDraggingOver={snapshot.isDraggingOver}
                                        // provided={provided}
                            >
                                {this.props.tasks.map((task, index) => (
                                    <Task key={task.id} task={task} index={index} />
                                ))}
                                {provided.placeholder}
                            </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}
