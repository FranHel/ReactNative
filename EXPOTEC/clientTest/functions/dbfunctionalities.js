import { ip } from "./ip";
export async function fetchLugares(){
    try {
        const response = await fetch(`http://${ip}:8080/`);
        const data = await response.json();
        return (data);
      } catch(error) {
        console.log("Error al obtener los lugares:", error);
      }
}

export async function ActualizarEstado(estado, id){
    try {
        const response = await fetch(`http://${ip}:8080/actualizar/estado/${id}`,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                estado: estado
            })
        }); //se conecta al endpoint definido en server/app.js
        const data = await response.json(); //formatea la respuesta en json
        return (data);
      } catch(error) {
        console.log("Error al actualizar el estado del lugar "+id+":", error); //muestra en consola si hay un error
      }
}