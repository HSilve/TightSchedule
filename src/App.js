import React, {Component} from 'react';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import {pushNotifications} from './services';
import {firebaseData} from '../secrets';
import Router from './Router';
import reducers from './reducers';

pushNotifications.configure();
pushNotifications.register();



class App extends Component {
  componentWillMount() {
    console.ignoredYellowBox = [ 'Setting a timer' ];
    firebase.initializeApp(firebaseData);
  }
  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <Router/>
        </Provider>
    )
  }

}

export default App;
