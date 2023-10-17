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
      project_id: "calendar-turnos-400220",
      private_key_id: "0b3dea17024160a280f1a7cee89ccca4686e4f22",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUhRTHyLORDs3u\nghO1F6K7ewDoZ7S18ZzcWvJGr5aR0KihyjAaMnbRNlX/5WLR7erSNx1ycWoNqY45\n+HKKQb1QQW3mvmjQ69SiL/nO7sox+wOg+eHbkHZtQyZVLQ9hP3bqUlIAkXIiJYKB\nUe7OIqA2WWJBRR0oK3a8aIZ3sJ537MvTznq40qGezHBcOUbpFwoCne7hZSzKKWT+\nHHonR0F5hVXg7On+Rd3foFtK2F7Dfgc4hpAmOC0fr4F0gq7RWl307oPK+DluKEBF\nAM8aBv0vk2+DKzqRwGwaBTVANBk5TPWBUUV+ObcAu4by6im02VBj6rf9jcELB29h\nBOl+iQ8dAgMBAAECggEAA2TUtnIHHAUI0sZ695kIK+BvdbD0/YvpLrOVpw0tWnlM\noZ9Q5D3V+YK19gUq60YRGZAVwYXeoxjrW98V5KkR3UlXysQyBwiWQ7fnTz5Uk58F\nXpo2XzDzyVIVo2ZGVZ5vrRbYv940rWXeuCP2qxQERemrqyY2+/WChATjI9sZ3ngH\nNuTJagoP2dyit9//WqKMK3atLNbMC0/aaDhBcGBF3GUb3gbngM8m2ITKYQCpkfX3\nP9PCSX2vDVrhNIO9nVFWn/iEWhOB/8wl3hhHeexlxzdPNLGZgSr2ZVn3ZcsRs3r2\nagEUVnVUv03sUVQ0MiFScl1GOsy8EWO3K6pQcvO1owKBgQDMVyJTVQPWWRCMkaYX\noq3cxf6Ycn/4qFOF8pfJGaVncz7NZk1WHtCYX4pYgMZczI8hcKi7ZXNWIDO29wah\nFV9gLg+7jCXrFt0bsEeU4lUHa2S8/BhYUN6i0Y7SlzUbpP5LIXQ/jubGsSEfSZU3\nIWL3ghUMCsCemeBZoBuKQXRofwKBgQC6EUE26qf8rGhuPK9p3LgzwMtCRe22TCo/\nGb735zcwmWWMwHNidRSIn5sDz1Jpl2Tx5hp6IoLF+CiGLWnEnbyXFpkp5PnskwjE\nhDLDJWBv1pfKARlxz3prfvv1hlrgQ4POJ++NWmASBp+Q9Eolq5tQwxz7fXrZiZyP\nRqbkmjhaYwKBgCN9BpMecropYbxoF0aHlFaBdIQZbqxK36alyUK914It+7xEhi3s\n0CGGhkp0ov6+8CTIoiVZqzxL/29JW7diNNxJY6YY4wT/RYtnhCcRX98YAbjot3mv\nIdt5NarRZAHXF+sIdl4LfX0Iik4aw3V9sOh3iRw8SdPBubsXGXFbiNIVAoGBAJGc\nJTPryRC0f3kdZozq3QArNSWlAdUyn7EH3em0+PzAXrcaeHGpfCs69B20JiNaBfZE\nA55m2X5BqLzwVyA17Ls0RSKC/Y7EtgzMA8mxu1lqTxkXaSkmm//5vQW0YfO1AjXY\nDODKw/n3UvImKsx2EjLOriSlWvlYdrutJ7godEdPAoGBAKLT/pqhlk96TUMoONhB\nIcrTQy1x4VVWZhx3MaVJKDhz6TvcmWBX6Fev0f5060PusKrKrVaCo4/mgWc20bit\niJ3NGdXKRxIoi54tdTOIf35UobN+bVfUVy1uRGN3PZEaFgTUIJVsKEdI8Pn07eQI\nNy3/BcKkTIJ4rWnMH5nWEjJl\n-----END PRIVATE KEY-----\n",
      client_email: "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
      client_id: "107884470593691798095",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
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
    console.log('Turnos consultados:', turnos);
    return turnos;
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
    const turnosExistentes = await consultarTurnos(telefono);
    console.log('Turnos existentes:', turnosExistentes);
    if (turnosExistentes.length > 0) {
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
      if (disponibilidad.DiasDisponibles && disponibilidad.DiasDisponibles.length > 0) {
        return {
          Mensaje: "El horario solicitado no está disponible. Aquí están los próximos días y horarios disponibles:",
          DiasDisponibles: disponibilidad.DiasDisponibles
        };
      } else {
        return "El horario solicitado no está disponible, por favor busca otro horario";
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
        project_id: "calendar-turnos-400220",
        private_key_id: "0b3dea17024160a280f1a7cee89ccca4686e4f22",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUhRTHyLORDs3u\nghO1F6K7ewDoZ7S18ZzcWvJGr5aR0KihyjAaMnbRNlX/5WLR7erSNx1ycWoNqY45\n+HKKQb1QQW3mvmjQ69SiL/nO7sox+wOg+eHbkHZtQyZVLQ9hP3bqUlIAkXIiJYKB\nUe7OIqA2WWJBRR0oK3a8aIZ3sJ537MvTznq40qGezHBcOUbpFwoCne7hZSzKKWT+\nHHonR0F5hVXg7On+Rd3foFtK2F7Dfgc4hpAmOC0fr4F0gq7RWl307oPK+DluKEBF\nAM8aBv0vk2+DKzqRwGwaBTVANBk5TPWBUUV+ObcAu4by6im02VBj6rf9jcELB29h\nBOl+iQ8dAgMBAAECggEAA2TUtnIHHAUI0sZ695kIK+BvdbD0/YvpLrOVpw0tWnlM\noZ9Q5D3V+YK19gUq60YRGZAVwYXeoxjrW98V5KkR3UlXysQyBwiWQ7fnTz5Uk58F\nXpo2XzDzyVIVo2ZGVZ5vrRbYv940rWXeuCP2qxQERemrqyY2+/WChATjI9sZ3ngH\nNuTJagoP2dyit9//WqKMK3atLNbMC0/aaDhBcGBF3GUb3gbngM8m2ITKYQCpkfX3\nP9PCSX2vDVrhNIO9nVFWn/iEWhOB/8wl3hhHeexlxzdPNLGZgSr2ZVn3ZcsRs3r2\nagEUVnVUv03sUVQ0MiFScl1GOsy8EWO3K6pQcvO1owKBgQDMVyJTVQPWWRCMkaYX\noq3cxf6Ycn/4qFOF8pfJGaVncz7NZk1WHtCYX4pYgMZczI8hcKi7ZXNWIDO29wah\nFV9gLg+7jCXrFt0bsEeU4lUHa2S8/BhYUN6i0Y7SlzUbpP5LIXQ/jubGsSEfSZU3\nIWL3ghUMCsCemeBZoBuKQXRofwKBgQC6EUE26qf8rGhuPK9p3LgzwMtCRe22TCo/\nGb735zcwmWWMwHNidRSIn5sDz1Jpl2Tx5hp6IoLF+CiGLWnEnbyXFpkp5PnskwjE\nhDLDJWBv1pfKARlxz3prfvv1hlrgQ4POJ++NWmASBp+Q9Eolq5tQwxz7fXrZiZyP\nRqbkmjhaYwKBgCN9BpMecropYbxoF0aHlFaBdIQZbqxK36alyUK914It+7xEhi3s\n0CGGhkp0ov6+8CTIoiVZqzxL/29JW7diNNxJY6YY4wT/RYtnhCcRX98YAbjot3mv\nIdt5NarRZAHXF+sIdl4LfX0Iik4aw3V9sOh3iRw8SdPBubsXGXFbiNIVAoGBAJGc\nJTPryRC0f3kdZozq3QArNSWlAdUyn7EH3em0+PzAXrcaeHGpfCs69B20JiNaBfZE\nA55m2X5BqLzwVyA17Ls0RSKC/Y7EtgzMA8mxu1lqTxkXaSkmm//5vQW0YfO1AjXY\nDODKw/n3UvImKsx2EjLOriSlWvlYdrutJ7godEdPAoGBAKLT/pqhlk96TUMoONhB\nIcrTQy1x4VVWZhx3MaVJKDhz6TvcmWBX6Fev0f5060PusKrKrVaCo4/mgWc20bit\niJ3NGdXKRxIoi54tdTOIf35UobN+bVfUVy1uRGN3PZEaFgTUIJVsKEdI8Pn07eQI\nNy3/BcKkTIJ4rWnMH5nWEjJl\n-----END PRIVATE KEY-----\n",
        client_email: "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
        client_id: "107884470593691798095",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
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
    
    return "turno agendado con exito";
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
      project_id: "calendar-turnos-400220",
      private_key_id: "0b3dea17024160a280f1a7cee89ccca4686e4f22",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUhRTHyLORDs3u\nghO1F6K7ewDoZ7S18ZzcWvJGr5aR0KihyjAaMnbRNlX/5WLR7erSNx1ycWoNqY45\n+HKKQb1QQW3mvmjQ69SiL/nO7sox+wOg+eHbkHZtQyZVLQ9hP3bqUlIAkXIiJYKB\nUe7OIqA2WWJBRR0oK3a8aIZ3sJ537MvTznq40qGezHBcOUbpFwoCne7hZSzKKWT+\nHHonR0F5hVXg7On+Rd3foFtK2F7Dfgc4hpAmOC0fr4F0gq7RWl307oPK+DluKEBF\nAM8aBv0vk2+DKzqRwGwaBTVANBk5TPWBUUV+ObcAu4by6im02VBj6rf9jcELB29h\nBOl+iQ8dAgMBAAECggEAA2TUtnIHHAUI0sZ695kIK+BvdbD0/YvpLrOVpw0tWnlM\noZ9Q5D3V+YK19gUq60YRGZAVwYXeoxjrW98V5KkR3UlXysQyBwiWQ7fnTz5Uk58F\nXpo2XzDzyVIVo2ZGVZ5vrRbYv940rWXeuCP2qxQERemrqyY2+/WChATjI9sZ3ngH\nNuTJagoP2dyit9//WqKMK3atLNbMC0/aaDhBcGBF3GUb3gbngM8m2ITKYQCpkfX3\nP9PCSX2vDVrhNIO9nVFWn/iEWhOB/8wl3hhHeexlxzdPNLGZgSr2ZVn3ZcsRs3r2\nagEUVnVUv03sUVQ0MiFScl1GOsy8EWO3K6pQcvO1owKBgQDMVyJTVQPWWRCMkaYX\noq3cxf6Ycn/4qFOF8pfJGaVncz7NZk1WHtCYX4pYgMZczI8hcKi7ZXNWIDO29wah\nFV9gLg+7jCXrFt0bsEeU4lUHa2S8/BhYUN6i0Y7SlzUbpP5LIXQ/jubGsSEfSZU3\nIWL3ghUMCsCemeBZoBuKQXRofwKBgQC6EUE26qf8rGhuPK9p3LgzwMtCRe22TCo/\nGb735zcwmWWMwHNidRSIn5sDz1Jpl2Tx5hp6IoLF+CiGLWnEnbyXFpkp5PnskwjE\nhDLDJWBv1pfKARlxz3prfvv1hlrgQ4POJ++NWmASBp+Q9Eolq5tQwxz7fXrZiZyP\nRqbkmjhaYwKBgCN9BpMecropYbxoF0aHlFaBdIQZbqxK36alyUK914It+7xEhi3s\n0CGGhkp0ov6+8CTIoiVZqzxL/29JW7diNNxJY6YY4wT/RYtnhCcRX98YAbjot3mv\nIdt5NarRZAHXF+sIdl4LfX0Iik4aw3V9sOh3iRw8SdPBubsXGXFbiNIVAoGBAJGc\nJTPryRC0f3kdZozq3QArNSWlAdUyn7EH3em0+PzAXrcaeHGpfCs69B20JiNaBfZE\nA55m2X5BqLzwVyA17Ls0RSKC/Y7EtgzMA8mxu1lqTxkXaSkmm//5vQW0YfO1AjXY\nDODKw/n3UvImKsx2EjLOriSlWvlYdrutJ7godEdPAoGBAKLT/pqhlk96TUMoONhB\nIcrTQy1x4VVWZhx3MaVJKDhz6TvcmWBX6Fev0f5060PusKrKrVaCo4/mgWc20bit\niJ3NGdXKRxIoi54tdTOIf35UobN+bVfUVy1uRGN3PZEaFgTUIJVsKEdI8Pn07eQI\nNy3/BcKkTIJ4rWnMH5nWEjJl\n-----END PRIVATE KEY-----\n",
      client_email: "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
      client_id: "107884470593691798095",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
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
    const duracionServicio = turnosPorDiaYServicio["Duración"];
    console.log('Duración del servicio:', duracionServicio);

    // 3. Verificar disponibilidad en la hora solicitada.
    // Calcula el intervalo de tiempo ocupado por el servicio solicitado.
    const horaInicioSolicitada = new Date(`01/01/2000 ${horaSolicitada}`);
    const horaFinSolicitada = new Date(horaInicioSolicitada);
    horaFinSolicitada.setHours(horaFinSolicitada.getHours() + duracionServicio);

    // Comprueba si hay algún solapamiento con los turnos existentes.
    for (let i = 0; i < turnosPorDiaYServicio["Inicio"].length; i++) {
      const horaInicioTurno = new Date(
        `01/01/2000 ${turnosPorDiaYServicio["Inicio"][i]}`
      );
      const horaFinTurno = new Date(
        `01/01/2000 ${turnosPorDiaYServicio["Finalizacion"][i]}`
      );

      // Verifica si hay solapamiento de horarios.
      if (
        (horaInicioSolicitada >= horaInicioTurno &&
          horaInicioSolicitada < horaFinTurno) ||
        (horaFinSolicitada > horaInicioTurno && 
          horaFinSolicitada <= horaFinTurno) ||
        (horaInicioSolicitada < horaInicioTurno && 
          horaFinSolicitada > horaFinTurno)
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
      // Si el horario solicitado no está disponible, busca los horarios disponibles.
      const horariosDisponibles = await buscarHorariosDisponibles(fecha, servicio);
      console.log('Horarios disponibles:', horariosDisponibles);

      if (horariosDisponibles.length === 0) {
        // Si no hay horarios disponibles, busca el próximo día disponible y sus horarios.
        const diasDisponibles = await buscarDiasDisponibles(servicio);
        console.log('Días disponibles:', diasDisponibles);

        return {
          HorarioAprobado: false,
          Mensaje: 'Lo siento, no encontramos disponibilidad para este día.',
          DiasDisponibles: diasDisponibles
        };
      }

      return {
        HorarioAprobado: false,
        HorariosDisponibles: horariosDisponibles
      };
    }
  } catch (error) {
    console.error('Ocurrió un error al verificar y buscar la disponibilidad:', error);
    throw error;
  }
};

export const buscarDiasDisponibles = async (servicio) => {
  try {
    const CREDENTIALS = {
      type: "service_account",
      project_id: "calendar-turnos-400220",
      private_key_id: "0b3dea17024160a280f1a7cee89ccca4686e4f22",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUhRTHyLORDs3u\nghO1F6K7ewDoZ7S18ZzcWvJGr5aR0KihyjAaMnbRNlX/5WLR7erSNx1ycWoNqY45\n+HKKQb1QQW3mvmjQ69SiL/nO7sox+wOg+eHbkHZtQyZVLQ9hP3bqUlIAkXIiJYKB\nUe7OIqA2WWJBRR0oK3a8aIZ3sJ537MvTznq40qGezHBcOUbpFwoCne7hZSzKKWT+\nHHonR0F5hVXg7On+Rd3foFtK2F7Dfgc4hpAmOC0fr4F0gq7RWl307oPK+DluKEBF\nAM8aBv0vk2+DKzqRwGwaBTVANBk5TPWBUUV+ObcAu4by6im02VBj6rf9jcELB29h\nBOl+iQ8dAgMBAAECggEAA2TUtnIHHAUI0sZ695kIK+BvdbD0/YvpLrOVpw0tWnlM\noZ9Q5D3V+YK19gUq60YRGZAVwYXeoxjrW98V5KkR3UlXysQyBwiWQ7fnTz5Uk58F\nXpo2XzDzyVIVo2ZGVZ5vrRbYv940rWXeuCP2qxQERemrqyY2+/WChATjI9sZ3ngH\nNuTJagoP2dyit9//WqKMK3atLNbMC0/aaDhBcGBF3GUb3gbngM8m2ITKYQCpkfX3\nP9PCSX2vDVrhNIO9nVFWn/iEWhOB/8wl3hhHeexlxzdPNLGZgSr2ZVn3ZcsRs3r2\nagEUVnVUv03sUVQ0MiFScl1GOsy8EWO3K6pQcvO1owKBgQDMVyJTVQPWWRCMkaYX\noq3cxf6Ycn/4qFOF8pfJGaVncz7NZk1WHtCYX4pYgMZczI8hcKi7ZXNWIDO29wah\nFV9gLg+7jCXrFt0bsEeU4lUHa2S8/BhYUN6i0Y7SlzUbpP5LIXQ/jubGsSEfSZU3\nIWL3ghUMCsCemeBZoBuKQXRofwKBgQC6EUE26qf8rGhuPK9p3LgzwMtCRe22TCo/\nGb735zcwmWWMwHNidRSIn5sDz1Jpl2Tx5hp6IoLF+CiGLWnEnbyXFpkp5PnskwjE\nhDLDJWBv1pfKARlxz3prfvv1hlrgQ4POJ++NWmASBp+Q9Eolq5tQwxz7fXrZiZyP\nRqbkmjhaYwKBgCN9BpMecropYbxoF0aHlFaBdIQZbqxK36alyUK914It+7xEhi3s\n0CGGhkp0ov6+8CTIoiVZqzxL/29JW7diNNxJY6YY4wT/RYtnhCcRX98YAbjot3mv\nIdt5NarRZAHXF+sIdl4LfX0Iik4aw3V9sOh3iRw8SdPBubsXGXFbiNIVAoGBAJGc\nJTPryRC0f3kdZozq3QArNSWlAdUyn7EH3em0+PzAXrcaeHGpfCs69B20JiNaBfZE\nA55m2X5BqLzwVyA17Ls0RSKC/Y7EtgzMA8mxu1lqTxkXaSkmm//5vQW0YfO1AjXY\nDODKw/n3UvImKsx2EjLOriSlWvlYdrutJ7godEdPAoGBAKLT/pqhlk96TUMoONhB\nIcrTQy1x4VVWZhx3MaVJKDhz6TvcmWBX6Fev0f5060PusKrKrVaCo4/mgWc20bit\niJ3NGdXKRxIoi54tdTOIf35UobN+bVfUVy1uRGN3PZEaFgTUIJVsKEdI8Pn07eQI\nNy3/BcKkTIJ4rWnMH5nWEjJl\n-----END PRIVATE KEY-----\n",
      client_email: "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
      client_id: "107884470593691798095",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };
    // Carga la hoja 1.
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle["Hoja 1"];
    let rows = await sheet.getRows();

    // Crea un conjunto para almacenar las fechas de los turnos ocupados.
    let fechasOcupadas = new Set();

    // Itera sobre las filas para obtener las fechas de los turnos ocupados.
    for (let row of rows) {
      if (row._rawData[3] === servicio) { // Asume que el servicio está en la cuarta columna (índice 3).
        fechasOcupadas.add(row._rawData[0]); // Asume que la fecha está en la primera columna (índice 0).
      }
    }

    // Obtén la fecha actual.
    const hoy = new Date();

    // Crea un array para almacenar los días disponibles.
    let diasDisponibles = [];

    // Verifica la disponibilidad para los próximos 7 días.
    for (let i = 1; i < 7; i++) {
      // Calcula la fecha del día que estás verificando.
      let fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);

      // Verifica si el día es entre martes y sábado.
      if (fecha.getDay() >= 2 && fecha.getDay() <= 6) {
        // Formatea la fecha al formato que tu función necesita (por ejemplo, 'DD/MM/YY').
        let fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear().toString().substr(-2)}`;

        // Si esta fecha no está en el conjunto de fechas ocupadas, entonces está disponible.
        if (!fechasOcupadas.has(fechaFormateada)) {
          // Busca los horarios disponibles para este día.
          const horariosDisponibles = await buscarHorariosDisponibles(fechaFormateada, servicio);
          
          if (horariosDisponibles.length > 0) {
            diasDisponibles.push({
              Fecha: fechaFormateada,
              Horarios: horariosDisponibles
            });
          }
        }
      }
      
      // Si ya encontraste un día disponible, no necesitas buscar más.
      if (diasDisponibles.length > 0) {
        break;
      }
    }

    console.log('Días disponibles:', diasDisponibles);
    return diasDisponibles;
  } catch (error) {
    console.error('Ocurrió un error al buscar los días disponibles:', error);
    throw error;
  }
};

export const buscarHorariosDisponibles = async (fecha, servicio) => {
  try {
    // 1. Obtener todos los turnos para la fecha dada.
    const turnosPorDiaYServicio = await consultarTurnosPorDiaYServicio(fecha, servicio);

    // 2. Obtener la duración del servicio solicitado.
    const duracionServicio = turnosPorDiaYServicio["Duración"];

    // 3. Crear una lista de horarios disponibles.
    let horariosDisponibles = [];

    // 4. Definir el horario de trabajo
    let horaInicioJornada = new Date(`01/01/2000 10:00`);
    const horaFinJornada = new Date(`01/01/2000 20:00`);

    while (horaInicioJornada <= horaFinJornada) {
      let disponible = true;
      const horaFinSolicitada = new Date(horaInicioJornada);
      horaFinSolicitada.setHours(horaFinSolicitada.getHours() + duracionServicio);

      if (horaFinSolicitada > horaFinJornada) {
        break;
      }

      for (let i = 0; i < turnosPorDiaYServicio["Inicio"].length; i++) {
        const horaInicioTurno = new Date(`01/01/2000 ${turnosPorDiaYServicio["Inicio"][i]}`);
        const horaFinTurno = new Date(`01/01/2000 ${turnosPorDiaYServicio["Finalizacion"][i]}`);

        if ((horaInicioJornada >= horaInicioTurno && horaInicioJornada < horaFinTurno) ||
            (horaFinSolicitada > horaInicioTurno && horaFinSolicitada <= horaFinTurno)) {
          disponible = false;
          break;
        }
      }

      if (disponible) {
        horariosDisponibles.push(horaInicioJornada.toTimeString().substring(0,5));
      }

      // Incrementar la hora de inicio en incrementos de 'duracionServicio'.
      horaInicioJornada.setHours(horaInicioJornada.getHours() + duracionServicio);
    }

    console.log('Horarios disponibles:', horariosDisponibles);
    return horariosDisponibles;
  } catch (error) {
    console.error('Ocurrió un error al buscar los horarios disponibles:', error);
    throw error;
  }
};



export default {
  consultarTurnos,
  agendarTurno,
  agregarTurno,
  verificarDisponibilidad,
  consultarTurnosPorDiaYServicio,
  verificarYBuscarDisponibilidad,
  buscarHorariosDisponibles,
  buscarDiasDisponibles,
};  
