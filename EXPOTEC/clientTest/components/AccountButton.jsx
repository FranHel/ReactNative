import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AccountButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className={'ml-4  w-12 h-12 rounded-full bg-white flex items-center justify-center'} style={{ elevation: 4, shadowColor: 'black', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 50 }}>
            <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
    );
};

export default AccountButton;
