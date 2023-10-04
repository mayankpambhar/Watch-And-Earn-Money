import React from 'react';
import HomePage from './src/views/homeScreen/home';
import GetOneGb from './src/views/GetOneGbScreen/GetOneGb';
import GetTwoGb from './src/views/GetTwoGbScreen/GetTwoGb';
import WatchVideoScreen from './src/views/watchVideoScreen/watchVideoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RedeemPage from './src/views/redeemScreen/redeem';
import ScratchPage from './src/views/scratchScreen/scratch';
import Splash from './src/views/splashScreen/splash';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false, statusBarColor: '#32CCC3'}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="GetOneGb" component={GetOneGb} />
        <Stack.Screen name="GetTwoGb" component={GetTwoGb} />
        <Stack.Screen name="Redeem" component={RedeemPage} />
        <Stack.Screen name="Scratch" component={ScratchPage} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="watchVideoScreen" component={WatchVideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
