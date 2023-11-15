import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ContinueButton({ onPress, text, enabled }) {
    return (
        (enabled) ?
            <View className="flex flex-column justify-center items-center w-full">
                <TouchableOpacity onPress={onPress} className={'m-4 w-10/12 h-12 rounded-full bg-sky-400'} style={{ elevation: 4, shadowColor: 'black', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 50 }}>
                    <Text className={'text-center text-xl font-bold text-white p-2 '}>{text}</Text>
                </TouchableOpacity>
            </View>
            :
            <View className="flex flex-column justify-center items-center w-full">
                <TouchableOpacity onPress={onPress} className={'m-4 w-10/12 h-12 rounded-full bg-gray-300'} style={{ elevation: 4, shadowColor: 'black', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 50 }}>
                    <Text className={'text-center text-xl font-bold text-white p-2 '}>{text}</Text>
                </TouchableOpacity>
            </View>
    );
}

