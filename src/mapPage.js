import React from 'react'
import { View, Text,Button, Image, StyleSheet,TouchableOpacity,ScrollView ,Animated,Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker, Callout } from 'react-native-maps';
import Services from './Services/services'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useEffect } from 'react';
import { ConfirmDialog  } from 'react-native-simple-dialogs';
import Geolocation from '@react-native-community/geolocation';

function MapPage({navigation}){
  const [AllPlaces, setAllPlaces] = React.useState([]);
  const [enableAdding, toggleEnable] = React.useState(false);
  const [dialogVisible, setdialogVisible] = React.useState(true);
  const [enableGPS, setenableGPS] = React.useState(false);
  useEffect(() => {
    Services.GetAllPlaces().then(
      result=>{
        setAllPlaces(result.data)
      }
    )
  }, []);

  
    
    const initialMapState = {
      categories: [
        { 
          name: 'Café', 
          icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
        },
        {
          name: 'Restaurant',
          icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
        },
        {
          name: 'hôpital',
          icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
        },
        {
          name: 'Monument historique',
          icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
        },
        {
          name: 'SuperMarket',
          icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
        },
        {
          name:'Tous',
          icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
        }
        
    ],
      region: {
        latitude: 22.62938671242907,
        longitude: 88.4354486029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
    let mapIndex=0;
    let mapAnimation=new Animated.Value(0)
    useEffect(()=>{
      mapAnimation.addListener(({value})=>{
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= AllPlaces.length) {
        index = AllPlaces.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
              const  coordinate  = {
                                        latitude: AllPlaces[index].lat,
                                        longitude: AllPlaces[index].lon,
                                      };
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: initialMapState.region.latitudeDelta,
              longitudeDelta: initialMapState.region.longitudeDelta,
            },
            350
          );
        }
      }, 10)
      })
    })
    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    const handelUserLocation=()=>{
      Geolocation.getCurrentPosition(info => {
        const  coordinate  = {
          latitude: info.latitude,
          longitude: info.longitude,
        };
          _map.current.animateToRegion(
          {
          ...coordinate,
          latitudeDelta: initialMapState.region.latitudeDelta,
          longitudeDelta: initialMapState.region.longitudeDelta,
          }
          ); 
      
      }
        )
        setdialogVisible(false);
      
    }
    const FilterItems=(filter)=>{
      let data=[];
      if(filter=="Tous"){
        Services.GetAllPlaces().then(
          result=>{
            setAllPlaces(result.data)
          }
        )
    }
    else{
      data=AllPlaces.filter(e=>e.type===filter)
      setAllPlaces(data)
    }
    }
    const AddElement=(e)=>{
      let element=e.nativeEvent.coordinate;
      // Alert("")
      if(enableAdding){
        navigation.navigate('AddPoint',{lon:element.longitude,lat:element.latitude})
      }
    }
    const onMarkerPress = (mapEventData) => {
      const markerID = mapEventData._targetInst.return.key;
    
      let x = (markerID * CARD_WIDTH) + (markerID * 20); 
      _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    }  
    const interpolations = AllPlaces.map((marker) => {
      let index=AllPlaces.indexOf(marker);
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
  
      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp"
      });
  
      return { scale };
    });
    return(
      
      <View style={styles.container}>
      <MapView 
       onPress={(e)=>AddElement(e)}
        ref={_map}
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.15,
          longitudeDelta: 0.21,
        }}
      >
        {
            AllPlaces.map((place)=> {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[AllPlaces.indexOf(place)].scale,
                  },
                ],
              };
            return(
              <MapView.Marker key={place.id} coordinate={{
                latitude: place.lat,
                longitude: place.lon
              }} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('./../assets/marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
            )}
            )
         } 
       
      </MapView>
         <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsScrollView}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? 20 : 0
            }}
      >
        {initialMapState.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem} onPress={()=>FilterItems(category.name)}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
        <ScrollView
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsposition}
      >
        <ConfirmDialog 
          visible={dialogVisible} 
          message="Vous voulez utiliser votre GPS ?"
          onTouchOutside={() => setdialogVisible(false)} 
          positiveButton={{
            title: "Oui",
            onPress: () => {
              handelUserLocation()
            }
        }}
        negativeButton={{
            title: "Non",
            onPress: () => {
              // alert("L'opération est annulée!") 
              setdialogVisible(false);
            }
        }}
        >
       </ConfirmDialog>
       <TouchableOpacity  style={styles.chipsItem} onPress={()=>{
         toggleEnable(false)
         setdialogVisible(true)
         }}>
              <MaterialCommunityIcons name="crosshairs-gps" size={26} />
                </TouchableOpacity>
      </ScrollView>
        <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        ref={_scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
        >
           {
            AllPlaces.map((place)=>
            <View key={place.id} style={styles.cardView}>
             <Image style={styles.cardimage}
                       source={{
                         uri:`data:image/jpeg;base64,${place.image}`
                       }}
                       resizeMode="cover"
                       />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{place.nom}</Text>
                <Text numberOfLines={2} style={styles.cardDescription}>{place.description}</Text>
              </View>
            </View>
            )}
        </Animated.ScrollView>
      </View>
    )
  
}
export default MapPage;
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  textContent:{
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  map: {
    height: '100%'
  },
  cardimage:{
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  cardView:{
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  scrollView:{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:40,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top: 9, 
    paddingHorizontal:10
  },
  chipsposition:{
    position:'absolute', 
    top: 59 
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    flex:2,
    fontSize: 16,
    marginBottom: 5,
    alignSelf:"center"
  },
  // Character image
  image: {
    flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    width:150,
    height: 80,
  },
  marker: {
    width: 30,
    height: 30,
  },
  positionimage:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  chipsIcon: {
    marginRight: 5,
  },
});
