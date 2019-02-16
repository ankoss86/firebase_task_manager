import React from 'react';
import firebase from '../../firebase';

class TaskForm extends React.Component {

    state = {
        addTask: '',
        taskRef: firebase.database().ref('taskList'),            
    }    

//     componentDidMount(){
//    this.state.taskRef.child(this.props.user.uid).on('value', snap=>console.log(snap.val()))
//     }

handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
}

handleSubmit = e => {
    e.preventDefault();
    this.addTaskToDataBase(this.state.addTask);
    this.setState({ addTask: '' })
}

addTaskToDataBase = (task) => {
    const key = this.state.taskRef.push().key;
    return this.state.taskRef.child(this.props.user.uid).push().set({
        id: key,
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
        content : task
    }).then(() => console.log('aded'))
}
    render(){ 

        const { addTask } = this.state;

        return(
            <div>
                <form className='tasksForm' onSubmit={this.handleSubmit}>
                    <input className='inputTasks' value={addTask } onChange={this.handleChange} name='addTask' type='text' placeholder='Добавить задание...'></input>
                    {/* <button onSubmit={this.handleSubmit} type='submit'>Добавить</button>                     */}
                    <i onClick={this.handleSubmit} class="fas fa-plus"></i>
                </form>                
            </div>
        )
    }
}

export default TaskForm;