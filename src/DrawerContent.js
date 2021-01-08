import * as React from 'react';
import {View, StyleSheet,Image} from 'react-native'
import { createDrawerNavigator , DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AuthContext from './context/context'
export default function DrawerContent(props){
    const {SignOut} =React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Image 
                            style={{ height:120, width:280}}
                            source={{
                                uri:'https://london.ac.uk/sites/default/files/styles/max_1300x1300/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=6LenFxuz'
                            }}/>
                    <View style={styles.userInfoSection}>
                    <Title>Bienvenue sur WeDiscover</Title>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem label="Accueil"
                    icon={({color, size}) => (
                        <Icon 
                        name="home-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={()=>{props.navigation.navigate('Home')}}
                    />
                    <DrawerItem label="Localisation"
                    icon={({color, size}) => (
                        <Icon 
                        name="crosshairs-gps" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={()=>{props.navigation.navigate('localisation')}}
                    />
                    <DrawerItem label="Statistique"
                    icon={({color, size}) => (
                        <Icon 
                        name="chart-pie" 
                        color={color}
                        size={size}
                        />
                    )}
                    onPress={()=>{props.navigation.navigate('Statistique')}}
                    ></DrawerItem>
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem label="Déconnexion"
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                onPress={()=>{SignOut()}}
                >

                </DrawerItem>
            </Drawer.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });