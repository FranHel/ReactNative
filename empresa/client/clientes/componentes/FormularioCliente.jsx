// AlumnoForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const FormularioAlumno = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechanac, setfechanac] = useState('');
    const [peso, setpeso] = useState('');
    const [altura, setaltura] = useState('');
    const [domicilio, setdomiclio] = useState('');
    const [codpostal, setcodpostal] = useState('');
    const [movil1, setmovil1] = useState('');
    const [movil2, setmovil2] = useState('');
    const [email, setemail] = useState('');

    const handleSubmit = () => {

        axios.post('http://10.0.10.241:8080/alumno/agregar', {
            nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email
        })
            .then(response => {
                console.log('Alumno agregado:', response.data);
                setNombre('');
                setApellido('');
                setfechanac('');
                setpeso('');
                setaltura('');
                setdomiclio('');
                setcodpostal('');
                set
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
