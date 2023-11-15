import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonLight = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className={'w-100 h-12 rounded-xl bg-transparent'}>
            <Text className={'text-center text-xl font-bold text-sky-500'}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ButtonLight;
