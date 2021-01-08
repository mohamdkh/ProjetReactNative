import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ScrollView,
    Alert, Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AuthContext from './context/context'
import * as ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import Services from './Services/services'
// import { useNavigationParam } from '@react-navigation/native';
function AddPoint({navigation,route }){
    const [data, setInfos] = React.useState({
        nom: '',
        description: '',
        type:'',
        file:File,
        lat:route.params.lat,
        lon:route.params.lon
    });
    const handleChoosePhoto=()=>{
        const options = {
            noData: true,
          };
          ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                setInfos({
                    ...data,
                    file: response,
                });
            }
          });
    }
    const SendData=()=>{
       Services.SendData(data).then(
           result=>{
               if(result.data!=null){
                Alert.alert('Info. ',
                'La place a été enregistré avec succès.  merci!')
               }
           }
       )
    }
 return(
    <View
    style={styles.container}>
        <Animatable.View 
        animation ="fadeInDownBig"
        duraton ="2500" 
        style={styles.header}>
        <Text style={styles.text_header}>Enrichissez notre App !</Text>
    </Animatable.View>
    <Animatable.View 
     animation ="fadeInLeft"
     duraton ="2500"
    style={styles.footer}>
        <ScrollView>
        <View style={styles.action}>
            <TextInput 
            style={styles.textInput}
            placeholder="Nom de place"
            onChangeText={(val) => {
                setInfos({
                    ...data,
                    nom: val,
                });
            }}
            />
        </View>
        <View style={styles.action}>
        <Picker 
            selectedValue={data.type}
            accessibilityLabel='Type of data'
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue)
            setInfos({
                ...data,
                type: itemValue,
            });
        }}>
            <Picker.Item label="Café" value="Café" />
            <Picker.Item label="Restaurant" value="Restaurant" />
            <Picker.Item label="hôpital" value="hôpital" />
            <Picker.Item label="Monument historique" value="Monument historique" />
            <Picker.Item label="SuperMarket" value="SuperMarket" />
        </Picker>
        </View>
        <View style={styles.action}>
            <TextInput 
            style={styles.textInput}
            placeholder="Description"
            numberOfLines={3}
            secureTextEntry={data.secureTextEntry}
            onChangeText={(val) => setInfos({
                ...data,
                description: val,
            })}
            />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',borderRadius:25 }}>
        <Button title="Choisir une photo" style={{borderRadius:25}}
         onPress={()=>handleChoosePhoto()}
         />
      </View>
        <View style={styles.button}>
        <TouchableOpacity
                style={styles.signIn}
                onPress={() => {SendData()}}
            >
                <LinearGradient
                 colors={['#08d4c4', '#1f65ff']}
                 style={styles.signIn}
                >
                    <Text style={styles.textSign,{
                        color:'#fff'
                    }}>Ajouter</Text>
                </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                 style={styles.signUp}
                >
                    <Text style={styles.textSign,{
                        color:'#1f65ff'
                    }}>Annuler</Text>
                </TouchableOpacity>
    </View>
    </ScrollView>
    <View style={styles.button}>
        
    </View>
    </Animatable.View>
  
    </View>
 )
}
export default AddPoint;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1f65ff'
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
        borderColor: '#1f65ff',
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