import React from 'react';
import firebase from '../../firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Grid, Form, Segment, Button, Header, Icon, GridColumn } from 'semantic-ui-react'; 
import { timingSafeEqual } from 'crypto';

class Login extends React.Component {

    state = {
        phoneNumber: '', 
        confirmationResult: null,
        confirmNumber: '',
        user: null,
        usersRef: firebase.database().ref('users'),
        isNew: true
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();              

        let captcha = new firebase        
            .auth
            .RecaptchaVerifier('captcha-container', 
                {
                    'size': 'invisible',
                    'callback': function(response) {
                                    // some code
                                }
                }
            );

        firebase
            .auth()
            .signInWithPhoneNumber(this.state.phoneNumber, captcha)
            .then(confirmationResult => {
                this.setState({ confirmationResult: confirmationResult });
            })
    }

    handleSubmitWithCode = e => {
        e.preventDefault();

        let code = this.state.confirmNumber;
            this.state.confirmationResult.confirm(code)
                .then(result => {
                    // User signed in successfully.
                    let user = result.user;
                    this.setState({ user: user }); 
                    this.saveUserToDataBase(user)                    
                        console.log('user saved')                                       
                })                
                .catch(error => console.log(error));
    }

    isNewUser = (createdUser) => {
        
        this.state.usersRef.on('value', snap => {
           this.setState({isNew: !snap.val().hasOwnProperty(createdUser.uid)})        
        });
        
    }

    saveUserToDataBase = createdUser => {
            this.isNewUser(createdUser);
            this.state.isNew && this.state.usersRef.child(createdUser.uid).set({
            name: '',
            avatar: '',
            phoneNumber: createdUser.phoneNumber,
            tasks: {}
        })
    }

    render() {

        const { phoneNumber, confirmationResult, confirmNumber } = this.state;
        
        return(
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <GridColumn style={{ maxWidth: 450 }}>

                    <Header as='h2' icon color='' textAlign='center'>
                        <Icon name='sign in alternate' color='orange' />
                        Вход в YouTasks
                    </Header>
                    
                    {!confirmationResult 
                    ?
                        <Form onSubmit={this.handleSubmit} size='large'>
                            <Segment stacked>
                                <Form.Input 
                                    fluid 
                                    name='phoneNumber' 
                                    icon='phone' 
                                    iconPosition='left' 
                                    placeholder='phone number' 
                                    type='text' 
                                    onChange={this.handleChange} 
                                    // className={this.handleInputErros(errors, 'email')}
                                    value={phoneNumber}
                                /> 
                                <Button color='orange' fluid size='large'>
                                    Отправить
                                </Button>                            
                            </Segment>
                        </Form>
                    :                            
                        <Form onSubmit={this.handleSubmitWithCode} size='large'>
                            <Segment stacked>
                                <Form.Input 
                                    fluid 
                                    name='confirmNumber' 
                                    icon='lock' 
                                    iconPosition='left' 
                                    placeholder='phone number' 
                                    type='text' 
                                    onChange={this.handleChange} 
                                    // className={this.handleInputErros(errors, 'email')}
                                    value={confirmNumber} 
                                />     
                                <Button color='green' fluid size='large'>
                                    Войти
                                </Button> 
                            </Segment>
                        </Form>                     
                    }
                                                 

                            
                   
                </GridColumn>
            </Grid>
        );
    }
}

const MSTP = state => {
    return {
        user: state.signedUser.signedUser,
    }
}

export default withRouter(connect(MSTP)(Login));