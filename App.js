import React from 'react';
import HomePage from './src/views/homeScreen/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RedeemPage from './src/views/redeemScreen/redeem';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, statusBarColor: '#32CCC3'}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Redeem" component={RedeemPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
