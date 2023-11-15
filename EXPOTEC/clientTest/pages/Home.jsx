import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Searchbar';
import Button from '../components/Button';
import Card from '../components/Card';
import ButtonLight from '../components/ButtonLight';
import AccountButton from '../components/AccountButton';
import Input from '../components/Input';
import * as Location from 'expo-location';
import mapa from '../assets/mapa.jpeg';

export default function Home({location, setLocationPermission, setLocation, setErrorMsg, navigation}) {
    function activarUbicacion(){
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLocationPermission(true);
          })();
    }
    useEffect(()=>{
        if(location){
            navigation.navigate('Map', {Ulocation: location});
        }
    },[location])
    return (
        <ImageBackground source={require('../assets/mapa.jpeg')} style={StyleSheet.absoluteFillObject} resizeMode="cover" onLoadEnd={() => console.log('cargado')} onLoadStart={() => console.log('cargando')}>
            <View className="absolute top-0 h-full w-full bg-black opacity-40" />
            <View className="flex flex-row items-center justify-between w-full pt-8">
                <AccountButton />
                <Text className="mr-6 font-bold text-white text-2xl bg-blue-500 py-2 px-6 rounded-3xl">MilugAR</Text>
            </View>
            <View className="flex flex-col items-center justify-center h-4/5">
                <Card
                    children={
                        <View className="w-60">
                            <Button text={'Activar GPS'} onPress={() => { activarUbicacion(); }} />
                            {/*<ButtonLight text={'Ingresar direccion'} />*/}
                        </View>
                    }
                    title={'Necesitamos acceso al GPS'}
                    text={'Usuario, necesitamos que active la ubicación para encontrar los garages más cercanos'}
                />
            </View>
            
        </ImageBackground>
    );
}

