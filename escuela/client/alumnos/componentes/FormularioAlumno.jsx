// AlumnoForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const FormularioAlumno = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fnac, setFnac] = useState('');
    const [mobile, setMobile] = useState('');
    const [dni, setDni] = useState('');

    const handleSubmit = () => {

        axios.post('http://10.0.10.241:8080/alumno/agregar', {
            apellido, nombre, email, fnac, mobile, dni
        })
            .then(response => {
                console.log('Alumno agregado:', response.data);
                setNombre('');
                setApellido('');
                setEmail('');
                setFnac('');
                setMobile('');
                setDni('');
            })
            .catch(error => console.error(error));
    };

    return (
        <View>
            <Text>Agregar Alumno:</Text>
            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />
            <TextInput
                placeholder="Apellido"
                value={apellido}
                onChangeText={text => setApellido(text)}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder="Fecha nacimiento"
                value={fnac}
                onChangeText={text => setFnac(text)}
            />
            <TextInput
                placeholder="Celular"
                value={mobile}
                onChangeText={text => setMobile(text)}
            />
            <TextInput
                placeholder="DNI"
                value={dni}
                onChangeText={text => setDni(text)}
            />
            <Button title="Agregar Alumno" onPress={handleSubmit} />
        </View>
    );
};

export default FormularioAlumno;
