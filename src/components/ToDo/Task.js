import React from 'react';

class Task extends React.Component {

    
removeTaskFromDataBase = e => {
    const { user, tasksRef } = this.props;
    let id = e.target.id; 
   
    tasksRef.child(user.uid).on('value',snap=>{
       let tasks =  snap.val();
       let currentId;
        
        for (let i in tasks) {
            if(tasks[i].id === id){
                currentId = i;
                tasksRef.child(user.uid).child(currentId).remove().then(()=>console.log('done'))               
            }
        }
    })
}

    render(){

        const { task, onClick } = this.props

        return(
            <div  className='task'>
            <p className='taskKontent'>{task.content}</p>
            <p className='delContainer'>
                <i onClick={onClick} className="fas fa-ellipsis-v"></i>
                <span id={task.id} onClick={this.removeTaskFromDataBase} className='hiden'>Удалить</span>
            </p>
        </div>
        )
    }        
}   

export default Task;