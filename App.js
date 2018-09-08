import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';
import Preload from './src/Preload';
import Home from './src/Home';
import Conversations from './src/Conversations';
import SignUp from './src/SignUp';
import SignIn from './src/SignIn';

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navigation = createStackNavigator({
  Preload: {
    screen: Preload
  },
  Home: {
    screen: Home
  },
  Conversations: {
    screen: Conversations
  },
  SignUp: {
    screen: SignUp
  },
  SignIn: {
    screen: SignIn
  }
})

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}