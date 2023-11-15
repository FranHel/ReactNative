import React, { useState, useEffect } from 'react';
import ParkingDetails from "./pages/ParkingDetails";
import ConfirmationAlert from "./pages/ConfirmationAlert";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Browser from "./pages/Browser";
import PricesScreen from './pages/PricesScreen';
import Home from './pages/Home';
import Map from './pages/Mapa';

const Stack = createNativeStackNavigator()

import * as Location from 'expo-location';
import GaragePreview from './components/GaragePreview';
import Estacionamiento from './components/estacionamiento/Estacionamiento.jsx';

export default function App() {
  console.disableYellowBox = true;
  const[locationPermission, setLocationPermission] =useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

useEffect(()=>{
  (async () =>{
    try{
      const permissionAndroid = await Location.getCurrentPositionAsync({});
      if(permissionAndroid){
        setLocation(permissionAndroid);
        setLocationPermission(true);
        }
    }catch(e){
      console.log('No se pudo: ' + e.message);
      setLocationPermission(false);
    } 
  })();
},[]);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
     <NavigationContainer>
      <Stack.Navigator>
        {!locationPermission &&(<Stack.Screen
          name="Home"
          options={{title: 'Home', headerShown: false}}
        >{(props) => <Home {...props} location={location} setLocationPermission={setLocationPermission}setLocation={setLocation} setErrorMsg={setErrorMsg} />}</Stack.Screen>)}
        <Stack.Screen name="Map"  options={{headerShown: false}} initialParams={{Ulocation: location}}>
        {(props) => <Map {...props} setLocation={setLocation}/>}
        </Stack.Screen>
        <Stack.Screen name="PricesScreen" component={PricesScreen}  options={{headerShown: false}} initialParams={{id_garage: 1}}/>
        <Stack.Screen name="Browser" component={Browser}  options={{headerShown: false}}/>
        <Stack.Screen name="ConfirmationAlert" component={ConfirmationAlert}  options={{headerShown: false}}/>
        <Stack.Screen name="ParkingDetails" component={ParkingDetails}  options={{headerShown: false}}/>
        <Stack.Screen name="GaragePreview" component={GaragePreview} options={{headerShown: false}} />
        <Stack.Screen name='Estacionamiento' component={Estacionamiento} options={{headerShown: false}} initialParams={{id_garage: 1}} />
      </Stack.Navigator>
        </NavigationContainer>
  );
}

