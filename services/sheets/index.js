import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";
import "dotenv/config";

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const doc = new GoogleSpreadsheet(
  "1MFSLDq62rA7gHQtIuDAcFwm5R91yyKrECLelh7mPWnc",
  serviceAccountAuth
);


export const consultarTurnos = async (telefono) => {
  try {
    let turnos = {
      Fecha: [],
      Inicio: [],
      Finalización: [],
      Servicio: [],
      Cliente: [],
      Telefono: [],
    };
    const CREDENTIALS = {
      type: "service_account",
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key:process.env.PRIVATE_KEY,
      client_email:process.env.CLIENT_EMAIL,
      client_id:process.env.CLIENT_ID,
      auth_uri:process.env.AUTH_URI,
      token_uri:process.env.TOKEN_URI,
      auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url:process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSITY_DOMAIN,
    };
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo(); // Asumiendo que 'doc' está definido y representa la hoja de cálculo.
    let sheet = doc.sheetsByTitle["Hoja 1"];
    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if (row._rawData[5] === telefono) {
        // Suponiendo que el teléfono está en la sexta columna (índice 5).
        turnos["Fecha"].push(row._rawData[0]);
        turnos["Inicio"].push(row._rawData[1]);
        turnos["Finalización"].push(row._rawData[2]);
        turnos["Servicio"].push(row._rawData[3]);
        turnos["Cliente"].push(row._rawData[4]);
        turnos["Telefono"].push(row._rawData[5]);
      }
    }

    let mensaje = '📅 Los siguientes turnos que tienes agendados son:\n';
    let contadorTurnos = 0;
    for (let i = 0; i < turnos.Fecha.length; i++) {
      let fechaTurno = moment(turnos.Fecha[i], 'DD/MM/YY');
      if (fechaTurno.isAfter(moment())) {
        mensaje += `${i+1}) Para la fecha ${turnos.Fecha[i]} un servicio de *${turnos.Servicio[i]}* a las ${turnos.Inicio[i]} hasta las ${turnos.Finalización[i]},\n`;
        contadorTurnos++;
      }
    }

    if (mensaje === '📅 Los siguientes turnos que tienes agendados son:\n') {
      mensaje = "😔 No hay turnos agendados con tu número de teléfono";
    }

    console.log('Turnos consultados:', turnos);
    return { mensaje, contadorTurnos,turnos };
  } catch (error) {
    console.error('Ocurrió un error al consultar los turnos:', error);
    throw error;
  }
};

export const agendarTurno = async (
  fecha,
  horaSolicitada,
  servicio,
  cliente,
  telefono
) => {
  try {
    // 1. Verificar si ya existe un turno con el mismo número de teléfono.
    // o generar una funcion en el excel para que la fecha anterior al dia actual borre el turno o
    //generar dentro de consultar turnos una funcion para que mire explicitamente los turnos del dia o de los dias siguientes 
    const turnosExistentes = await consultarTurnos(telefono);
    console.log('Turnos existentes:', turnosExistentes.contadorTurnos);
    if (turnosExistentes.length > 3) {
      console.log('Ya existe un turno para este número de teléfono.');
      return "Ya tienes un turno agendado. No se puede agendar otro.";
    }

    // 2. Verificar disponibilidad en la fecha y hora solicitadas.
    const disponibilidad = await verificarYBuscarDisponibilidad(
      fecha,
      horaSolicitada,
      servicio
    );
    console.log('Disponibilidad:', disponibilidad);
    if (!disponibilidad.HorarioAprobado) {
      console.log('El horario solicitado no está disponible.');
      if (disponibilidad.DiasDisponibles) {
        return {
          Mensaje: "El horario solicitado no está disponible. Aquí están los próximos días y horarios disponibles:",
          DiasDisponibles: disponibilidad.DiasDisponibles
        };
      } 
    } else {
      console.log("Turno a punto de agendarse...");
      let devolucion = await agregarTurno(fecha, horaSolicitada, servicio, cliente, telefono);
      console.log('Devolución de agregarTurno:', devolucion);
      return devolucion;
    }
  } catch (error) {
    console.error('Ocurrió un error al agendar el turno:', error);
    throw error;
  }
};

export const agregarTurno = async (
  fecha,
  horaInicio,
  servicio,
  cliente,
  telefono
  ) => {
    try {
      const CREDENTIALS = {
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key:process.env.PRIVATE_KEY,
        client_email:process.env.CLIENT_EMAIL,
        client_id:process.env.CLIENT_ID,
        auth_uri:process.env.AUTH_URI,
        token_uri:process.env.TOKEN_URI,
        auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url:process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSITY_DOMAIN,
      };
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();

    // Cargar la duración del servicio desde 'Hoja 2'.
    let sheet = doc.sheetsByTitle["Hoja 2"];
    let rows = await sheet.getRows();
    let duracionServicio;
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const nombreServicio = row._rawData[0];
      if (nombreServicio === servicio) {
        duracionServicio = row._rawData[1];
        console.log('Duración del servicio obtenida:', duracionServicio);
        break;
      }
    }
    
    // Parsear la duración del servicio para obtener las horas y los minutos.
    const [horasServicio, minutosServicio] = duracionServicio.split(":").map(Number);

    // Calcular la 'Hora de finalización' basándose en la 'Hora de inicio' y la 'Duración'.
    const horaInicioMoment = moment(horaInicio, "HH:mm");

    const horaFinMoment = moment(horaInicioMoment)
      .add(horasServicio, "hours")
      .add(minutosServicio, "minutes");

    // Formatear la 'Hora de finalización' al formato correcto.
    const horaFinalizacion = horaFinMoment.format("HH:mm");
    console.log('Hora de finalización calculada:', horaFinalizacion);
    
    // Crear un nuevo objeto de turno con los datos proporcionados.
    let rowse = {
      Fecha: fecha,
      Inicio: horaInicio,
      Finalizacion: horaFinalizacion,
      Servicio: servicio,
      Cliente: cliente,
      Telefono: telefono,
    };
    
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    
    let sheets = doc.sheetsByTitle["Hoja 1"];
    
    console.log('Agregando turno:', rowse);

    await sheets.addRow(rowse);

    console.log('Turno agendado con éxito');
    
    return `¡Perfecto! ${cliente}, tu turno ya fue agendado. Iniciará a las ${horaInicio} y finalizará a las ${horaFinalizacion}. ¡Gracias por elegirnos! 😊👍`;
  } catch (error) {
    console.error('Ocurrió un error al agregar el turno:', error);
    throw error;
  }
};

export const consultarTurnosPorDiaYServicio = async (fecha, servicio) => {
  try {
    let turnos = {
      Fecha: [],
      Inicio: [],
      Finalizacion: [],
      Servicio: [],
      Cliente: [],
      Telefono: [],
      Duración: [], // Agregamos una nueva clave para almacenar la duración del servicio.
    };
    const CREDENTIALS = {
      type: "service_account",
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key:process.env.PRIVATE_KEY,
      client_email:process.env.CLIENT_EMAIL,
      client_id:process.env.CLIENT_ID,
      auth_uri:process.env.AUTH_URI,
      token_uri:process.env.TOKEN_URI,
      auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url:process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSITY_DOMAIN,
    };
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle["Hoja 1"];

    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const fechaColumna = row._rawData[0];
      const servicioColumna = row._rawData[3];
      if (fechaColumna === fecha && servicioColumna === servicio) {
        turnos["Fecha"].push(row._rawData[0]);
        turnos["Inicio"].push(row._rawData[1]);
        turnos["Finalizacion"].push(row._rawData[2]);
        turnos["Servicio"].push(row._rawData[3]);
        turnos["Cliente"].push(row._rawData[4]);
        turnos["Telefono"].push(row._rawData[5]);
      }
    }
    console.log('Turnos obtenidos:', turnos);

    // Ahora, vamos a cargar la información de duración desde 'Hoja 2'.
    sheet = doc.sheetsByTitle["Hoja 2"];
    rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const nombreServicio = row._rawData[0];
      const duracionServicio = row._rawData[1];
      if (nombreServicio === servicio) {
        turnos["Duración"] = duracionServicio;
        console.log('Duración del servicio obtenida:', duracionServicio);
        break; // Terminamos la búsqueda una vez que encontramos la duración.
      }
    }

    return turnos;
  } catch (error) {
    console.error('Ocurrió un error al consultar los turnos por día y servicio:', error);
    throw error;
  }
};

export const buscarTurnosDisponibles = async (fecha, servicio) => {
  try {
    // Obtenemos los turnos ya agendados para el día y servicio especificados.
    let turnosAgendados = await consultarTurnosPorDiaYServicio(fecha, servicio);

    // Definimos el horario laboral.
    let inicioJornada = 10 * 60; // 10:00 en minutos desde la medianoche.
    let finJornada = 20 * 60; // 20:00 en minutos desde la medianoche.

    // Convertimos los horarios de inicio y fin de los turnos agendados a minutos desde la medianoche.
    let turnosEnMinutos = turnosAgendados["Inicio"].map(horario => {
      let [hora, minuto] = horario.split(":");
      return parseInt(hora) * 60 + parseInt(minuto);
    });

    // Ordenamos los turnos en orden ascendente.
    turnosEnMinutos.sort((a, b) => a - b);

    // Inicializamos una lista para almacenar los horarios disponibles.
    let horariosDisponibles = [];

    // Recorremos cada intervalo de 30 minutos en el horario laboral.
    for (let i = inicioJornada; i < finJornada; i += 30) {
      // Verificamos si el horario actual se superpone con algún turno agendado.
      let superponeConTurnoAgendado = turnosEnMinutos.some(turno => {
        return i >= turno && i < turno + parseInt(turnosAgendados["Duración"]);
      });

      // Si el horario no se superpone con ningún turno agendado, lo añadimos a la lista de horarios disponibles.
      if (!superponeConTurnoAgendado) {
        let hora = Math.floor(i / 60);
        let minuto = i % 60;
        horariosDisponibles.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
      }
    }

    return horariosDisponibles;
  } catch (error) {
    console.error('Ocurrió un error al buscar los turnos disponibles:', error);
    throw error;
  }
};

export const verificarDisponibilidad = async (
  fecha,
  horaSolicitada,
  servicio
) => {
  try {
    // 1. Obtener todos los turnos para la fecha dada.
    const turnosPorDiaYServicio = await consultarTurnosPorDiaYServicio(
      fecha,
      servicio
    );
    console.log('Turnos por día y servicio obtenidos:', turnosPorDiaYServicio);

    // 2. Obtener la duración del servicio solicitado.
    const duracionServicio = moment.duration(turnosPorDiaYServicio["Duración"]);
    console.log('Duración del servicio:', duracionServicio);

    // 3. Verificar disponibilidad en la hora solicitada.
    // Calcula el intervalo de tiempo ocupado por el servicio solicitado.
    const horaInicioSolicitada = moment(horaSolicitada, "HH:mm");
    const horaFinSolicitada = moment(horaInicioSolicitada).add(duracionServicio);

    // Verifica si la hora de inicio del turno solicitado es antes de las 10:00.
    if (horaInicioSolicitada.isBefore(moment('10:00', 'HH:mm'))) {
      console.log('El turno solicitado es demasiado temprano. Los turnos pueden comenzar a las 10:00 como muy temprano.');
      return false;
    }

    // Verifica si la hora de finalización del turno solicitado excede el horario laboral.
    if (horaFinSolicitada.isAfter(moment('20:00', 'HH:mm'))) {
      console.log('El turno solicitado termina después del horario laboral. Los turnos deben terminar a las 20:00 como muy tarde.');
      return false;
    }

    // Comprueba si hay algún solapamiento con los turnos existentes.
    for (let i = 0; i < turnosPorDiaYServicio["Inicio"].length; i++) {
      const horaInicioTurno = moment(turnosPorDiaYServicio["Inicio"][i], "HH:mm");
      const horaFinTurno = moment(turnosPorDiaYServicio["Finalizacion"][i], "HH:mm");

      // Verifica si hay solapamiento de horarios.
      if (
        (horaInicioSolicitada.isSameOrAfter(horaInicioTurno) &&
          horaInicioSolicitada.isBefore(horaFinTurno)) ||
        (horaFinSolicitada.isAfter(horaInicioTurno) && 
          horaFinSolicitada.isSameOrBefore(horaFinTurno)) ||
        (horaInicioSolicitada.isBefore(horaInicioTurno) && 
          horaFinSolicitada.isAfter(horaFinTurno)) ||
        (horaInicioSolicitada.isSameOrAfter(horaInicioTurno) && 
          horaFinSolicitada.isAfter(horaFinTurno))
      ) {
        // Hay solapamiento, no está disponible.
        console.log('Solapamiento detectado con el turno existente:', i);
        return false;
      }
    }

    // No hay solapamiento, está disponible.
    console.log('No se detectó ningún solapamiento. El turno está disponible.');
    return true;
  } catch (error) {
    console.error('Ocurrió un error al verificar la disponibilidad:', error);
    throw error;
  }
};

export const buscarHorariosDisponibles = async (fecha, servicio) => {
  try {
    const turnosPorDiaYServicio = await consultarTurnosPorDiaYServicio(fecha, servicio);
    const duracionServicio = parseInt(turnosPorDiaYServicio["Duración"].split(":")[0]);
    let horariosDisponibles = [];
    let horaInicioJornada = moment('10:00', 'HH:mm');
    const horaFinJornada = moment('20:00', 'HH:mm');

    while (horaInicioJornada.isSameOrBefore(horaFinJornada)) {
      let disponible = true;
      const horaFinSolicitada = moment(horaInicioJornada).add(duracionServicio, 'hours');

      if (horaFinSolicitada.isAfter(horaFinJornada)) {
        break;
      }

      for (let i = 0; i < turnosPorDiaYServicio["Inicio"].length; i++) {
        const horaInicioTurno = moment(turnosPorDiaYServicio["Inicio"][i], 'HH:mm');
        const horaFinTurno = moment(turnosPorDiaYServicio["Finalizacion"][i], 'HH:mm');

        if ((horaInicioJornada.isSameOrAfter(horaInicioTurno) && horaInicioJornada.isBefore(horaFinTurno)) ||
            (horaFinSolicitada.isAfter(horaInicioTurno) && horaFinSolicitada.isSameOrBefore(horaFinTurno)) ||
            (horaInicioJornada.isBefore(horaInicioTurno) && horaFinSolicitada.isAfter(horaFinTurno))) {
          disponible = false;
          break;
        }
      }

      if (disponible) {
        horariosDisponibles.push(horaInicioJornada.format('HH:mm'));
      }

      // Incrementar la hora de inicio en incrementos de 30 minutos.
      horaInicioJornada.add(30, 'minutes');
    }

    return horariosDisponibles;
  } catch (error) {
    console.error('Ocurrió un error al buscar los horarios disponibles:', error);
    throw error;
  }
};

export const buscarProximoDiaYHorariosDisponibles = async (servicio, fechaInicio) => {
  try {
    // Convierte la fecha de inicio al formato de Moment.js.
    let fecha = moment(fechaInicio, 'DD/MM/YY').add(1, 'days');

    // Verifica la disponibilidad para los próximos 3 días.
    for (let i = 0; i < 3; i++) {
      // Verifica si el día es entre martes y sábado.
      if (fecha.day() >= 2 && fecha.day() <= 6) {
        // Busca los horarios disponibles para este día.
        const horariosDisponibles = await buscarHorariosDisponibles(fecha.format('DD/MM/YY'), servicio);
        
        if (horariosDisponibles.length > 0) {
          return {
            Fecha: fecha.format('DD/MM/YY'),
            Horarios: horariosDisponibles
          };
        }
      }

      // Avanza al siguiente día.
      fecha.add(1, 'days');
    }

    // Si no se encontró ningún día disponible en los próximos 3 días, devuelve un mensaje indicando esto.
    return {
      Mensaje: 'No se encontraron días disponibles en los próximos 3 días.'
    };
  } catch (error) {
    // Maneja cualquier error que pueda haber ocurrido.
    console.error(error);
    return {
      Mensaje: 'Ocurrió un error al buscar los próximos días y horarios disponibles.'
    };
  }
}


export const verificarYBuscarDisponibilidad = async (fecha, horaSolicitada, servicio) => {
  try {
    // Primero verifica la disponibilidad del horario solicitado.
    const horarioAprobado = await verificarDisponibilidad(fecha, horaSolicitada, servicio);
    console.log('Horario aprobado:', horarioAprobado);

    if (horarioAprobado) {
      // Si el horario solicitado está disponible, devuelve solo eso.
      return {
        HorarioAprobado: true,
        HorariosDisponibles: []
      };
    } else {
      // Si el horario solicitado no está disponible, busca el próximo día disponible y sus horarios.
      const proximoDiaYHorarios = await buscarProximoDiaYHorariosDisponibles(servicio,fecha);
      console.log('Próximo día y horarios disponibles:', proximoDiaYHorarios);

      if (proximoDiaYHorarios.Mensaje) {
        // Si no se encontró ningún día disponible en los próximos 7 días, devuelve un mensaje indicando esto.
        return {
          HorarioAprobado: false,
          Mensaje: proximoDiaYHorarios.Mensaje
        };
      }

      return {
        HorarioAprobado: false,
        DiasDisponibles: proximoDiaYHorarios
      };
    }
  } catch (error) {
    console.error('Ocurrió un error al verificar y buscar la disponibilidad:', error);
    throw error;
  }
};
export const cancelarTurnoPorPosicion = async(telefono, posicionTurno)=> {
  // Primero, obtén todos los turnos.
  let turnos = await consultarTurnos(telefono);
  let turnera= turnos.turnos
  // Luego, encuentra el turno que el usuario quiere cancelar.
  let turnoFecha = turnera.Fecha[posicionTurno-1];
  let turnoInicio = turnera.Inicio[posicionTurno-1];
  let turnoBorrado = {
    dia: turnera.Fecha[posicionTurno-1],
    horario: turnera.Inicio[posicionTurno-1],
    servicio: turnera.Servicio[posicionTurno-1],
    nombre: turnera.Cliente[posicionTurno-1],
    telefono: turnera.Telefono[posicionTurno-1]
  }

  const CREDENTIALS = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key:process.env.PRIVATE_KEY,
    client_email:process.env.CLIENT_EMAIL,
    client_id:process.env.CLIENT_ID,
    auth_uri:process.env.AUTH_URI,
    token_uri:process.env.TOKEN_URI,
    auth_provider_x509_cert_url:process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSITY_DOMAIN,
  };
  // A continuación, obtén la hoja de cálculo y autentícate.
  await doc.useServiceAccountAuth(CREDENTIALS);
  await doc.loadInfo();
  let sheet = doc.sheetsByTitle["Hoja 1"];

  // Obtén todas las filas de la hoja de cálculo.
  let rows = await sheet.getRows();

  // Busca la fila que corresponde al turno que el usuario quiere cancelar.
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row._rawData[0] === turnoFecha && row._rawData[1] === turnoInicio) {
      // Si encuentras la fila, elimínala.
      await row.delete();
      break;
    }
  }
  return turnoBorrado
}

export default {
  consultarTurnos,
  agendarTurno,
  agregarTurno,
  verificarDisponibilidad,
  consultarTurnosPorDiaYServicio,
  verificarYBuscarDisponibilidad,
  buscarHorariosDisponibles,
  buscarProximoDiaYHorariosDisponibles,
  cancelarTurnoPorPosicion
};  
