import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function PricesButton({ onPress, text, enabled }) {
    return (
      
            <TouchableOpacity onPress={onPress} className={'flex justify-center items-center mb-4 w-5/12 h-10 rounded-full bg-sky-400'} style={{ elevation: 4, shadowColor: 'black', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 50 }}>
                <Text className={'text-center text-xl font-bold text-white'}>{text}</Text>
            </TouchableOpacity>
          );
}

