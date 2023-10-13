import React from 'react';
import HomePage from './src/views/homeScreen/home';
import WatchVideoScreen from './src/views/watchVideoScreen/watchVideoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RedeemPage from './src/views/redeemScreen/redeem';
import ScratchPage from './src/views/scratchScreen/scratch';
import Splash from './src/views/splashScreen/splash';
import GetPlayCode from './src/views/getPlayCode/getPlayCode';
import GetGb from './src/views/getGbData/getGB';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          statusBarColor: '#32CCC3',
          orientation: 'portrait',
        }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="GetGb" component={GetGb} />
        <Stack.Screen name="Redeem" component={RedeemPage} />
        <Stack.Screen name="Scratch" component={ScratchPage} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="watchVideoScreen" component={WatchVideoScreen} />
        <Stack.Screen name="GetPlayCode" component={GetPlayCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
