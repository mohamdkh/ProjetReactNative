import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;