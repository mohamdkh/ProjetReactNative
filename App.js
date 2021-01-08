import * as React from 'react';
import { View, ActivityIndicator,Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './src/mainTabScreen'
import DrawerContent from './src/DrawerContent'
import RootStackScreen from './src/RootStackScreen';
import { useEffect } from 'react';
import AuthContext from './src/context/context'
import Services from './src/Services/services'
const Drawer = createDrawerNavigator();
// screen 

export default function App() {
  const authContext=React.useMemo(()=>({
    Login:(email,password)=>{
      Services.Login(email,password).then(
        (result)=>{
            if(result.data.email==null){
                Alert.alert('Erreur',
                'Email ou le mot de passe non valide')
            }
            else{
              setUserEmail(email)
              setIsLoading(false)
            }
        }
    )
      
    },
    Register:(email,password)=>{
      Services.Register(email,password).then(
        (result)=>{
            if(result.data.email==null){
                Alert.alert('Erreur',
                'Une erreur est survenue lors du traitement de votre requete')
            }
            else{
              setUserEmail(email)
              setIsLoading(false)
            }
        }
    )
      
    },
    SignOut:()=>{
      setUserEmail(null)
      setIsLoading(false)
    },
  }))
  const [isLoading,setIsLoading]=React.useState(true);
  const [email,setUserEmail]=React.useState(null);
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false);
    },1000)
  },[])
  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {
        email==null?
        (
          <RootStackScreen></RootStackScreen>
        )
        :
        (
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          </Drawer.Navigator>
        )
      }
      
     
      {/* <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        {/* <Drawer.Screen name="Notifications" component={DetailStackScreen} /> 
      </Drawer.Navigator> */}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}