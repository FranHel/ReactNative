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

export async function getAlumnos() {
    const [row] = await pool.query('SELECT * FROM alumnos');
    return row;
}
export async function getAlumnoById(id) {
    const [row] = await pool.query('SELECT * FROM alumnos WHERE id_alumno = ?', [id]);
    return row;
}
export async function insertarRegistro(apellido, nombre, email, fnac, mobile, dni) {
    const [row] = await pool.query(`
    INSERT INTO 
    alumnos 
    (apellido_alumno, nombre_alumno, email_alumno, fnac_alumno, mobile_alumno, dni_alumno) VALUES
    (?,?,?,?,?,?)`, [apellido, nombre, email, fnac, mobile, dni]);
    return row;
}
export async function actualizarAlumnoById(id, apellido, nombre, email, fnac, mobile, dni) {
    const row = await pool.query(`
    UPDATE alumnos
    SET 
    apellido_alumno = ?,
    nombre_alumno = ?,
    email_alumno = ?,
    fnac_alumno = ?,
    mobile_alumno = ?,
    dni_alumno = ?
    WHERE id_alumno = ? 
    `, [apellido, nombre, email, fnac, mobile, dni, id]);
    return row;
}
export async function borrarAlumnoById(id) {
    const [row] = await pool.query('DELETE FROM alumnos WHERE id_alumno = ?', [id]);
    return row;
}