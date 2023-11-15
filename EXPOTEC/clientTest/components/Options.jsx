import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Options({ onPress, title, address, enabled, pSpotQuantity }) {
    return (
        <View className="flex flex-row justify-center items-center w-full">
            <TouchableOpacity
                onPress={onPress}
                className={`my-1 w-10/12 h-12 rounded-lg ${enabled
                    ? 'bg-sky-400'
                    : 'bg-gray-200'
                    }`}
                style={{
                    elevation: 4,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.5,
                    shadowRadius: 50,
                }}
            >
                <View className="pl-3 pt-1 flex flex-row">
                    <View className="flex justify-center items-center">
                        <Ionicons name="location-outline" size={25} color={enabled ? 'white' : 'gray'} />
                    </View>
                    <View>
                        <Text className={`text-md font-bold ${enabled ? 'text-white' : 'text-gray-700'} ml-12`}>{title}</Text>
                        <Text className={`text-sm ${enabled ? 'text-white' : 'text-gray-400'} ml-12`}>{address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
