import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter 
} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import firebase from './firebase';
import 'semantic-ui-css/semantic.min.css';

// components
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './Spinner';
import './index.css'


// redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers';
import { signInUser, clearUser } from './redux/actions/index';



const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            
            if(user){
                this.props.signInUser(user);
                this.props.history.push('/');
            } else {
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    }

    render() {
        return this.props.isLoading ? <Spinner/> : (
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/registration' component={Register} />
            </Switch>
        );
    }
}

const MSTP = state => {
    return {
        isLoading: state.signedUser.isLoading,
    }
}

const RootWithAuthentification = withRouter(connect(MSTP, { signInUser, clearUser })(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuthentification />
        </Router>
    </Provider>    
, document.getElementById('root'));

serviceWorker.unregister();
