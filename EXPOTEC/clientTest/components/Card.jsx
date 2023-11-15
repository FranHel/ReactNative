import React, { useState } from 'react';
import { View, Text } from 'react-native';

const Card = ({ title, text, children }) => {
    return (
        <View className="flex items-center justify-center w-full">
            <View className="m-4 p-4 bg-white rounded-3xl w-10/12 h-100 flex items-center" style={{ elevation: 8 }}>
                <Text className="text-xl font-bold">{title}</Text>
                <Text className="text-md text-gray-500 mt-2 text-center">{text}</Text>
                {children}
            </View>
        </View>

    );
};

export default Card;
