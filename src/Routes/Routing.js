import React, { Component } from 'react';
import Home from './Home';
import Likes from './Likes';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigation = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Likes: {
    screen: Likes,
    navigationOptions: {
      header: null,
    }
  },
});

const Routing = createAppContainer(MainNavigation);

export default Routing;