import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import './task.css'

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props =>
        props.isDragDisabled ? 'lightgrey':
        props.isDragging?'lightgreen':'white'};
    display: flex;
    // color: ${props => props.inputColor || "red"};
    width: ${props => props.inputWidth || "500px"};
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskWidth: "500px"
        }
    }

    onChangeValue = (event) => {
        let taskWidth = event.target.value;        
        console.log(taskWidth)        
        this.setState({taskWidth: taskWidth})
    }

    render() {
        const isDragDisabled = false;//this.props.task.id === 'task-1'
        return (
            <Draggable  draggableId={this.props.task.id}
                        index={this.props.index}
                        isDragDisabled={isDragDisabled}>
                
                {(provided, snapshot) => (
                    <Container  {...provided.draggableProps}
                                
                                ref={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                isDragDisabled={isDragDisabled}
                                // {...provided.dragHandleProps}
                                // inputColor={"blue"}
                                inputWidth={this.state.taskWidth}>
                        <Handle {...provided.dragHandleProps} />
                        {this.props.task.content}
                        <div onChange={this.onChangeValue}>
                            <input type="radio" value="200px" name="task-width" /> 200
                            <input type="radio" value="300px" name="task-width" /> 300
                            <input type="radio" value="400px" name="task-width" /> 400
                            <input type="radio" value="500px" name="task-width" /> 500
                        </div>
                  </Container>
                )}
            </Draggable>
        );
    }
}
