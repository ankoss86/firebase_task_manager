import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { Dropdown} from 'semantic-ui-react'
import Modal from './Modal';

class UserPanel extends React.Component {

    state = {
        user: this.props.signedUser,
        modal: false
    };    
    
    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
                .then(console.log('user sign out'))
    };

    openModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });


    render(){

        const options = [
            {
              key: 'changeAvatar',
              text: <span onClick={this.openModal}>Сменить аватар</span>,                    
            },
            {
              key: 'logOut',
              text: <span onClick={this.handleSignOut}>Выйти</span>,                  
            },            
        ]

        const { user, modal } = this.state;

        return( 
            <div>           
            <div  className='userPanel'> 
                <div>
                    <Dropdown floated='right'
                        trigger={
                        <span>{user.phoneNumber}</span>
                        }                
                        options={options}                
                    />
                </div>   
                
            </div>
            <Modal />
            </div>
        )
    }
}

const MSTP = state => {
    return {
        signedUser: state.signedUser.signedUser,
    }
  }

export default connect(MSTP)(UserPanel);