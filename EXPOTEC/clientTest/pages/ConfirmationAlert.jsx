import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import ContinueButton from '../components/ContinueButton';
import { FontAwesome } from '@expo/vector-icons';

export default function ConfirmationAlert({ route }) {
    const status = route.params.status;
    const iconColor = status ? 'green' : 'red';
    const iconName = status ? 'check-circle' : 'times-circle';

    return (
        <View className="flex flex-col justify-start items-center w-full h-full">
            <View className="w-full h-screen flex justify-center items-center">
                <FontAwesome name={iconName} size={70} color={iconColor} />
                {(status) ?
                    <Text className="text-lg font-semibold">¡Genial! Hora de ir a tu lugar</Text>
                    :
                    <Text className="text-lg font-semibold">Parece que ocurrio un problema :(</Text>
                }

            </View>

            {/*Boton continuar*/}
            <View className="absolute bottom-0 w-full">
                <ContinueButton text={status ? 'Ver recorrido' : 'Volver'} enabled={true} />
            </View>
        </View>
    );
}

