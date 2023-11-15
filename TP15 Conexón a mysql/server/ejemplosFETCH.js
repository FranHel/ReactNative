//obtener todos
export async function obtenerAlumnos() {
  try {
    const alumnos = await fetch("http://tu-ip:8080/");
    const data = await alumnos.json();
    return data;
  } catch (e) {
    return e.message;
  }
}


const [alumnos, setAlumnos] = useState([]);

useEffect(() => {
  (async () => {
    await obtenerAlumnos().then((data) => {
      setAlumnos(data);
    });
  })();

}, [])

//obtener uno
export async function obtenerAlumnoPorId(id) {
  try {
    const alumno = await fetch(`http://tu-ip:8080/alumno/${id}`);
    const data = await alumno.json();
    return data;
  } catch (e) {
    return e.message;
  }
}

//aca tenes un ejemplo de put:
function obtenerFechaHoraActualSQL() {
  const fechaHoraActualUTC = new Date();

  // Calcular el desplazamiento de tiempo para la zona horaria -3 en milisegundos
  const desplazamientoHorario = -3 * 60 * 60 * 1000;

  // Aplicar el desplazamiento para obtener la fecha y hora en la zona horaria deseada
  const fechaHoraEnZonaHoraria = new Date(fechaHoraActualUTC.getTime() + desplazamientoHorario);

  // Formatear la fecha y hora en el formato SQL 'YYYY-MM-DD HH:MM:SS'
  const fechaSQL = fechaHoraEnZonaHoraria.toISOString().slice(0, 19).replace('T', ' ');

  return fechaSQL;
}



export async function marcarLlamadoComoAtendido(id_llamado) {
  let fechaFormateada = obtenerFechaHoraActualSQL();
  try {
    const llamado = await fetch(`https://api-olimpiada-g1.up.railway.app/llamados/${id_llamado}`, {
      headers: {
        "Content-Type": "application/json",
        cache: "no-cache",
      },
      method: "PUT",
      body: JSON.stringify({
        estado_llamado: 1,
        fhora_atencion_llamado: fechaFormateada,
      }),
    });
    const data = await llamado.json();
    return data;
  } catch (e) {
    console.log(e);
  }
  //console.log(obtenerFechaHoraActualSQL());
}


/**
 * fijate que para el post
cambias donde dice put por post
y el json tiene que coincidir con lo que estaba pidiendo antes
body: JSON.stringify({
        apellido: parametro_apellido,
        nombre: parametro_nombre,
        [todo el resto de cosas]
      }),
 */