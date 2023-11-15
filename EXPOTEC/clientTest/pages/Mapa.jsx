import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import GarageListElement from "../components/GarageListElement";
import GaragePreview from "../components/GaragePreview";
import Mapbox from "@rnmapbox/maps";
import { Ionicons } from '@expo/vector-icons'; 
import { ip } from "../functions/ip";
Mapbox.setAccessToken(
  "pk.eyJ1IjoibWlsdWdhciIsImEiOiJjbGxmZ3luM2cwcGp3M2pteDhjN25mbzZuIn0.f0ALdf3_k1ot9wA5PM45jA"
);

const Map = ({navigation, route, setLocation}) => {
  const [garages, setGarages] = useState([]);
  const [modalVisible, setModalVisible] = useState (false);
  const [modalData, setModalData] = useState ([{}]);
  const [followUser, setFollowUser] = useState(true);
  const camera = React.createRef();
  const userLocation = React.createRef();
  const [userCoords, setUserCoords] = useState({});
  const [heightGarages, setHeightGarages] = useState(0);
  async function renderizarGarages() {
    try {
      const response = await fetch(`http://${ip}:8080/garages/precios/1`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al obtener los garages:", error);
    }
  }
  useEffect(() => {
    renderizarGarages().then((data) => {
      setGarages(data);
    });
  }, []);
    function mudar(){
    setFollowUser(false);
    camera.current?.flyTo([route.params.Ulocation.coords.longitude, route.params.Ulocation.coords.latitude], 800);    
  }
  useEffect(()=>{
    if(camera.current){
      mudar();
    }
  },[]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
      <Mapbox.MapView
          style={styles.map}
          logoEnabled={false}
          compassEnabled={true}
          onPress={()=>{setModalVisible(false); setHeightGarages(0)}}
          compassFadeWhenNorth={true}
          compassPosition={{top: 30, right: 20}}
          scaleBarEnabled={false}
          setMyLocationEnabled={true}
          getMyLocation={true}
        >
          <Mapbox.UserLocation visible={true} ref={userLocation} onUpdate={(location)=>{setLocation(location)}}/>
          <Mapbox.Camera
            zoomLevel={14.5}
            centerCoordinate={[route.params.Ulocation.coords.longitude, route.params.Ulocation.coords.latitude]}
            animationDuration={1000}
            allowUpdates={true}
            
            ref={camera} 
          />
          
          {garages.map((garage, index) => (
            <Mapbox.PointAnnotation
              key={index}
              id={"Garage " + index}
              coordinate={[garage.long_garage, garage.lat_garage]}
              onSelected={() => {
                
                setModalData([garage]);
                setHeightGarages(250);
                setModalVisible(true);
              }}
            />
          ))}
          
          
        </Mapbox.MapView>
        <TouchableOpacity style={[styles.volver, {bottom: (heightGarages + 50 + 30)}]} onPress={()=>{mudar(); }}>
        <Ionicons name="locate" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={{width: '100%', height: (heightGarages + 50), position: 'absolute', bottom: 0}}>
          <View style={{height: 50, width: '100%', backgroundColor:'#0C96FA', borderTopStartRadius: 70, borderTopEndRadius: 70, display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
              <TouchableOpacity style={{height: 10, width: '25%', backgroundColor: 'white', marginTop: 15, borderRadius: 100, elevation: 4}} onPress={()=>{if(heightGarages === 250){
                setModalVisible(false);
                setHeightGarages(0);
              }else{
                setModalVisible(false);
                setHeightGarages(250);
                setModalData(garages);
              }}}></TouchableOpacity>
          </View>
          {!modalVisible && 
          <ScrollView style={{height: heightGarages, width: '100%', backgroundColor:'#fff',display: 'flex'}} contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}>
              {modalData.map((garage, index)=>(
                <GarageListElement key={index} text={garage.desc_garage} phone={garage?.telefono_garage} ubication={garage.domicilio_garage} starQuantity={garage.puntuacion_garage} onPress={()=>{navigation.navigate('ParkingDetails', {id_garage: garage.id_garage})}}/>
              ))}
          </ScrollView>}
          {
            modalVisible &&             
            <View style={[styles.prueba, modalVisible === true ? styles.visible : styles.hidden, ]}>
              <GaragePreview data={modalData[0]} onPress={()=>{navigation.navigate('ParkingDetails', {id_garage: modalData[0].id_garage})}} mostrarMas={modalVisible}/>
            </View>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F5FCFF",
  },
  map: {
    flex: 1,
  },
  prueba:{
    zIndex: 2,
    backgroundColor: 'white',
    width: "100%",
    height: "100%",
  },
  hidden:{
    display: 'none'
  },
  visible: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  volver:{
    position: 'absolute',
    elevation: 8,
    borderRadius: 100,
    right: 18,
    backgroundColor: 'black',
    width: 44,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volverTexto:{
    color: '#fff',
    textAlign: 'center',
    marginTop: 12
  },
  pin: {
    borderRadius: '50% 50% 50% 0',
    border: '4px solid #fff',
    width: '20px',
    height: '20px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
},
pinText:{
    color: 'white',
}
});
export default Map;
