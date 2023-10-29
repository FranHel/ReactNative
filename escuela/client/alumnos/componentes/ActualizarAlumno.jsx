import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ActualizarAlumno = ({ onAlumnoUpdated }) => {
    const route = useRoute();
    const alumnoId = route.params.alumnoId;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fnac, setFnac] = useState('');
    const [mobile, setMobile] = useState('');
    const [dni, setDni] = useState('');

    // Cargar los datos del alumno cuando se monte el componente
    useEffect(() => {
        if (alumnoId) {
            axios.get(`http://10.0.10.241:8080/alumno/${alumnoId}`)
                .then(response => {
                    const data = response.data[0];
                    setNombre(data.nombre_alumno);
                    setApellido(data.apellido_alumno);
                    setEmail(data.email_alumno);
                    setFnac(data.fnac_alumno);
                    setMobile(data.mobile_alumno);
                    setDni(data.dni_alumno);
                })
                .catch(error => console.error(error));
        }
    }, [alumnoId]);

    const handleSubmit = () => {
        axios.put(`http://10.0.10.241:8080/alumno/actualizar`, {
            id: alumnoId,
            nombre,
            apellido,
            email,
            fnac,
            mobile,
            dni,
        })
            .then(response => {
                console.log('Alumno actualizado:', response.data);
                if (onAlumnoUpdated) {
                    onAlumnoUpdated();
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <View>
            <Text>Actualizar Alumno:</Text>
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
                placeholder="Fecha de nacimiento"
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
            <Button title="Actualizar Alumno" onPress={handleSubmit} />
        </View>
    );
};

export default ActualizarAlumno;
