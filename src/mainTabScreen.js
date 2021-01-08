import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import {View,Text, Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
//* Screens
import AddPoint from './AddPoint'
import HomePage from './HomePage'
import StatistiquePage from './statistiquePage'
import MapPage from './mapPage'
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const DetailStack=createStackNavigator();
const MapStack=createStackNavigator();
HomeStackScreen=({navigation})=>{
    return(
      <HomeStack.Navigator screenOptions={{
        headerStyle:{
         backgroundColor:'#009387',
       },
       headerTintColor:'#fff',
       headerTitleStyle:{
         fontWeight:'bold'
       }
     }}>
       <HomeStack.Screen name="Home" component={HomeScreen} options={{
         title:"Page d'accueil",
         headerLeft:()=>(<Icon.Button name="align-justify" size={25} backgroundColor="#009387" onPress={
          ()=>{navigation.openDrawer();} 
          }/>)
       }}/>
     </HomeStack.Navigator>
    )
  }
 const MapStackScreen=({navigation})=>{
    return(
        <MapStack.Navigator screenOptions={{
          headerStyle:{
           backgroundColor:'#1f65ff',
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold'
         }
       }}>
         <MapStack.Screen name="Home" component={MapPage} options={{
           title:"Localisation ",
           headerLeft:()=>(<Icon.Button name="align-justify" size={25} backgroundColor="#1f65ff" onPress={
            ()=>{navigation.openDrawer();} 
            }/>)
         }}/>
         <MapStack.Screen name="AddPoint" component={AddPoint} options={{
           title:"Localisation ",
           headerLeft:()=>(<Icon.Button name="align-justify" size={25} backgroundColor="#1f65ff" onPress={
            ()=>{navigation.openDrawer();} 
            }/>)
         }}/>
       </MapStack.Navigator>
      )
  }
  const DetailStackScreen=({navigation})=>{
    return(
      <DetailStack.Navigator screenOptions={{
        headerStyle:{
         backgroundColor:'#694fad',
       },
       headerTintColor:'#fff',
       headerTitleStyle:{
         fontWeight:'bold'
       }
     }}>
       <DetailStack.Screen name="Home" component={DetailScreen} options={{
         title:"Statistiques ",
         headerLeft:()=>(<Icon.Button name="align-justify" size={25} backgroundColor="#694fad" onPress={
          ()=>{navigation.openDrawer();} 
          }/>)
       }}/>
     </DetailStack.Navigator>
    )
  }
  const HomeScreen=({navigation})=>{
    return (
     <HomePage/>
    )
  }
  const MapScreen=({navigation})=>{
    return (
    <MapPage/>
    )
  }
  const DetailScreen=()=>{
    return (
      <StatistiquePage/>
    )
  }
  const MainTabScreen=()=>(
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            labeled={false}
            sceneAnimationEnabled={false}
            activeColor="#fff"
            inactiveColor="#95a5a6"
            barStyle={{ backgroundColor: '#ffff' }}
            
            >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                tabBarLabel: 'Accueil',
                tabBarColor:'#009387',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="localisation"
                component={MapStackScreen}
                options={{
                tabBarLabel: 'localisation',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="crosshairs-gps" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Statistique"
                component={DetailStackScreen}
                options={{
                tabBarLabel: 'Statistique',
                tabBarColor: '#694fad',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="chart-pie" color={color} size={26} />
                ),
                }}
            />
            </Tab.Navigator>
  );
  export default MainTabScreen;