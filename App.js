import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';
import Preload from './src/screens/Preload';
import Home from './src/screens/Home';
import Conversations from './src/screens/Conversations';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';

console.disableYellowBox = true;

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navigation = createStackNavigator({
  Preload: {
    screen: Preload
  },
  Home: {
    screen: Home
  },
  Conversations: {
    screen: Conversations,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#128C7E', 
        elevation: null
      },
      headerTintColor: '#ECE5DD',
      title: 'WattsApp Clone'
    }),
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