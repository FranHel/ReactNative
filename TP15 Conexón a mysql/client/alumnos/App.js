// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActualizarAlumno from './componentes/ActualizarAlumno';
import FormularioAlumno from './componentes/FormularioAlumno';
import ListaAlumnos from './componentes/ListaAlumnos';
import HomePage from './componentes/Homepage';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Actualizar" component={ActualizarAlumno} />
        <Stack.Screen name="Agregar" component={FormularioAlumno} />
        <Stack.Screen name="Lista" component={ListaAlumnos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
