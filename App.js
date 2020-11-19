import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import AddDeck from './components/AddDeck'
import AddQuestion from './components/AddQuestion'
import Deck from './components/Deck'
import Decks from './components/Decks'
import Quiz from './components/Quiz'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/helpers';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config : {
    duration: 500
  }
}


function Home() {
  return (
    <Tab.Navigator initialRouteName="Decks" >
      <Tab.Screen name="Decks" component={Decks} headerShown={false}/>
      <Tab.Screen name="Add Deck" component={AddDeck}/>
    </Tab.Navigator>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <NavigationContainer>
        <Provider store={createStore(reducer)}>
          <StatusBar />
          <Stack.Navigator >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Deck" component={Deck} options={
            ({route}) => ({
                title: route.params.title,
                animationEnabled: true,
                  transitionSpec: {
                    open: config,
                    close: config,
                  }
            })} />
            <Stack.Screen name="Add Question" component={AddQuestion} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
