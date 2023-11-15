import React from 'react';
import { View, Text } from 'react-native';
import AccountButton from './AccountButton';

const TopBar = ({ subtitle, title }) => {
    return (
        <View className="absolute top-0 flex flex-row bg-sky-400 w-screen h-20 rounded-b-3xl" style={{ elevation: 4 }}>
            <View className="absolute top-5">
                <AccountButton />
            </View>
            <View className="flex flex-col justify-end mb-2 items-center w-screen">
                <Text className="text-white font-semibold">{subtitle}</Text>
                <Text className="text-white font-bold text-lg">{title}</Text>
            </View>
        </View>
    );
};

export default TopBar;
