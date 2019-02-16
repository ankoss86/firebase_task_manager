import React from 'react';

import firebase from '../../firebase';

import Task from './Task';

class TaskList extends React.Component {

state = {
    user: this.props.user,
    tasksRef: firebase.database().ref('taskList'),
    taskList: []
}

componentDidMount(){
    const { user } = this.state;
    this.addListeners(user.uid);
    this.removeListeners(user.uid);
}

addListeners = userUid => {
    let loadedTasks = [];
    this.state.tasksRef.child(userUid).on('child_added', snap => {
        loadedTasks.push(snap.val());
        this.setState({ taskList: loadedTasks })
    })
}

removeListeners = userUid => {
    let loadedTasks = [];
    this.state.tasksRef.child(userUid).on('child_removed', snap => {
        let removetTask = snap.val();
        loadedTasks = this.state.taskList.filter(task => task.content !== removetTask.content);
        this.setState({ taskList: loadedTasks })
    })
}

removeTask = e => {  
    if(e.target.nextElementSibling !== null){ 
        e.target.nextElementSibling.className = 'visible';
    }
}


displayTask = (taskList) => (
    taskList.length > 0 &&
    taskList.map(task => (
        <Task tasksRef={this.state.tasksRef} user={this.props.user} key={task.timeStamp} task={task} onClick={this.removeTask} />
    ))
)

    render(){

        const { taskList } = this.state;

        return(
            <div className='tasksContainer'>
                {this.displayTask(taskList)}
            </div>
        )
    }
}

export default TaskList;