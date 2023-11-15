import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActualizarEstado, fetchLugares } from '../../functions/dbfunctionalities';
import ParkingSpot from './ParkingSpot';
import ContinueButton from '../ContinueButton';
import {ip} from "../../functions/ip";
function Estacionamiento({ route }) {
  const id_garage = route.params.id_garage;
  const [lugares, setLugares] = useState([]);
  const [nombreGarage, setNombreGarage] = useState();
const [direccionGarage, setDireccionGarage] = useState();

  async function renderizarParcelas() {
    try {
      const response = await fetch(`http://${ip}:8080/parcelas/${id_garage}`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("Error al obtener las parcelas del garage: " + e.message);
    }
  }
  async function renderizarGarage() {
    try {
      const response = await fetch(`http://${ip}:8080/garages/${id_garage}`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("Error al obtener el garage: " + e.message);
    }
  }
  useEffect(() => {
    renderizarGarage().then((data) => {
      
      setNombreGarage(data[0].desc_garage);
      setDireccionGarage(data[0].domicilio_garage);
    })
  }, [])
  useEffect(() => {
    renderizarParcelas().then((data) => {
      setLugares(data);
    });
  }, [lugares]);
  return (
    <>
      <View style={{
        flex: 0.21, paddingTop: 0,
        backgroundColor: '#0d95f9',
        borderWidth: 1,
        borderBottomLeftRadius: 40,
        borderColor: 'transparent',
        borderBottomRightRadius: 40,
        elevation:3,
        boxShadow: '0px 0px 10px #000000'
        
      }}>
        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', textAlign: 'center', paddingTop: 50 }}>{nombreGarage}</Text>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', paddingTop:10}}>{direccionGarage}</Text>
      </View>
      <View style={styles.container}>
        {lugares.map((lugar, index) => (
          <ParkingSpot key={index} isOccupied={Boolean(lugar.ocupado)} direction={index % 2 == 0 ? 'l' : 'r'} isAccessible={Boolean(lugar.es_accesible)} />
        ))}
        <ParkingSpot isOccupied={true} direction='r'/>
        <ParkingSpot isOccupied={true} direction='l' />
        <ParkingSpot isOccupied={true} direction='r' />
        <ParkingSpot isOccupied={true} direction='l' />
        <ParkingSpot isOccupied={true} direction='r' />
        <ParkingSpot isOccupied={true} direction='l' />
        <ParkingSpot isOccupied={true} direction='r' />
      </View>
      <View>
        <ContinueButton text={'Continuar'} enabled={true} onPress={()=>{console.log('ir')}}/>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 40,
    alignItems: 'center',
  }
});


export default Estacionamiento;