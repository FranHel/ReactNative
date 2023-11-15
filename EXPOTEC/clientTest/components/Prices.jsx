import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Prices({ onPress, title, price, enabled }) {


    return (
        <View className="flex flex-col justify-center items-center mb-2">
            <View className="flex flex-row justify-between items-center w-10/12 h-12 bg-gray-200 rounded-lg" style={{ elevation: 8 }} >
                <View>
                    <Text className="text-gray-700 text-md ml-3">{title}</Text>
                </View>
                <View className="mr-3">
                    <Text className="text-gray-700 font-semibold text-lg">${price}</Text>
                </View>
            </View>
        </View>
    );
}
