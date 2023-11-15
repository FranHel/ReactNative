import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getTodo(tabla){
    try{
        const [result] = await pool.query(`SELECT * FROM ${tabla}`);
        return result;
    }catch(e){
        console.log(e.message);
    }
}


/**
 * @function crearUsuario
 * @param {string} email 
 * @param {string} contrasena 
 * @param {date} fnac 
 * @param {string} celular 
 * @returns Registro agregado
 */
export async function crearUsuario(email, contrasena, fnac, celular){
    try{
        const fecha_inicio_cuenta = new Date();
        const [row] = await pool.query(
            `INSERT INTO 
                usuarios (email_usuario, contrasena_usuario, fecha_inicio_cuenta, fecha_nacimiento, celular_usuario)
                VALUES (?,?,?,?,?);`,[email, contrasena, fecha_inicio_cuenta, fnac, celular]
        )
        return row;
    }catch(e){
        console.log("Error al crear usuario: "+e.message);
    }
}

/**
 * @function actualizarEmailUsuario
 * @param {string} email 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarEmailUsuario(email,id){
    try{
        const [row] = await pool.query(
            `UPDATE usuarios
            SET email_usuario = ?
            WHERE id_usuario = ?;`,[email, id]
        )
        return row;
    }catch(e){
        console.log("Error al actualizar email: "+e.message);
    }   
}

/**
 * @function actualizarContrasenaUsuario
 * @param {string} contrasena 
 * @param {int} id 
 * @returns Registro actualizado
 */
export async function actualizarContrasenaUsuario(contrasena, id){
    try{
        const [row] = await pool.query(
            `UPDATE usuarios
            SET contrasena_usuario = ?
            WHERE id_usuario = ?;`,[contrasena, id]
        )
        return row;
    }catch(e){
        console.log("Error al actualizar contrasena: "+e.message);
    }
}

/**
 * @function actualizarFNacUsuario
 * @param {date} fnac 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarFNacUsuario(fnac, id){
    try{
        const [row] = await pool.query(
            `UPDATE usuarios
            SET fecha_nacimiento = ?
            WHERE id_usuario = ?;`,[fnac, id]
        )
        return row;
    }catch(e){
        console.log("Error al actualizar fecha de nacimiento: "+e.message);
    }
}

/**
 * @function actualizarCelularUsuario
 * @param {string} celular 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarCelularUsuario(celular, id){
    try{
        const [row] = await pool.query(
            `UPDATE usuarios
            SET celular_usuario = ?
            WHERE id_usuario = ?;`,[celular, id]
        );
        return row;
    }catch(e){
        console.log("Error al actualizar celular: "+e.message);
    }
}

/**
 * @function borrarUsuario
 * @param {int} id 
 * @returns Registro borrado
 */

export async function borrarUsuario(id){
    try{
        const [row] = await pool.query(
            `DELETE FROM usuarios
            WHERE id_usuario = ?;`,[id]
        );
        return row;
    }catch(e){
        console.log("Error al eliminar usuario: "+e.message);
    }
}
/**
 * @function crearPropietario
 * @param {string} nombre 
 * @param {string} apellido 
 * @param {string} razon_social 
 * @param {string} email 
 * @param {string} contrasena 
 * @param {string} celular 
 * @returns Registro creado
 */
export async function crearPropietario(nombre, apellido, razon_social, email, contrasena, celular){
    try{
        const [row] = await pool.query(`
            INSERT INTO propietarios(nombre_propietario, apellido_propietario, razon_social_propietario, email_propietario, contrasena_propietario, celular_propietario)
            VALUES (?,?,?,?,?,?)
        `,[nombre, apellido, razon_social, email, contrasena, celular]);
        return row;
    }catch(e){
        console.log("Error no se pudo crear el propietario: "+e.message);
    }
}

/**
 * @function actualizarNombrePropietario
 * @param {string} nombre 
 * @param {int} id 
 * @returns Registro actualizado
 */
export async function actualizarNombrePropietario(nombre, id){
    try{
        const [row] = await pool.query(`
            UPDATE propietarios
            SET nombre_propietario = ?
            WHERE id_propietario = ?;
        `,[nombre, id]);
        return row;
    }catch(e){
        console.log("Error no se pudo actualizar el nombre del propietario: "+e.message);
    }
}

/**
 * @function actualizarApellidoPropietario
 * @param {string} apellido 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarApellidoPropietario(apellido, id){
    try{
        const [row] = await pool.query(`
            UPDATE propietarios
            SET apellido_propietario = ?
            WHERE id_propietario = ?;
        `,[apellido, id]);
        return row;
    }catch(e){
        console.log("Error no se pudo actualizar el apellido del propietario: "+e.message);
    }
}

/**
 * @function actualizarRazonSocialPropietario
 * @param {string} razon_social 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarRazonSocialPropietario(razon_social, id){
    try{
        const [row] = await pool.query(`
            UPDATE propietarios
            SET razon_social_propietario = ?
            WHERE id_propietario = ?;
        `,[razon_social, id]);
        return row;
    }catch(e){
        console.log("Error no se pudo actualizar la razon social del propietario: "+e.message);
    }
}

/**
 * @function actualizarEmailPropietario
 * @param {string} email_propietario 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarEmailPropietario(email_propietario, id){
    try{
        const [row] = await pool.query(`
            UPDATE propietarios
            SET email_propietario = ?
            WHERE id_propietario = ?;
        `,[email, id]);
        return row;
    }catch(e){
        console.log("Error no se pudo actualizar el email del propietario: "+e.message);
    }
}

/**
 * @function actualizarContrasenaPropietario
 * @param {string} contrasena_propietario 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarContrasenaPropietario(contrasena_propietario, id){
    try{
        const [row] = await pool.query(`
            UPDATE propietarios
            SET contrasena_propietario = ?
            WHERE id_propietario = ?;
        `,[contrasena, id]);
        return row;
    }catch(e){
        console.log("Error al actualizar contrasena propietario: "+ e.message)
    }
}

/**
 * @function actualizarCelularPropietario
 * @param {string} celular 
 * @param {int} id 
 * @returns Registro actualizado
 */

export async function actualizarCelularPropietario(celular, id){
    try{
        const [row] = await pool.query(
            `UPDATE propietarios
            SET celular_usuario = ?
            WHERE id_usuario = ?;`,[celular, id]
        );
        return row;
    }catch(e){
        console.log("Error al actualizar celular: "+e.message);
    }
}

/**
 * @function borrarPropietario
 * @param {*} id 
 * @returns Registro borrado
 */

export async function borrarPropietario(id){
    try{
        const [row] = await pool.query(
            `DELETE FROM propietarios
            WHERE id_propietario = ?;`,[id]
        );
        return row;
    }catch(e){
        console.log("Error al eliminar propietario: "+e.message);
    }
}
/**
 * @function crearTipoVehiculo
 * @param {string} desc_vehiculo 
 * @returns Registro creado
 */
export async function crearTipoVehiculo(desc_vehiculo){
    try{
        const [row] =await pool.query(`INSERT INTO tipo_vehiculo (desc_vehiculo) VALUES (?);`,[desc_vehiculo])
        return row;
    }catch(e){
        console.log("Error al crear tipo vehiculo: "+e.message);
    }
}
/**
 * @function actualizarTipoVehiculo
 * @param {string} desc_vehiculo 
 * @param {int} id_tipo_vehiculo 
 * @returns Registro actualizado
 */
export async function actualizarTipoVehiculo(desc_vehiculo, id_tipo_vehiculo){
    try{
        const [row] =await pool.query(`UPDATE tipo_vehiculo SET desc_vehiculo = ? WHERE id_tipo_vehiculo = ?;`,[desc_vehiculo, id_tipo_vehiculo])
        return row;
    }catch(e){
        console.log("Error al actualizar tipo vehiculo: "+e.message);
    }
}
/**
 * @function borrarTipoVehiculo
 * @param {int} id_tipo_vehiculo 
 * @returns Registro borrado
 */
export async function borrarTipoVehiculo(id_tipo_vehiculo){
    try{
        const [row] = await pool.query(
            `DELETE FROM tipo_vehiculo
            WHERE id_tipo_vehiculo = ?;`,[id_tipo_vehiculo]
        );
        return row;
    }catch(e){
        console.log("Error al borrar tipo vehiculo: "+e.message);
    }
}
/**
 * @function crearTipoPago
 * @param {string} desc_tipo_pago 
 * @returns Registro creado
 */

export async function crearTipoPago(desc_tipo_pago){
    try{
        const [row] =await pool.query(`INSERT INTO tipo_pago (desc_tipo_pago) VALUES (?);`,[desc_tipo_pago])
        return row;
    }catch(e){
        console.log("Error al crear tipo de pago: "+e.message);
    }
}

/**
 * @function actualizarTipoPago
 * @param {string} desc_tipo_pago 
 * @param {int} id_tipo_pago 
 * @returns Registro actualizado 
 */

export async function actualizarTipoPago(desc_tipo_pago, id_tipo_pago){
    try{
        const [row] =await pool.query(`UPDATE tipo_pago SET desc_tipo_pago = ? WHERE id_tipo_pago = ?;`,[desc_tipo_pago, id_tipo_pago])
        return row;
    }catch(e){
        console.log("Error al crear tipo pago: "+e.message);
    }
}
/**
 * @function borrarTipoPago
 * @param {int} id_tipo_pago 
 * @returns Registro borrado
 */
export async function borrarTipoPago(id_tipo_pago){
    try{
        const [row] = await pool.query(
            `DELETE FROM tipo_pago
            WHERE id_tipo_pago = ?;`,[id_tipo_pago]
        );
        return row;
    }catch(e){
        console.log("Error al borrar tipo pago: "+e.message);
    }
}

// Alta de un detalle de usuario
export async function crearDetalleUsuario(idUsuario, patente, idTipoVehiculo) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                detalle_usuario (id_usuario, patente, id_tipo_vehiculo)
                VALUES (?,?,?);`, [idUsuario, patente, idTipoVehiculo]
        );
        return row;
    } catch (e) {
        console.log("Error al crear detalle de usuario: " + e.message);
    }
}

// Baja de un detalle de usuario por su ID
export async function eliminarDetalleUsuario(idDetalleUsuario) {
    try {
        const [row] = await pool.query(
            `DELETE FROM detalle_usuario WHERE id_detalle_usuario = ?;`, [idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar detalle de usuario: " + e.message);
    }
}

// Modificación de campos en un detalle de usuario
export async function actualizarDetalleUsuario(id_detalle_usuario, idUsuario, patente, idTipoVehiculo) {
    try {
        const [row] = await pool.query(
            `UPDATE detalle_usuario
            SET id_usuario = ?, patente = ?, id_tipo_vehiculo = ?
            WHERE id_detalle_usuario = ?;`, [idUsuario, patente, idTipoVehiculo, id_detalle_usuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar detalle de usuario: " + e.message);
    }
}


// Alta de un garage
export async function crearGarage(domicilio, codPostal, latitud, longitud, idTipoServicio, descripcion, puntuacion, cantParcelas) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                garages (domicilio_garage, cod_postal, lat_garage, long_garage, id_tipo_servicio, desc_garage, puntuacion_garage, cant_parcelas_accesible)
                VALUES (?,?,?,?,?,?,?,?);`,
            [domicilio, codPostal, latitud, longitud, idTipoServicio, descripcion, puntuacion, cantParcelas]
        );
        return row;
    } catch (e) {
        console.log("Error al crear garage: " + e.message);
    }
}

// Baja de un garage por su ID
export async function eliminarGarage(idGarage) {
    try {
        const [row] = await pool.query(
            `DELETE FROM garages WHERE id_garage = ?;`, [idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar garage: " + e.message);
    }
}

/**
 * @function actualizarGarage
 * @param {object} nuevosDatos - Objeto con los nuevos datos a actualizar en el garage
 * @returns Registro actualizado
 */
export async function actualizarGarage(nuevosDatos) {
    const {
        idGarage,
        domicilio,
        codPostal,
        latitud,
        longitud,
        idTipoServicio,
        descripcion,
        puntuacion,
        cantParcelas
    } = nuevosDatos;

    try {
        const [row] = await pool.query(
            `UPDATE garages
            SET domicilio_garage = ?, cod_postal = ?, lat_garage = ?, long_garage = ?,
                id_tipo_servicio = ?, desc_garage = ?, puntuacion_garage = ?, cant_parcelas_accesible = ?
            WHERE id_garage = ?;`,
            [domicilio, codPostal, latitud, longitud, idTipoServicio, descripcion, puntuacion, cantParcelas, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar garage: " + e.message);
    }
}


// Alta de una localidad
export async function crearLocalidad(codPostal, nombreCiudad) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                localidades (cod_postal, nombre_ciudad)
                VALUES (?,?);`,
            [codPostal, nombreCiudad]
        );
        return row;
    } catch (e) {
        console.log("Error al crear localidad: " + e.message);
    }
}

// Baja de una localidad por su Código Postal
export async function eliminarLocalidad(codPostal) {
    try {
        const [row] = await pool.query(
            `DELETE FROM localidades WHERE cod_postal = ?;`, [codPostal]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar localidad: " + e.message);
    }
}

// Modificación del Nombre de Ciudad en una localidad
export async function actualizarNombreCiudadLocalidad(codPostal, nuevoNombreCiudad) {
    try {
        const [row] = await pool.query(
            `UPDATE localidades
            SET nombre_ciudad = ?
            WHERE cod_postal = ?;`, [nuevoNombreCiudad, codPostal]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar nombre de ciudad en localidad: " + e.message);
    }
}

// Alta de una parcela
export async function crearParcela(idGarage, numeroParcela, pisoParcela, ocupado, esAccesible, sensorInstalado) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                parcela (id_garage, numero_parcela, piso_parcela, ocupado, es_accesible, sensor_instalado)
                VALUES (?,?,?,?,?,?);`,
            [idGarage, numeroParcela, pisoParcela, ocupado, esAccesible, sensorInstalado]
        );
        return row;
    } catch (e) {
        console.log("Error al crear parcela: " + e.message);
    }
}

// Baja de una parcela por su ID
export async function eliminarParcela(idParcela, idGarage) {
    try {
        const [row] = await pool.query(
            `DELETE FROM parcela WHERE id_parcela = ? AND id_garage = ?;`, [idParcela, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar parcela: " + e.message);
    }
}

// Modificación del Número de Parcela en una parcela
export async function actualizarNumeroParcela(idParcela, idGarage, nuevoNumeroParcela) {
    try {
        const [row] = await pool.query(
            `UPDATE parcela
            SET numero_parcela = ?
            WHERE id_parcela = ? AND id_garage = ?;`, [nuevoNumeroParcela, idParcela, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar número de parcela: " + e.message);
    }
}

// Modificación del Piso de Parcela en una parcela
export async function actualizarPisoParcela(idParcela, idGarage, nuevoPisoParcela) {
    try {
        const [row] = await pool.query(
            `UPDATE parcela
            SET piso_parcela = ?
            WHERE id_parcela = ? AND id_garage = ?;`, [nuevoPisoParcela, idParcela, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar piso de parcela: " + e.message);
    }
}

// Modificación del estado de Accesible en una parcela
export async function actualizarEstadoAccesibleParcela(idParcela, idGarage, nuevoEstadoAccesible) {
    try {
        const [row] = await pool.query(
            `UPDATE parcela
            SET es_accesible = ?
            WHERE id_parcela = ? AND id_garage = ?;`, [nuevoEstadoAccesible, idParcela, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar estado de accesible en parcela: " + e.message);
    }
}

// Modificación del estado de Sensor Instalado en una parcela
export async function actualizarEstadoSensorInstaladoParcela(idParcela, idGarage, nuevoEstadoSensor) {
    try {
        const [row] = await pool.query(
            `UPDATE parcela
            SET sensor_instalado = ?
            WHERE id_parcela = ? AND id_garage = ?;`, [nuevoEstadoSensor, idParcela, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar estado de sensor instalado en parcela: " + e.message);
    }
}

export async function getIdParcelaByIdGarage(id_garage, min, max, piso_parcela){
    try{
        const [resultado] = await pool.query(`
        SELECT id_parcela
        FROM parcela 
        WHERE id_garage = ${id_garage} 
            AND piso_parcela = ${piso_parcela} 
            AND numero_parcela >= ${min} 
            AND numero_parcela <= ${max}
        ORDER BY numero_parcela ASC;
        `);
        return resultado;
    }catch(e){
        console.log(e.message);
    }
}

export async function getParcelas(id_garage){
    try{
        const [row] = await pool.query("SELECT * FROM parcela WHERE id_garage = ?",[id_garage]);
        return row;
    }catch(e){
        console.log(e.message);
    }
}

export async function actualizarEstadoParcela(ocupado, id_parcela){
    try {
        const [row] = await pool.query(
            `UPDATE parcela
            SET ocupado = ?
            WHERE id_parcela=?`,
            [ocupado, id_parcela]
        );
        return row;
    } catch(e){
        console.log(e.message);
    }
}

// Alta de un alquiler de garage
export async function crearAlquiler(idDetalleUsuario, horaInicio, horaFin, idGarage, idTipoPago, importe, idParcela) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                alquiler_garage (id_detalle_usuario, hora_inicio, hora_fin, id_garage, id_tipo_pago, importe, id_parcela)
                VALUES (?,?,?,?,?,?,?);`,
            [idDetalleUsuario, horaInicio, horaFin, idGarage, idTipoPago, importe, idParcela]
        );
        return row;
    } catch (e) {
        console.log("Error al crear alquiler de garage: " + e.message);
    }
}

// Baja de un alquiler de garage por su ID
export async function eliminarAlquiler(idAlquiler) {
    try {
        const [row] = await pool.query(
            `DELETE FROM alquiler_garage WHERE id_alquiler = ?;`, [idAlquiler]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar alquiler de garage: " + e.message);
    }
}

// Modificación de la Hora de Inicio en un alquiler de garage
export async function actualizarHoraInicioAlquiler(idAlquiler, idDetalleUsuario, nuevaHoraInicio) {
    try {
        const [row] = await pool.query(
            `UPDATE alquiler_garage
            SET hora_inicio = ?
            WHERE id_alquiler = ? AND id_detalle_usuario = ?;`, [nuevaHoraInicio, idAlquiler, idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar hora de inicio en alquiler de garage: " + e.message);
    }
}

// Modificación de la Hora de Fin en un alquiler de garage
export async function actualizarHoraFinAlquiler(idAlquiler, idDetalleUsuario, nuevaHoraFin) {
    try {
        const [row] = await pool.query(
            `UPDATE alquiler_garage
            SET hora_fin = ?
            WHERE id_alquiler = ? AND id_detalle_usuario = ?;`, [nuevaHoraFin, idAlquiler, idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar hora de fin en alquiler de garage: " + e.message);
    }
}

// Modificación del ID de Garage en un alquiler de garage
export async function actualizarIdGarageAlquiler(idAlquiler, idDetalleUsuario, nuevoIdGarage) {
    try {
        const [row] = await pool.query(
            `UPDATE alquiler_garage
            SET id_garage = ?
            WHERE id_alquiler = ? AND id_detalle_usuario = ?;`, [nuevoIdGarage, idAlquiler, idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar ID de garage en alquiler de garage: " + e.message);
    }
}

// Modificación del ID de Tipo de Pago en un alquiler de garage
export async function actualizarIdTipoPagoAlquiler(idAlquiler, idDetalleUsuario, nuevoIdTipoPago) {
    try {
        const [row] = await pool.query(
            `UPDATE alquiler_garage
            SET id_tipo_pago = ?
            WHERE id_alquiler = ? AND id_detalle_usuario = ?;`, [nuevoIdTipoPago, idAlquiler, idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar ID de tipo de pago en alquiler de garage: " + e.message);
    }
}

// Modificación del Importe en un alquiler de garage
export async function actualizarImporteAlquiler(idAlquiler, idDetalleUsuario, nuevoImporte) {
    try {
        const [row] = await pool.query(
            `UPDATE alquiler_garage
            SET importe = ?
            WHERE id_alquiler = ? AND id_detalle_usuario = ?;`, [nuevoImporte, idAlquiler, idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar importe en alquiler de garage: " + e.message);
    }
}

// Modificación del ID de Parcela en un alquiler de garage
export async function actualizarIdParcelaAlquiler(idAlquiler, idDetalleUsuario, nuevoIdParcela) {
    try {
        const [row] = await pool.query(
            `UPDATE alquiler_garage
            SET id_parcela = ?
            WHERE id_alquiler = ? AND id_detalle_usuario = ?;`, [nuevoIdParcela, idAlquiler, idDetalleUsuario]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar ID de parcela en alquiler de garage: " + e.message);
    }
}

// Alta de un detalle de propietario
export async function crearDetallePropietario(idPropietario, idGarage) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                detalle_propietario (id_propietario, id_garage)
                VALUES (?,?);`,
            [idPropietario, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al crear detalle de propietario: " + e.message);
    }
}

// Baja de un detalle de propietario por su ID de Propietario
export async function eliminarDetallePropietario(idPropietario, idGarage) {
    try {
        const [row] = await pool.query(
            `DELETE FROM detalle_propietario WHERE id_propietario = ? AND id_garage = ?;`, [idPropietario, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar detalle de propietario: " + e.message);
    }
}

// Modificación del ID de Garage en un detalle de propietario
export async function actualizarIdGarageDetallePropietario(idPropietario, idGarage, nuevoIdGarage) {
    try {
        const [row] = await pool.query(
            `UPDATE detalle_propietario
            SET id_garage = ?
            WHERE id_propietario = ? AND id_garage = ?;`, [nuevoIdGarage, idPropietario, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar ID de garage en detalle de propietario: " + e.message);
    }
}

// Modificación del ID de Propietario en un detalle de propietario
export async function actualizarIdPropietarioDetallePropietario(idPropietario, idGarage, nuevoIdPropietario) {
    try {
        const [row] = await pool.query(
            `UPDATE detalle_propietario
            SET id_propietario = ?
            WHERE id_propietario = ? AND id_garage = ?;`, [nuevoIdPropietario, idPropietario, idGarage]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar ID de propietario en detalle de propietario: " + e.message);
    }
}

// Alta de un precio
export async function crearPrecio(idGarage, idTipoVehiculo, mediaHoraPrecio, horaPrecio, fraccionPrecio, horas12Precio, horas24Precio) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                precios (id_garage, id_tipo_vehiculo, mediahora_precio, hora_precio, fraccion_precio, 12_horas_precio, 24_horas_precio)
                VALUES (?,?,?,?,?,?,?);`,
            [idGarage, idTipoVehiculo, mediaHoraPrecio, horaPrecio, fraccionPrecio, horas12Precio, horas24Precio]
        );
        return row;
    } catch (e) {
        console.log("Error al crear precio: " + e.message);
    }
}

// Baja de un precio por su ID
export async function eliminarPrecio(idPrecio) {
    try {
        const [row] = await pool.query(
            `DELETE FROM precios WHERE id_precio = ?;`, [idPrecio]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar precio: " + e.message);
    }
}

// Modificación del Media Hora Precio en un precio
export async function actualizarMediaHoraPrecio(idPrecio, nuevoMediaHoraPrecio) {
    try {
        const [row] = await pool.query(
            `UPDATE precios
            SET mediahora_precio = ?
            WHERE id_precio = ?;`, [nuevoMediaHoraPrecio, idPrecio]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar Media Hora Precio en precio: " + e.message);
    }
}

// Modificación del Hora Precio en un precio
export async function actualizarHoraPrecio(idPrecio, nuevoHoraPrecio) {
    try {
        const [row] = await pool.query(
            `UPDATE precios
            SET hora_precio = ?
            WHERE id_precio = ?;`, [nuevoHoraPrecio, idPrecio]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar Hora Precio en precio: " + e.message);
    }
}

// Modificación del Fraccion Precio en un precio
export async function actualizarFraccionPrecio(idPrecio, nuevoFraccionPrecio) {
    try {
        const [row] = await pool.query(
            `UPDATE precios
            SET fraccion_precio = ?
            WHERE id_precio = ?;`, [nuevoFraccionPrecio, idPrecio]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar Fraccion Precio en precio: " + e.message);
    }
}

// Modificación del 12 Horas Precio en un precio
export async function actualizarHoras12Precio(idPrecio, nuevoHoras12Precio) {
    try {
        const [row] = await pool.query(
            `UPDATE precios
            SET 12_horas_precio = ?
            WHERE id_precio = ?;`, [nuevoHoras12Precio, idPrecio]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar 12 Horas Precio en precio: " + e.message);
    }
}

// Modificación del 24 Horas Precio en un precio
export async function actualizarHoras24Precio(idPrecio, nuevoHoras24Precio) {
    try {
        const [row] = await pool.query(
            `UPDATE precios
            SET 24_horas_precio = ?
            WHERE id_precio = ?;`, [nuevoHoras24Precio, idPrecio]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar 24 Horas Precio en precio: " + e.message);
    }
}

export async function crearResena(idUsuario, idAlquiler, fechaHora, descripcion, puntuacion_resena) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                resenas (id_usuario, id_alquiler, fecha_hora_resena, desc_resena, puntuacion_resena)
                VALUES (?,?,?,?,?);`,
            [idUsuario, idAlquiler, fechaHora, descripcion, puntuacion_resena]
        );
        return row;
    } catch (e) {
        console.log("Error al crear reseña: " + e.message);
    }
}

// Baja de una reseña por su ID
export async function eliminarResena(idResena) {
    try {
        const [row] = await pool.query(
            `DELETE FROM resenas WHERE id_resena = ?;`, [idResena]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar reseña: " + e.message);
    }
}

// Modificación del Usuario asociado a una reseña
export async function actualizarDescResena(idResena, nuevaDescResena) {
    try {
        const [row] = await pool.query(
            `UPDATE resenas
            SET desc_resena = ?
            WHERE id_resena = ?;`, [nuevaDescResena, idResena]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar descripción de reseña: " + e.message);
    }
}

export async function actualizarPuntuacionResena(idResena, nuevaPuntuacionResena) {
    try {
        const [row] = await pool.query(
            `UPDATE resenas
            SET puntuacion_resena = ?
            WHERE id_resena = ?;`, [nuevaPuntuacionResena, idResena]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar descripción de reseña: " + e.message);
    }
}

// Alta de un servicio
export async function crearServicio(descripcion) {
    try {
        const [row] = await pool.query(
            `INSERT INTO 
                servicios (desc_servicio)
                VALUES (?);`,
            [descripcion]
        );
        return row;
    } catch (e) {
        console.log("Error al crear servicio: " + e.message);
    }
}

// Baja de un servicio por su ID
export async function eliminarServicio(idServicio) {
    try {
        const [row] = await pool.query(
            `DELETE FROM servicios WHERE id_tipo_servicio = ?;`, [idServicio]
        );
        return row;
    } catch (e) {
        console.log("Error al eliminar servicio: " + e.message);
    }
}

// Modificación de la descripción de un servicio
export async function actualizarDescripcionServicio(idServicio, nuevaDescripcion) {
    try {
        const [row] = await pool.query(
            `UPDATE servicios
            SET desc_servicio = ?
            WHERE id_tipo_servicio = ?;`, [nuevaDescripcion, idServicio]
        );
        return row;
    } catch (e) {
        console.log("Error al actualizar descripción de servicio: " + e.message);
    }
}


export async function getGarageById(idGarage){
    try{
        const [row] = await pool.query(`SELECT
        domicilio_garage, desc_servicio, desc_garage, puntuacion_garage, cant_parcelas_accesible, telefono_garage, 12_horas_precio, 24_horas_precio
         FROM precios
         INNER JOIN garages ON precios.id_garage = garages.id_garage
         INNER JOIN servicios ON garages.id_tipo_servicio = servicios.id_tipo_servicio
         WHERE garages.id_garage = ?; `,[idGarage]);
        return row;
    }catch(e){
        console.log("Error al obtener datos del garage: "+e.message)
    }
}

export async function getGaragesYPrecios(id_tipo_vehiculo){
    try{
        const [row] = await pool.query(`
        SELECT
        garages.telefono_garage, garages.id_garage, domicilio_garage, cod_postal, lat_garage, long_garage, garages.id_tipo_servicio, desc_servicio, desc_garage, puntuacion_garage, cant_parcelas_accesible,
        hora_precio, fraccion_precio, 12_horas_precio AS doce_horas_precio, 24_horas_precio AS veinti_horas_precio
         FROM precios
         INNER JOIN garages ON precios.id_garage = garages.id_garage
         INNER JOIN servicios ON garages.id_tipo_servicio = servicios.id_tipo_servicio
         WHERE id_tipo_vehiculo = ?
        `,[id_tipo_vehiculo]);
        return row;
    }catch(e){
        console.log("Error al obtener los garages y precios: "+e.message);
    }
}

export async function getGaragePrices(id_garage){
    try{
        const [row] = await pool.query(`SELECT
        desc_garage, desc_vehiculo, mediahora_precio, hora_precio, fraccion_precio, 12_horas_precio AS doce_horas_precio, 24_horas_precio AS veinti_horas_precio
         FROM precios
         INNER JOIN garages ON precios.id_garage = garages.id_garage
         INNER JOIN tipo_vehiculo ON precios.id_tipo_vehiculo = tipo_vehiculo.id_tipo_vehiculo
         WHERE precios.id_garage = ?; `,[id_garage]);
        return row;
    }catch(e){
        console.log("Error al obtener los precios del garage: "+e.message);
    }
}