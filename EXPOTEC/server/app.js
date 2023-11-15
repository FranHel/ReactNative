import express from "express";
import cors from 'cors';
import CryptoJS from "crypto-js";
import * as db from './database.js';


const app = express();
app.use(express.json());
const corsOptions = {
    origin: "https://milugar.website",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-ESP32"],
  };
app.use(cors());
const key = process.env.CRYPTO_KEY;
/*const allowFromAllowedIPs = (req, res, next) => {
    const allowedIPs = ["192.168.1.111"]; // Lista de direcciones IP permitidas
    
    const clientIP = req.ip.replace(/^::ffff:/, '');; // Obtener la dirección IP del cliente
    console.log(clientIP);

    if (allowedIPs.includes(clientIP)) {
      next(); // Continuar procesando la solicitud
    } else {
      res.status(403).send("Access forbidden");
    }
  };*/
app.get("/garages/:id", async (req,res)=>{
    const resultado = await db.getGarageById(1);
    res.status(200).send(resultado);
});
app.get("/garages/", async(req, res)=>{
    const garages = await db.getTodo("garages");
    res.status(200).send(garages);
});
app.get("/garages/precios/:id_tipo_vehiculo", async (req,res)=>{
    const garages = await db.getGaragesYPrecios(req.params.id_tipo_vehiculo);
    res.status(200).send(garages);
})
function formatearDatosParcelas(datos){
    //console.log(datos);
    return datos.map((dato)=>{
        return dato.id_parcela;
    });
}
app.get("/parcelas/:id_garage", async(req, res)=>{
    const resultado = await db.getParcelas(req.params.id_garage);
    res.status(200).send(resultado);
})
app.get("/Parcelas/:id_garage/:piso_parcela/:min/:max", async (req,res)=>{
    const isFromESP32 = req.header("X-ESP32") === "true";
    if(isFromESP32){
        const resultado = await db.getIdParcelaByIdGarage(req.params.id_garage, req.params.min, req.params.max, req.params.piso_parcela );
        res.status(200).send(formatearDatosParcelas(resultado));
    }else{
        res.status(403).send("Access forbidden");
    }
});

app.post("/actualizar/estado/:id", async(req, res)=>{
    const {estado} = req.body;
    const actualizado = await db.actualizarEstadoParcela(estado, req.params.id);
    res.status(200).send(actualizado);
});


function encriptar(contenido){
    return CryptoJS.AES.encrypt(contenido, key).toString();
}
function desencriptar(contenido){
    return CryptoJS.AES.decrypt(contenido.toString(), key).toString(CryptoJS.enc.Utf8);
}

app.get("/Encriptar/:contenido",(req, res)=>{
    res.status(200).send(encriptar(req.params.contenido));
})

//usuarios

app.post("/usuarios", async (req, res) => {
    const { email, contrasena, fnac, celular } = req.body;
    const contrasena_encriptada = encriptar(contrasena);
    const usuarioCreado = await db.crearUsuario(email, contrasena_encriptada, fnac, celular);
    res.status(201).send(usuarioCreado);
});

app.put("/usuarios/:id/email", async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    const usuarioActualizado = await db.actualizarEmailUsuario(email, id);
    res.status(200).send(usuarioActualizado);
});

app.put("/usuarios/:id/contrasena", async (req, res) => {
    const { contrasena } = req.body;
    const { id } = req.params;
    const usuarioActualizado = await db.actualizarContrasenaUsuario(contrasena, id);
    res.status(200).send(usuarioActualizado);
});

app.put("/usuarios/:id/fnac", async (req, res) => {
    const { fnac } = req.body;
    const { id } = req.params;
    const usuarioActualizado = await db.actualizarFNacUsuario(fnac, id);
    res.status(200).send(usuarioActualizado);
});

app.put("/usuarios/:id/celular", async (req, res) => {
    const { celular } = req.body;
    const { id } = req.params;
    const usuarioActualizado = await db.actualizarCelularUsuario(celular, id);
    res.status(200).send(usuarioActualizado);
});

app.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const usuarioEliminado = await db.borrarUsuario(id);
    res.status(200).send(usuarioEliminado);
});

//propietarios

app.post("/propietarios", async (req, res) => {
    const { nombre, apellido, razon_social, email, contrasena, celular } = req.body;
    const propietarioCreado = await db.crearPropietario(nombre, apellido, razon_social, email, contrasena, celular);
    res.status(201).send(propietarioCreado);
});

app.put("/propietarios/:id/nombre", async (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    const propietarioActualizado = await db.actualizarNombrePropietario(nombre, id);
    res.status(200).send(propietarioActualizado);
});

app.put("/propietarios/:id/apellido", async (req, res) => {
    const { apellido } = req.body;
    const { id } = req.params;
    const propietarioActualizado = await db.actualizarApellidoPropietario(apellido, id);
    res.status(200).send(propietarioActualizado);
});

app.put("/propietarios/:id/razon-social", async (req, res) => {
    const { razon_social } = req.body;
    const { id } = req.params;
    const propietarioActualizado = await db.actualizarRazonSocialPropietario(razon_social, id);
    res.status(200).send(propietarioActualizado);
});

app.put("/propietarios/:id/email", async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    const propietarioActualizado = await db.actualizarEmailPropietario(email, id);
    res.status(200).send(propietarioActualizado);
});

app.put("/propietarios/:id/contrasena", async (req, res) => {
    const { contrasena_propietario } = req.body;
    const { id } = req.params;
    const propietarioActualizado = await db.actualizarContrasenaPropietario(contrasena_propietario, id);
    res.status(200).send(propietarioActualizado);
});

app.put("/propietarios/:id/celular", async (req, res) => {
    const { celular } = req.body;
    const { id } = req.params;
    const propietarioActualizado = await db.actualizarCelularPropietario(celular, id);
    res.status(200).send(propietarioActualizado);
});

app.delete("/propietarios/:id", async (req, res) => {
    const { id } = req.params;
    const propietarioEliminado = await db.borrarPropietario(id);
    res.status(200).send(propietarioEliminado);
});

// Rutas para tipo de vehículo
app.post("/tipos-vehiculo", async (req, res) => {
    const { desc_vehiculo } = req.body;
    const tipoVehiculoCreado = await db.crearTipoVehiculo(desc_vehiculo);
    res.status(201).send(tipoVehiculoCreado);
});
  
app.put("/tipos-vehiculo/:id", async (req, res) => {
    const { desc_vehiculo } = req.body;
    const { id } = req.params;
    const tipoVehiculoActualizado = await db.actualizarTipoVehiculo(desc_vehiculo, id);
    res.status(200).send(tipoVehiculoActualizado);
});
  
app.delete("/tipos-vehiculo/:id", async (req, res) => {
    const { id } = req.params;
    const tipoVehiculoBorrado = await db.borrarTipoVehiculo(id);
    res.status(200).send(tipoVehiculoBorrado);
});
  
// Rutas para tipo de pago
app.post("/tipos-pago", async (req, res) => {
    const { desc_tipo_pago } = req.body;
    const tipoPagoCreado = await db.crearTipoPago(desc_tipo_pago);
    res.status(201).send(tipoPagoCreado);
});
  
app.put("/tipos-pago/:id", async (req, res) => {
    const { desc_tipo_pago } = req.body;
    const { id } = req.params;
    const tipoPagoActualizado = await db.actualizarTipoPago(desc_tipo_pago, id);
    res.status(200).send(tipoPagoActualizado);
});
  
app.delete("/tipos-pago/:id", async (req, res) => {
    const { id } = req.params;
    const tipoPagoBorrado = await db.borrarTipoPago(id);
    res.status(200).send(tipoPagoBorrado);
});

// Rutas para detalle de usuario
app.post("/detalles-usuario", async (req, res) => {
    const { idUsuario, patente, idTipoVehiculo } = req.body;
    const detalleUsuarioCreado = await db.crearDetalleUsuario(idUsuario, patente, idTipoVehiculo);
    res.status(201).send(detalleUsuarioCreado);
  });
  
  app.put("/detalles-usuario/:id", async (req, res) => {
    const { idUsuario, patente, idTipoVehiculo } = req.body;
    const { id } = req.params;
    const detalleUsuarioModificado = await db.actualizarDetalleUsuario(id, idUsuario, patente, idTipoVehiculo);
    res.status(200).send(detalleUsuarioModificado);
  });
  
  app.delete("/detalles-usuario/:id", async (req, res) => {
    const { id } = req.params;
    const detalleUsuarioBorrado = await db.eliminarDetalleUsuario(id);
    res.status(200).send(detalleUsuarioBorrado);
  });

  
// Alta de un garage
app.post("/garages", async (req, res) => {
    const { domicilio, codPostal, latitud, longitud, idTipoServicio, descripcion, puntuacion, cantParcelas } = req.body;
    const garageCreado = await db.crearGarage(domicilio, codPostal, latitud, longitud, idTipoServicio, descripcion, puntuacion, cantParcelas);
    res.status(201).send(garageCreado);
});

// Modificación de un garage por su ID
app.put("/garages/:id", async (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body;
    nuevosDatos.idGarage = id;
    const garageActualizado = await db.actualizarGarage(nuevosDatos);
    res.status(200).send(garageActualizado);
});

// Baja de un garage por su ID
app.delete("/garages/:id", async (req, res) => {
    const { id } = req.params;
    const garageEliminado = await db.eliminarGarage(id);
    res.status(200).send(garageEliminado);
});

app.post("/localidades", async (req, res) => {
    const { codPostal, nombreCiudad } = req.body;
    const localidadCreada = await db.crearLocalidad(codPostal, nombreCiudad);
    res.status(201).send(localidadCreada);
});

app.delete("/localidades/:codPostal", async (req, res) => {
    const { codPostal } = req.params;
    const localidadEliminada = await db.eliminarLocalidad(codPostal);
    res.status(200).send(localidadEliminada);
});

app.put("/localidades/:codPostal/nombreCiudad", async (req, res) => {
    const { codPostal } = req.params;
    const { nuevoNombreCiudad } = req.body;
    const localidadActualizada = await db.actualizarNombreCiudadLocalidad(codPostal, nuevoNombreCiudad);
    res.status(200).send(localidadActualizada);
});


app.post("/parcelas", async (req, res) => {
    const { idGarage, numeroParcela, pisoParcela, ocupado, esAccesible, sensorInstalado } = req.body;
    const parcelaCreada = await db.crearParcela(idGarage, numeroParcela, pisoParcela, ocupado, esAccesible, sensorInstalado);
    res.status(201).send(parcelaCreada);
});

app.delete("/parcelas/:idParcela/:idGarage", async (req, res) => {
    const { idParcela, idGarage } = req.params;
    const parcelaEliminada = await db.eliminarParcela(idParcela, idGarage);
    res.status(200).send(parcelaEliminada);
});

app.put("/parcelas/:idParcela/:idGarage/numeroParcela", async (req, res) => {
    const { idParcela, idGarage } = req.params;
    const { nuevoNumeroParcela } = req.body;
    const parcelaActualizada = await db.actualizarNumeroParcela(idParcela, idGarage, nuevoNumeroParcela);
    res.status(200).send(parcelaActualizada);
});

app.put("/parcelas/:idParcela/:idGarage/pisoParcela", async (req, res) => {
    const { idParcela, idGarage } = req.params;
    const { nuevoPisoParcela } = req.body;
    const parcelaActualizada = await db.actualizarPisoParcela(idParcela, idGarage, nuevoPisoParcela);
    res.status(200).send(parcelaActualizada);
});

app.put("/parcelas/:idParcela/:idGarage/estadoAccesible", async (req, res) => {
    const { idParcela, idGarage } = req.params;
    const { nuevoEstadoAccesible } = req.body;
    const parcelaActualizada = await db.actualizarEstadoAccesibleParcela(idParcela, idGarage, nuevoEstadoAccesible);
    res.status(200).send(parcelaActualizada);
});

app.put("/parcelas/:idParcela/:idGarage/estadoSensor", async (req, res) => {
    const { idParcela, idGarage } = req.params;
    const { nuevoEstadoSensor } = req.body;
    const parcelaActualizada = await db.actualizarEstadoSensorInstaladoParcela(idParcela, idGarage, nuevoEstadoSensor);
    res.status(200).send(parcelaActualizada);
});

app.post("/alquileres", async (req, res) => {
    const { idDetalleUsuario, horaInicio, horaFin, idGarage, idTipoPago, importe, idParcela } = req.body;
    const alquilerCreado = await db.crearAlquiler(idDetalleUsuario, horaInicio, horaFin, idGarage, idTipoPago, importe, idParcela);
    res.status(201).send(alquilerCreado);
});

app.delete("/alquileres/:idAlquiler", async (req, res) => {
    const { idAlquiler } = req.params;
    const alquilerEliminado = await db.eliminarAlquiler(idAlquiler);
    res.status(200).send(alquilerEliminado);
});

app.put("/alquileres/:idAlquiler/:idDetalleUsuario/horaInicio", async (req, res) => {
    const { idAlquiler, idDetalleUsuario } = req.params;
    const { nuevaHoraInicio } = req.body;
    const alquilerActualizado = await db.actualizarHoraInicioAlquiler(idAlquiler, idDetalleUsuario, nuevaHoraInicio);
    res.status(200).send(alquilerActualizado);
});

app.put("/alquileres/:idAlquiler/:idDetalleUsuario/horaFin", async (req, res) => {
    const { idAlquiler, idDetalleUsuario } = req.params;
    const { nuevaHoraFin } = req.body;
    const alquilerActualizado = await db.actualizarHoraFinAlquiler(idAlquiler, idDetalleUsuario, nuevaHoraFin);
    res.status(200).send(alquilerActualizado);
});

app.put("/alquileres/:idAlquiler/:idDetalleUsuario/idGarage", async (req, res) => {
    const { idAlquiler, idDetalleUsuario } = req.params;
    const { nuevoIdGarage } = req.body;
    const alquilerActualizado = await db.actualizarIdGarageAlquiler(idAlquiler, idDetalleUsuario, nuevoIdGarage);
    res.status(200).send(alquilerActualizado);
});

app.put("/alquileres/:idAlquiler/:idDetalleUsuario/idTipoPago", async (req, res) => {
    const { idAlquiler, idDetalleUsuario } = req.params;
    const { nuevoIdTipoPago } = req.body;
    const alquilerActualizado = await db.actualizarIdTipoPagoAlquiler(idAlquiler, idDetalleUsuario, nuevoIdTipoPago);
    res.status(200).send(alquilerActualizado);
});

app.put("/alquileres/:idAlquiler/:idDetalleUsuario/importe", async (req, res) => {
    const { idAlquiler, idDetalleUsuario } = req.params;
    const { nuevoImporte } = req.body;
    const alquilerActualizado = await db.actualizarImporteAlquiler(idAlquiler, idDetalleUsuario, nuevoImporte);
    res.status(200).send(alquilerActualizado);
});

app.put("/alquileres/:idAlquiler/:idDetalleUsuario/idParcela", async (req, res) => {
    const { idAlquiler, idDetalleUsuario } = req.params;
    const { nuevoIdParcela } = req.body;
    const alquilerActualizado = await db.actualizarIdParcelaAlquiler(idAlquiler, idDetalleUsuario, nuevoIdParcela);
    res.status(200).send(alquilerActualizado);
});

app.post("/detalle-propietario", async (req, res) => {
    const { idPropietario, idGarage } = req.body;
    const detallePropietarioCreado = await db.crearDetallePropietario(idPropietario, idGarage);
    res.status(201).send(detallePropietarioCreado);
});

app.delete("/detalle-propietario/:idPropietario/:idGarage", async (req, res) => {
    const { idPropietario, idGarage } = req.params;
    const detallePropietarioEliminado = await db.eliminarDetallePropietario(idPropietario, idGarage);
    res.status(200).send(detallePropietarioEliminado);
});

app.put("/detalle-propietario/:idPropietario/:idGarage/idGarage", async (req, res) => {
    const { idPropietario, idGarage } = req.params;
    const { nuevoIdGarage } = req.body;
    const detallePropietarioActualizado = await db.actualizarIdGarageDetallePropietario(idPropietario, idGarage, nuevoIdGarage);
    res.status(200).send(detallePropietarioActualizado);
});

app.put("/detalle-propietario/:idPropietario/:idGarage/idPropietario", async (req, res) => {
    const { idPropietario, idGarage } = req.params;
    const { nuevoIdPropietario } = req.body;
    const detallePropietarioActualizado = await db.actualizarIdPropietarioDetallePropietario(idPropietario, idGarage, nuevoIdPropietario);
    res.status(200).send(detallePropietarioActualizado);
});

app.post("/precios", async (req, res) => {
    const { idGarage, idTipoVehiculo, mediaHoraPrecio, horaPrecio, fraccionPrecio, horas12Precio, horas24Precio } = req.body;
    const precioCreado = await db.crearPrecio(idGarage, idTipoVehiculo, mediaHoraPrecio, horaPrecio, fraccionPrecio, horas12Precio, horas24Precio);
    res.status(201).send(precioCreado);
});

app.delete("/precios/:idPrecio", async (req, res) => {
    const { idPrecio } = req.params;
    const precioEliminado = await db.eliminarPrecio(idPrecio);
    res.status(200).send(precioEliminado);
});

app.put("/precios/:idPrecio/mediaHoraPrecio", async (req, res) => {
    const { idPrecio } = req.params;
    const { nuevoMediaHoraPrecio } = req.body;
    const precioActualizado = await db.actualizarMediaHoraPrecio(idPrecio, nuevoMediaHoraPrecio);
    res.status(200).send(precioActualizado);
});

app.put("/precios/:idPrecio/horaPrecio", async (req, res) => {
    const { idPrecio } = req.params;
    const { nuevoHoraPrecio } = req.body;
    const precioActualizado = await db.actualizarHoraPrecio(idPrecio, nuevoHoraPrecio);
    res.status(200).send(precioActualizado);
});

app.put("/precios/:idPrecio/fraccionPrecio", async (req, res) => {
    const { idPrecio } = req.params;
    const { nuevoFraccionPrecio } = req.body;
    const precioActualizado = await db.actualizarFraccionPrecio(idPrecio, nuevoFraccionPrecio);
    res.status(200).send(precioActualizado);
});

app.put("/precios/:idPrecio/horas12Precio", async (req, res) => {
    const { idPrecio } = req.params;
    const { nuevoHoras12Precio } = req.body;
    const precioActualizado = await db.actualizarHoras12Precio(idPrecio, nuevoHoras12Precio);
    res.status(200).send(precioActualizado);
});

app.put("/precios/:idPrecio/horas24Precio", async (req, res) => {
    const { idPrecio } = req.params;
    const { nuevoHoras24Precio } = req.body;
    const precioActualizado = await db.actualizarHoras24Precio(idPrecio, nuevoHoras24Precio);
    res.status(200).send(precioActualizado);
});


app.post("/resenas", async (req, res) => {
    const { idUsuario, idAlquiler, fechaHora, descripcion } = req.body;
    const resenaCreada = await db.crearResena(idUsuario, idAlquiler, fechaHora, descripcion);
    res.status(201).send(resenaCreada);
});

app.delete("/resenas/:idResena", async (req, res) => {
    const { idResena } = req.params;
    const resenaEliminada = await db.eliminarResena(idResena);
    res.status(200).send(resenaEliminada);
});

app.put("/resenas/:idResena/descripcion", async (req, res) => {
    const { idResena } = req.params;
    const { nuevaDescResena } = req.body;
    const resenaActualizada = await db.actualizarDescResena(idResena, nuevaDescResena);
    res.status(200).send(resenaActualizada);
});

app.put("/resenas/:idResena/puntuacion", async (req, res) => {
    const { idResena } = req.params;
    const { nuevaPuntuacionResena } = req.body;
    const resenaActualizada = await db.actualizarPuntuacionResena(idResena,nuevaPuntuacionResena);
    res.status(200).send(resenaActualizada);
});

app.post("/servicios", async (req, res) => {
    const { descripcion } = req.body;
    const servicioCreado = await db.crearServicio(descripcion);
    res.status(201).send(servicioCreado);
});

app.delete("/servicios/:idServicio", async (req, res) => {
    const { idServicio } = req.params;
    const servicioEliminado = await db.eliminarServicio(idServicio);
    res.status(200).send(servicioEliminado);
});

app.put("/servicios/:idServicio/descripcion", async (req, res) => {
    const { idServicio } = req.params;
    const { nuevaDescripcion } = req.body;
    const servicioActualizado = await db.actualizarDescripcionServicio(idServicio, nuevaDescripcion);
    res.status(200).send(servicioActualizado);
});

app.get("/garages/:id_garage/precios", async (req,res)=>{
    const resultado = await db.getGaragePrices(req.params.id_garage);
    res.status(200).send(resultado);
})


app.listen(8080, () => {
    console.log("Server running port 8080");
});