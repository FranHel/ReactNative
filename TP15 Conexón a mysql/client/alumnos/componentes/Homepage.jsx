import React from 'react';
import { View, Button } from 'react-native';

const HomePage = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Agregar Alumno"
                onPress={() => navigation.navigate('Agregar')}
            />
            <Button
                title="Lista de Alumnos"
                onPress={() => navigation.navigate('Lista')}
            />
        </View>
    );
};

export default HomePage;
