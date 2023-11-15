import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import ContinueButton from '../components/ContinueButton';
import Options from '../components/Options';
import Input from '../components/Input';

export default function Browser() {

    return (
        <View className="flex flex-column justify-start items-center w-full h-full">
            {/* Flecha y titulo*/}
            <View className="flex flex-row mt-6 w-full">
                <View className="ml-4 mt-4">
                    <TouchableOpacity>
                        <AntDesign name="arrowleft" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                <View className="ml-9 mt-4">
                    <Text className="text-lg font-semibold text-gray-700 text-center">Encuentra la cochera ideal</Text>
                </View>
            </View>

            {/*Buscador*/}
            <View className="mt-6">
                <View className="mb-2">
                    <Input placeholder={'¿Cual es tu ubicación?'} />
                </View>
                <View>
                    <Input placeholder={'¿A donde queres ir?'} />
                </View>
                <View className="w-screen flex flex-row justify-center">
                    <TouchableOpacity className="flex flex-row justify-center items-center mt-4">
                        <AntDesign name="pushpin" size={12} color="#38bdf8" />
                        <Text className="ml-4 text-sky-400 text-center">
                            Seleccionar en el mapa
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*Resultados*/}
            <View className="flex flex-col justify-center items-center w-screen">
                <Text className="text-center text-lg font-semibold text-gray-700 mt-6 mb-2">Resultados</Text>
                <Options title={'Estacionamiento central'} address={'Av. Pedro Luro 1234'} />
                <Options title={'Parking del Puerto'} address={'Santiago del estero 567'} />
                <Options title={'Garage Plaza'} address={'Entre Rios 891'} enabled={true} />
            </View>

            {/*Boton continuar*/}
            <View className="absolute bottom-0 w-full">
                <ContinueButton text={'Continuar'} enabled={true} />
            </View>
        </View>
    );
}

