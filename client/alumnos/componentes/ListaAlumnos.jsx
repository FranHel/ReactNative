import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

const ListaAlumnos = ({ navigation }) => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.10.241:8080/')
            .then(response => setAlumnos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteAlumno = async (id) => {
        try {
            await axios.delete(`http://10.0.10.241:8080/alumno/eliminar/${id}`);
            setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id_alumno !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Text>Lista de Alumnos:</Text>
            <FlatList
                data={alumnos}
                keyExtractor={(alumno) => alumno.id_alumno.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>Nombre: {item.nombre_alumno}</Text>
                        <Text>Apellido: {item.apellido_alumno}</Text>
                        <Text>Email: {item.email_alumno}</Text>
                        <Text>Celular: {item.mobile_alumno}</Text>
                        <Text>DNI: {item.dni_alumno}</Text>
                        <Text>Fecha de nacimiento: {item.fnac_alumno}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', gap: 5 }}>
                            <Button
                                title="Eliminar"
                                onPress={() => handleDeleteAlumno(item.id_alumno)}
                            />
                            <Button
                                title="Actualizar Alumno"
                                onPress={() => navigation.navigate('Actualizar', { alumnoId: item.id_alumno })}
                            />
                        </View>

                    </View>
                )}
            />
        </View>
    );
};

export default ListaAlumnos;
