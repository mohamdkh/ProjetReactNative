import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AsyncStorage } from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import { cos } from 'react-native-reanimated';
import Services from './Services/services'
import AuthContext from './context/context'
const RegisterScreen = ({navigation}) => {
    const [data, setInfos] = React.useState({
        username: '',
        password: '',
        confirmpassword:'',
        check_textInputChange: false,
        secureTextEntry: true,
        confirmsecureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setInfos({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setInfos({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handleconfirmpasswordChange=(val)=>{
        console.log(val.trim())
        setInfos({
            ...data,
            confirmpassword: val
        });
    }
    const updateSecureconfirmTextEntry=()=>{
        setInfos({
            ...data,
            confirmsecureTextEntry: !data.confirmsecureTextEntry
        });
    }
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setInfos({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setInfos({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setInfos({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const {Register}=React.useContext(AuthContext);
    const RegisterAction = () => {
        if(data.password!=data.confirmpassword){
            Alert.alert('Erreur',
                    'Les mots de passe que vous avez entrés ne sont pas identiques')
        }
        else{
            Register(data.username,data.password);
        }
        
    }
    return (
        <View
        style={styles.container}>
            <Animatable.View 
            animation ="fadeInDownBig"
            duraton ="2500" 
            style={styles.header}>
            <Text style={styles.text_header}>Créez un compte !</Text>
        </Animatable.View>
        <Animatable.View 
         animation ="fadeInLeft"
         duraton ="2500"
        style={styles.footer}>
            <Text style={styles.text_footer}>Email :</Text>
            <View style={styles.action}>
                <FontAwesome 
                name="user-o"
                color="#009387"
                size={20}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Votre email"
                onChangeText={(val) => textInputChange(val)}
                />
            </View>
            <Text style={styles.text_footer}>Mot de passe :</Text>
            <View style={styles.action}>
                <FontAwesome 
                name="lock"
                color="#009387"
                size={23}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Saisissez votre mot passe"
                secureTextEntry={data.secureTextEntry}
                onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.text_footer}>Confirmez le mot de passe :</Text>
            <View style={styles.action}>
                <FontAwesome 
                name="retweet"
                color="#009387"
                size={23}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Confirmez le mot de passe"
                secureTextEntry={data.confirmsecureTextEntry}
                onChangeText={(val) => handleconfirmpasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureconfirmTextEntry}
                >
                    {data.confirmsecureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
            <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {RegisterAction()}}
                >
                    <LinearGradient
                     colors={['#08d4c4', '#01ab9d']}
                     style={styles.signIn}
                    >
                        <Text style={styles.textSign,{
                            color:'#fff'
                        }}>S'inscrire</Text>
                    </LinearGradient>
                </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                     style={styles.signUp}
                    >
                        <Text style={styles.textSign,{
                            color:'#009387'
                        }}>Se connecter</Text>
                    </TouchableOpacity>
        </View>
        <View style={styles.button}>
            
        </View>
        </Animatable.View>
      
        </View>
    )
}
export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    signUp:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15,
        borderColor: '#009387',
        borderWidth: 1,

    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });