import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function GaragePreview({ data, onPress, mostrarMas }) {
    console.log(data);
    const stars = [];
    for (let i = 0; i < data.puntuacion_garage; i++) {
        stars.push(
            <AntDesign key={i} name="star" size={12} color="gold" />
        );
    }

    return (
        <View className="flex flex-column w-full h-full" contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View className="w-full h-full bg-white flex flex-column border border-gray-200 pb-4 px-3">
                <View className="flex flex-row justify-between items center w-full p-3 pb-0">
                    <Text className="text-gray-800 text-2xl font-bold ">{data.desc_garage}</Text>
                </View>
                <View className="flex flex-row ml-3 mt-2">
                    {stars}<Text className="ml-3 text-yellow-500">(1634)</Text>
                </View>
                {mostrarMas && (<View className="flex justify-center items-center absolute w-full pl-6 bottom-16">
                    <TouchableOpacity style={{ elevation: 8 }} onPress={onPress}>
                        <AntDesign name="pluscircle" size={50} color="#0C96FA" />
                    </TouchableOpacity>
                </View>)}
                <View>
                    <View className="flex flex-col pt-1">
                        <View className="flex flex-row pt-2">
                            <FontAwesome name="dollar" size={16} color="#38bdf8" />
                            <Text className="ml-3 text-gray-800 text-sm font-bold">Precios - Garaje </Text>
                        </View>
                        <View className="flex flex-col">
                            <View className="flex flex-row mb-1 w-full justify-between">
                                <Text className="text-gray-800 text-sm">Hora: ${data.hora_precio}</Text>
                                <Text className="text-gray-800 text-sm ">Fraccion: ${data.fraccion_precio}</Text>
                            </View>
                            <View className="flex flex-row mb-1 w-full justify-between">
                                <Text className="text-gray-800 text-sm">12 horas: ${data.doce_horas_precio}</Text>
                                <Text className="text-gray-800 text-sm">24 horas: ${data.veinti_horas_precio}</Text>
                            </View>
                        </View>
                        
                        <View className="flex flex-row items-center justify-between py-3">
                            <View className="flex flex-row">
                                <AntDesign name="phone" size={16} color="#38bdf8" />
                                <Text className="ml-3 text-gray-800 text-sm font-bold ">{data.telefono_garage}</Text>
                            </View>
                            <View className="flex flex-row">
                                <Ionicons name="location-outline" size={18} color="#38bdf8" />
                                <Text className="ml-3 text-gray-800 text-sm font-bold">{data.domicilio_garage}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    );
}

