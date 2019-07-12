import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { createStore, applyMiddleware, } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import Routing  from './src/Routes/Routing'
import reducer from './src/reducer';


const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Routing />
      </Provider>
      );
  }
}

export default App;