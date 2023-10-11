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
  await doc.useServiceAccountAuth(/* process.env. */ CREDENTIALS);
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
  return turnos;
};

export const agendarTurno = async (
  fecha,
  horaSolicitada,
  servicio,
  cliente,
  telefono
) => {
  // 1. Verificar si ya existe un turno con el mismo número de teléfono.
  const turnosExistentes = await consultarTurnos(telefono);
  if (turnosExistentes.length > 0) {
    return "Ya tienes un turno agendado. No se puede agendar otro.";
  } //aca hay un problema , el mismo registra todos los turnos , por ende si tiene un turno anterior y quiere crear otro no va a poder

  // 2. Verificar disponibilidad en la fecha y hora solicitadas.
  const disponibilidad = await verificarDisponibilidad(
    fecha,
    horaSolicitada,
    servicio
  );
  if (!disponibilidad) {
    return "El horario solicitado no está disponible, porfavor busca otro horario";
  }

  // 3. Agregar el nuevo turno a la hoja de cálculo.
  await agregarTurno(fecha, horaSolicitada, servicio, cliente, telefono);

  return "Turno agendado con éxito.";
};

export const agregarTurno = async (
  fecha,
  horaInicio,
  servicio,
  cliente,
  telefono
) => {
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
      break;
    }
  }
  // Parsear la duración del servicio para obtener las horas y los minutos.
  const [horasServicio, minutosServicio] = duracionServicio
    .split(":")
    .map(Number);

  // Calcular la 'Hora de finalización' basándose en la 'Hora de inicio' y la 'Duración'.
  const horaInicioMoment = moment(horaInicio, "HH:mm");

  const horaFinMoment = moment(horaInicioMoment)
    .add(horasServicio, "hours")
    .add(minutosServicio, "minutes");

  // Formatear la 'Hora de finalización' al formato correcto.
  const horaFinalizacion = horaFinMoment.format("HH:mm");
  console.log(horaFinalizacion);
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
  console.log(rowse);

  await sheets.addRow(rowse);
};

export const consultarTurnosPorDiaYServicio = async (fecha, servicio) => {
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

  // Ahora, vamos a cargar la información de duración desde 'Hoja 2'.
  sheet = doc.sheetsByTitle["Hoja 2"];
  rows = await sheet.getRows();
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const nombreServicio = row._rawData[0];
    const duracionServicio = row._rawData[1];
    if (nombreServicio === servicio) {
      turnos["Duración"] = duracionServicio;
      break; // Terminamos la búsqueda una vez que encontramos la duración.
    }
  }

  return turnos;
};

export const verificarDisponibilidad = async (
  fecha,
  horaSolicitada,
  servicio
) => {
  // 1. Obtener todos los turnos para la fecha dada.
  const turnosPorDiaYServicio = await consultarTurnosPorDiaYServicio(
    fecha,
    servicio
  );

  // 2. Obtener la duración del servicio solicitado.
  const duracionServicio = turnosPorDiaYServicio["Duración"];

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
      (horaFinSolicitada > horaInicioTurno && horaFinSolicitada <= horaFinTurno)
    ) {
      // Hay solapamiento, no está disponible.
      return false;
    }
  }

  // No hay solapamiento, está disponible.
  return true;
};

export default {
  consultarTurnos,
  agendarTurno,
  verificarDisponibilidad,
  consultarTurnosPorDiaYServicio,
};
