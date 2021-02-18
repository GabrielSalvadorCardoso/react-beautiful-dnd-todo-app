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

class TaskContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            className: "task"
        }
    }

    componentDidUpdate = () => {
        console.log(this.state.className)
    }
    onChangeValue = (event) => {
        let width = parseInt(event.target.value);
        let className = "task";
        console.log(width)
        switch(width) {
            case 200:
                className = "task-width-200"
                break;
            case 300:
                className = "task-width-300"
                break;
            case 400:
                className = "task-width-400"
                break;
            case 500:
                className = "task-width-500"
                break;
            default:
                className = "task"            
        }
        this.setState({className: className})
    }

    render() {        

        const { provided, innerRef, children} = this.props;
        return (
            <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={innerRef}
                    className={this.state.className}
                    >
                {children}
                <div onChange={this.onChangeValue}>
                    <input type="radio" value="200" name="task-width" /> 200
                    <input type="radio" value="300" name="task-width" /> 300
                    <input type="radio" value="400" name="task-width" /> 400
                    <input type="radio" value="500" name="task-width" /> 500
                </div>
                {/* <div style={{color: "red"}}>{content}</div> */}
            </div>
        );
    }
}

export default class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taskWidth: "500px"
        }
    }

    // componentDidUpdate = () => {
    //     console.log(this.state.className)
    // }

    onChangeValue = (event) => {
        let taskWidth = event.target.value;        
        console.log(taskWidth)        
        this.setState({taskWidth: taskWidth})
    }

    render() {
        // return (
        //     <Draggable draggableId={this.props.task.id} index={this.props.index}>
        //         {provided => (
        //             <TaskContent    provided={provided}
        //                             innerRef={provided.innerRef}
        //                             // className={this.state.className}
        //                             // content={this.props.task.content}
        //                             {...provided.draggableProps}
        //                             {...provided.dragHandleProps}
        //             >
        //                 <div onChange={this.onChangeValue}>
        //                     <input type="radio" value="200" name="task-width" /> 200
        //                     <input type="radio" value="300" name="task-width" /> 300
        //                     <input type="radio" value="400" name="task-width" /> 400
        //                     <input type="radio" value="500" name="task-width" /> 500
        //                 </div>
        //                 {this.props.task.content}
        //             </TaskContent>
        //         )}
        //     </Draggable>
        // )
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
                                inputWidth={this.state.taskWidth}
                    >
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
