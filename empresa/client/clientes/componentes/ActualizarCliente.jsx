import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ActualizarCliente = ({ onClienteUpdated }) => {
    const route = useRoute();
    const ClienteId = route.params.ClienteId;

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


    // Cargar los datos del Cliente cuando se monte el componente
    useEffect(() => {
        if (ClienteId) {
            axios.get(`http://10.0.10.241:8080/Cliente/${ClienteId}`)
                .then(response => {
                    const data = response.data[0];
                    setNombre(data.nombre_Cliente);
                    setApellido(data.apellido_Cliente);
                    setfechanac(data.fechanac_Cliente);
                    setpeso(data.peso_Cliente);
                    setaltura(data.altura_Cliente);
                    setdomiclio(data.domicilio_Cliente);
                    setcodpostal(data.codpostal_Cliente);
                    setmovil1(data.movil1_Cliente);
                    setMovil2(data.movil2_Cliente);
                    setEmail(data.email_Cliente);
                })
                .catch(error => console.error(error));
        }
    }, [ClienteId]);

    const handleSubmit = () => {
        axios.put(`http://10.0.10.241:8080/Cliente/actualizar`, {
            id: ClienteId,
            nombre,
            apellido,
            fechanac,
            peso,
            altura,
            domicilio,
            codpostal,
            movil1,
            movil2,
            email,
        })
            .then(response => {
                console.log('Cliente actualizado:', response.data);
                if (onClienteUpdated) {
                    onClienteUpdated();
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <View>
            <Text>Actualizar Cliente:</Text>
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
                placeholder="fecha de nacimiento"
                value={fechana}
                onChangeText={text => setfechana(text)}
            />
            <TextInput
                placeholder="Fecha de nacimiento"
                value={peso}
                onChangeText={text => setpeso(text)}
            />
            <TextInput
                placeholder="Celular"
                value={altura}
                onChangeText={text => setaltura(text)}
            />
            <TextInput
                placeholder="domiclio"
                value={domiclio}
                onChangeText={text => setdomiclio(text)}
            />
            <TextInput
                placeholder="Codigo Postal"
                value={codpostal}
                onChangeText={text => setcodpostal(text)}
            />
            <TextInput
                placeholder="Movil 1"
                value={movil1}
                onChangeText={text => setmovil1(text)}
            />
             <TextInput
                placeholder="Movil 2"
                value={movil2}
                onChangeText={text => setmovil2(text)}
            />
             <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setemail(text)}
            />
            <Button title="Actualizar Cliente" onPress={handleSubmit} />
        </View>
    );
};

export default ActualizarCliente;
