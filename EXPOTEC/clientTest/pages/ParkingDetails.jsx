import React, { useEffect, useState } from 'react';
import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PricesButton from '../components/PricesButton';
import InteractionButtons from '../components/InteractionButtons';
import ContinueButton from '../components/ContinueButton';
import { ip } from '../functions/ip';
const ParkingDetails = ({ navigation, route, mostrarMas }) => {
    const id_garage = route.params.id_garage
    const [garage, setGarage] = useState({});
    async function renderizarGarage() {
        try {
          const response = await fetch(`http://${ip}:8080/garages/${id_garage}`);
          
          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Error al obtener los garages:", error);
        }
      }
    useEffect(()=>{
        renderizarGarage().then((data)=>{
            console.log(data);
            setGarage(data[0]);
        });
    },[]);
    if (!garage) {
        return <View className="flex flex-col  items-center w-full h-full"><Text className="font-bold text-lg">No se encontró el estacionamiento.</Text></View>;
    }

    const stars = [];
    for (let i = 0; i < Math.round(garage.puntuacion_garage); i++) {
        stars.push(
            <AntDesign key={i} name="star" size={16} color="gold" />
        );
    }

    return (
        <View className="h-full">
            {/*Imagen*/}
            <View className="w-full h-4/5">
                <Image source={{ uri: 'https://images.squarespace-cdn.com/content/v1/606df7dd6b47261d19840040/1618420402395-TOI1K5N7SFMZ7XLH3RE5/Underground+Parking+Garage.jpg' }} className="w-full h-full" />
                <View className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></View>
                <TouchableOpacity onPress={()=>{navigation.navigate("Map")}} className="absolute top-5 left-5">
                    <FontAwesome name="arrow-circle-left" size={36} color="white" />
                </TouchableOpacity>
            </View>

            {/*Detalles de cochera*/}
            <View className="mt-2 absolute bottom-0 left-0 w-screen">
                {/*Nombre y estrellas*/}
                <View className="ml-2">
                    <Text className="text-white font-bold">{stars} (210)</Text>
                    <Text className="text-2xl text-white font-bold mt-2">{garage.desc_garage}</Text>
                </View>

                {/*Botones*/}
                <InteractionButtons />

                {/*Caracteristicas y precio*/}
                <View className="flex flex-row bg-white w-screen items-start justify-start">
                    <View className="flex flex-col pb-4 px-3">
                        <View className="flex flex-row items-center w-20">
                            <MaterialIcons name="verified" size={20} color="#38bdf8" />
                            <Text className="pl-2 text-gray-700">{garage.desc_servicio}</Text>
                        </View>
                        <View className="flex flex-row items-center ">
                            <MaterialIcons name="verified" size={20} color="#38bdf8" />
                            <Text className="pl-2 text-gray-700">Parcelas accesibles: {garage.cant_parcelas_accesible}</Text>
                        </View>
                        {/*{item.features.map((feature, featureIndex) => (
                            <View key={featureIndex} className="flex flex-row items-center ">
                                <MaterialIcons name="verified" size={20} color="#38bdf8" />
                                <Text key={featureIndex} className="pl-2 text-gray-700">{feature}</Text>
                            </View>
                        ))}*/}
                    </View>
                    <View className="ml-4 w-full">
                        <PricesButton text={'Precios'} onPress={()=>{navigation.navigate("PricesScreen", {id_garage: id_garage})}}/>
                    </View>
                </View>

                {/*Direccion y telefono*/}
                <View className="flex flex-row justify-around bg-white pt-2 pb-2">
                    <View className="flex flex-row items-center">
                        <FontAwesome name="phone" size={30} color="#38bdf8" />
                        <Text className="ml-2 text-gray-700">{garage.telefono_garage}</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Ionicons name="location" size={30} color="#38bdf8" />
                        <Text className="ml-2 text-gray-700">{garage.domicilio_garage}</Text>
                    </View>
                </View>
            
                <View className="bg-white pt-2">
                    <ContinueButton enabled={true} text={'Continuar'} onPress={()=>{navigation.navigate("Estacionamiento", {id_garage: id_garage})}}/>
                </View>

            </View>
        </View >
    );
};

export default ParkingDetails;
