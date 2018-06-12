import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import Home from './screens/Home';
import Saved from './screens/Saved';
import PostDetail from './screens/components/PostDetail';

const client = new ApolloClient({
  uri: 'https://graphql-server-dev.herokuapp.com/graphql'
});

const AppStackNavigator = createStackNavigator({
  HomeScreen: { screen: Home },
  PostDetail: { screen: PostDetail }
});

console.disableYellowBox = true;

const AppBottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: AppStackNavigator,
    navigationOptions: ({navigation}) => {
      const tabBarVisible = navigation.getParam('hideBar');
      console.log('tabBarVisible', tabBarVisible)
      return {
        tabBarVisible,
        tabBarLabel: 'HOME',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home-outline" style={{ color: tintColor, fontSize: 24 }} />
        )
      }
    }
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      tabBarLabel: 'SAVED',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-heart-outline" style={{ color: tintColor, fontSize: 24 }} />
      )
    }
  }
}, {
    tabBarOptions: {
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  });

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <StatusBar
          backgroundColor="#4F6D7A"
          barStyle="light-content"
        />
        <AppBottomTabNavigator />
      </ApolloProvider>
    );
  }
}
