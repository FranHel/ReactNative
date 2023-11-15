import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className={'m-4 w-100 h-12 rounded-xl bg-sky-200'} style={{ elevation: 4, shadowColor: 'black', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 50 }}>
            <Text className={'text-center text-xl font-bold text-sky-500 p-2 '}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;
