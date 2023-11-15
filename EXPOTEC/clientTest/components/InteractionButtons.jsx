
import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function InteractionButtons({ onPress, text, enabled }) {
    return (
        <View className="flex flex-row justify-center items-start w-full">
            <View className="w-full h-28 bg-white rounded-t-3xl flex flex-row items-center justify-around">
                <View className="flex flex-col justify-center items-center">
                    <TouchableOpacity className="bg-sky-400 h-12 w-12 rounded-full flex justify-center items-center" style={{ elevation: 2 }}>
                        <FontAwesome5 name="directions" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-gray-500">Indicaciones</Text>
                </View>
                <View className="flex flex-col justify-center items-center">
                    <TouchableOpacity className="bg-sky-400 h-12 w-12 rounded-full flex justify-center items-center" style={{ elevation: 2 }}>
                        <FontAwesome name="bookmark" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-gray-500">Guardar</Text>
                </View>
                <View className="flex flex-col justify-center items-center">
                    <TouchableOpacity className="bg-sky-400 h-12 w-12 rounded-full flex justify-center items-center" style={{ elevation: 2 }}>
                        <FontAwesome name="share-alt" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-gray-500">Compartir</Text>
                </View>
            </View>
        </View>
    );
}

