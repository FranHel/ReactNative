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
import Mapbox from "@rnmapbox/maps";
import { Ionicons } from '@expo/vector-icons'; 
Mapbox.setAccessToken(
  "pk.eyJ1IjoibWlsdWdhciIsImEiOiJjbGxmZ3luM2cwcGp3M2pteDhjN25mbzZuIn0.f0ALdf3_k1ot9wA5PM45jA"
);
import { ip } from "../functions/ip";

const Map = () => {
  console.log(ip);
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
      console.log("Error al obtener las noticias:", error);
    }
  }
  useEffect(() => {
    renderizarGarages().then((data) => {
      setGarages(data);
    });
  }, []);
    function mudar(){
    setFollowUser(false);
    camera.current.moveTo([userCoords.long, userCoords.lat], 800);    
  }
  useEffect(()=>{
    if(camera.current){
      mudar();
    }
  },[]);


  const onUserLocationUpdate = async (location) => {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    setUserCoords({long: long, lat: lat});
  } 

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
          <Mapbox.UserLocation visible={true} ref={userLocation} onUpdate={(location) => {onUserLocationUpdate(location)}}/>
          <Mapbox.Camera
            followZoomLevel={14.5}
            followUserMode={"normal"}
            followUserLocation={followUser}
            animationDuration={1000}
            allowUpdates={true}
            zoomLevel={14.5}
            ref={camera} 
          />
          
          {garages.map((garage, index) => (
            <Mapbox.PointAnnotation
              key={index}
              id={"Garage " + index}
              coordinate={[garage.long_garage, garage.lat_garage]}
              onSelected={() => {
                setModalData([garage]);
                setHeightGarages(150);
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
                setHeightGarages(0);
              }else{
                setHeightGarages(250);
                setModalData(garages);
              }}}></TouchableOpacity>
          </View>
          {!modalVisible && 
          <ScrollView style={{height: heightGarages, width: '100%', backgroundColor:'#fff',display: 'flex'}} contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}>
              {modalData.map((garage, index)=>(
                <View key={index} style={{borderBottomWidth: 2, width: '100%', borderBottomColor: '#D9D9D9'}}>
                  <Text>{garage.desc_garage}</Text>
                  <Text>{garage?.telefono_garage}</Text>
                  <Text>{garage.domicilio_garage}</Text>
                  <Text>{garage.puntuacion_garage}</Text>
                </View>
              ))}
          </ScrollView>}
          {
            modalVisible && 
            /*<GarageListElement text={modalData[0].desc_garage} phone={modalData[0].telefono_garage} ubication={modalData[0].domicilio_garage} starQuantity={modalData[0].puntuacion_garage} />*/
            <View style={[styles.prueba, modalVisible === true ? styles.visible : styles.hidden, ]}>
              
              <Text>Nombre: {modalData[0].desc_garage}</Text>
              <Text>Domicilio: {modalData[0].domicilio_garage}</Text>
              <Text>Puntuacion: {modalData[0].puntuacion_garage}</Text>
              <Text>Precio x hora: ${modalData[0].hora_precio}</Text>
              <Text>Precio x fraccion: ${modalData[0].fraccion_precio}</Text>
              <Text>Precio x 12 horas: ${modalData[0].doce_horas_precio}</Text>
              <Text>Precio x 24 horas: ${modalData[0].veinti_horas_precio}</Text>
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
    backgroundColor: "blue",
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
    display: 'block',
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
