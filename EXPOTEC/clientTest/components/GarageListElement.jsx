import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function GarageListElement({ text, phone, ubication, starQuantity, onPress, navigation }) {
    const stars = [];
    for (let i = 0; i < starQuantity; i++) {
        stars.push(
            <AntDesign key={i} name="star" size={12} color="gold" />
        );
    }

    return (
        <ScrollView className="flex flex-column w-full h-full" contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
            <View className="w-full h-full bg-white flex flex-column border border-gray-200 pb-3">
                <View className="flex flex-row justify-between items center w-full  pt-2 px-3 pb-0">
                    <Text className="text-gray-800 text-2xl font-bold ">{text}</Text>
                </View>
                <View className="flex flex-row ml-3 ">
                    {stars}
                </View>
                <View className="absolute right-0 mr-3 top-0 mt-16">
                    <TouchableOpacity style={{ elevation: 8 }} onPress={onPress}>
                        <AntDesign name="pluscircle" size={45} color="#0C96FA" />
                    </TouchableOpacity>
                </View>
                <View>
                    <View className="p-3 pb-1 flex flex-row">
                        <AntDesign name="phone" size={16} color="#38bdf8" />
                        <Text className="ml-3 text-gray-800 text-sm font-bold ">{phone}</Text>
                    </View>
                    <View className="pl-3 flex flex-row">
                        <Ionicons name="location-outline" size={18} color="#38bdf8" />
                        <Text className="ml-3 text-gray-800 text-sm font-bold">{ubication}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

