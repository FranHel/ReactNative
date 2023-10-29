import mysql from 'mysql2';
import {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,
} from './config.js';

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT
}).promise();

export async function getClientes() {
    const [row] = await pool.query('SELECT * FROM clientes');
    return row;
}
export async function getClientesById(id) {
    const [row] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
    return row;
}
export async function insertarRegistro(nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email) {
    const [row] = await pool.query(`
    INSERT INTO 
    clientes 
    (nombre_cliente, apellido_cliente, fechanac_cliente, peso_cliente, altura_cliente, domicilio_cliente, codpostal_cliente, movil1_cliente,movil2_cliente,email_cliente) VALUES
    (?,?,?,?,?,?)`, [nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email]);
    return row;
}
export async function actualizarclienteById(id,nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email) {
    const row = await pool.query(`
    UPDATE clientes
    SET 
    nombre_cliente = ?,
    apellido_cliente = ?,
    fechanac_cliente = ?,
    peso_cliente = ?,
    altura_cliente = ?,
    domicilio_cliente = ?,
    codpostal_cliente = ?,
    movil1_cliente = ?,
    movil2_cliente = ?,
    email_cliente = ?,
    WHERE id_cliente = ? 
    `, [nombre, apellido, fechanac, peso, altura, domicilio,codpostal,movil1,movil2,email,id]);
    return row;
}
export async function borrarclienteById(id) {
    const [row] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    return row;
}