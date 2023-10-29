//obtener todos
export async function obtenerAlumnos() {
    try {
        const alumnos = await fetch("http://172.28.64.1:8080/");
        const data = await alumnos.json();
        return data;
    } catch (e) {
        return e.message;
    }
}