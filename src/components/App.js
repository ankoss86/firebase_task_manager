import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';

import UserPanel from './ToDo/UserPanel';

import { connect } from 'react-redux';
import TaskForm from './ToDo/TaskForm';
import TaskList from './ToDo/TaskList';

class App extends Component {

  state = {
    user: this.props.signedUser
  }

  componentDidMount(){
    if(!this.state.user) {
      this.props.history.push('/login')
    } 
  }

  render() {
    return (
      <div className='app'>
        <UserPanel />
        <TaskForm user={this.state.user}/>
        <TaskList user={this.state.user}/>
      </div>      
    );
  }
}

const MSTP = state => {
  return {
      signedUser: state.signedUser.signedUser,
  }
}

export default withRouter(connect(MSTP)(App));
