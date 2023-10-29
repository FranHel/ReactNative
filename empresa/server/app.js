import express from "express";
import {
    PORT
} from './config.js';
import cors from 'cors';
import { actualizarClientesById, borrarClientesById, getClienteById, getClientes, insertarRegistro } from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const respuesta = await getClientes();
    res.status(200).send(respuesta);
});

app.get('/Cliente/:id', async (req, res) => {
    const respuesta = await getClienteById(req.params.id);
    res.status(200).send(respuesta);
});

app.post('/Cliente/agregar', async (req, res) => {
    const { nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email } = req.body;
    const respuesta = await insertarRegistro(nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email);
    res.status(200).send(respuesta);
})

app.put('/Cliente/actualizar', async (req, res) => {
    const { id, nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email } = req.body;
    const respuesta = await actualizarClientesById(id, nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email);
    res.status(200).send(respuesta);
});

app.delete('/Cliente/eliminar/:id', async (req, res) => {
    const respuesta = await borrarClientesById(req.params.id);
    res.status(200).send(respuesta);
});

app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puerto ' + PORT);
})