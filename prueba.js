const { GoogleSpreadsheet } = require('google-spreadsheet');

// Inicializa el documento de Google Sheets (debes configurar las credenciales)
const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');

// Función para consultar los turnos para un número de teléfono
const consultarTurnos= async(Fecha)=> {
    let turnos = {
      'Fecha': [],
      'Hora de inicio': [],
      'Hora de finalización': [],
      'Servicio': [],
      'Cliente': [],
      'Telefono': [],
    };
    const CREDENTIALS={
      "type": "service_account",
      "project_id": "calendar-turnos-400220",
      "private_key_id": "0b3dea17024160a280f1a7cee89ccca4686e4f22",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUhRTHyLORDs3u\nghO1F6K7ewDoZ7S18ZzcWvJGr5aR0KihyjAaMnbRNlX/5WLR7erSNx1ycWoNqY45\n+HKKQb1QQW3mvmjQ69SiL/nO7sox+wOg+eHbkHZtQyZVLQ9hP3bqUlIAkXIiJYKB\nUe7OIqA2WWJBRR0oK3a8aIZ3sJ537MvTznq40qGezHBcOUbpFwoCne7hZSzKKWT+\nHHonR0F5hVXg7On+Rd3foFtK2F7Dfgc4hpAmOC0fr4F0gq7RWl307oPK+DluKEBF\nAM8aBv0vk2+DKzqRwGwaBTVANBk5TPWBUUV+ObcAu4by6im02VBj6rf9jcELB29h\nBOl+iQ8dAgMBAAECggEAA2TUtnIHHAUI0sZ695kIK+BvdbD0/YvpLrOVpw0tWnlM\noZ9Q5D3V+YK19gUq60YRGZAVwYXeoxjrW98V5KkR3UlXysQyBwiWQ7fnTz5Uk58F\nXpo2XzDzyVIVo2ZGVZ5vrRbYv940rWXeuCP2qxQERemrqyY2+/WChATjI9sZ3ngH\nNuTJagoP2dyit9//WqKMK3atLNbMC0/aaDhBcGBF3GUb3gbngM8m2ITKYQCpkfX3\nP9PCSX2vDVrhNIO9nVFWn/iEWhOB/8wl3hhHeexlxzdPNLGZgSr2ZVn3ZcsRs3r2\nagEUVnVUv03sUVQ0MiFScl1GOsy8EWO3K6pQcvO1owKBgQDMVyJTVQPWWRCMkaYX\noq3cxf6Ycn/4qFOF8pfJGaVncz7NZk1WHtCYX4pYgMZczI8hcKi7ZXNWIDO29wah\nFV9gLg+7jCXrFt0bsEeU4lUHa2S8/BhYUN6i0Y7SlzUbpP5LIXQ/jubGsSEfSZU3\nIWL3ghUMCsCemeBZoBuKQXRofwKBgQC6EUE26qf8rGhuPK9p3LgzwMtCRe22TCo/\nGb735zcwmWWMwHNidRSIn5sDz1Jpl2Tx5hp6IoLF+CiGLWnEnbyXFpkp5PnskwjE\nhDLDJWBv1pfKARlxz3prfvv1hlrgQ4POJ++NWmASBp+Q9Eolq5tQwxz7fXrZiZyP\nRqbkmjhaYwKBgCN9BpMecropYbxoF0aHlFaBdIQZbqxK36alyUK914It+7xEhi3s\n0CGGhkp0ov6+8CTIoiVZqzxL/29JW7diNNxJY6YY4wT/RYtnhCcRX98YAbjot3mv\nIdt5NarRZAHXF+sIdl4LfX0Iik4aw3V9sOh3iRw8SdPBubsXGXFbiNIVAoGBAJGc\nJTPryRC0f3kdZozq3QArNSWlAdUyn7EH3em0+PzAXrcaeHGpfCs69B20JiNaBfZE\nA55m2X5BqLzwVyA17Ls0RSKC/Y7EtgzMA8mxu1lqTxkXaSkmm//5vQW0YfO1AjXY\nDODKw/n3UvImKsx2EjLOriSlWvlYdrutJ7godEdPAoGBAKLT/pqhlk96TUMoONhB\nIcrTQy1x4VVWZhx3MaVJKDhz6TvcmWBX6Fev0f5060PusKrKrVaCo4/mgWc20bit\niJ3NGdXKRxIoi54tdTOIf35UobN+bVfUVy1uRGN3PZEaFgTUIJVsKEdI8Pn07eQI\nNy3/BcKkTIJ4rWnMH5nWEjJl\n-----END PRIVATE KEY-----\n",
      "client_email": "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
      "client_id": "107884470593691798095",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo(); // Asumiendo que 'doc' está definido y representa la hoja de cálculo.
    let sheet = doc.sheetsByTitle['Hoja 1'];
  
    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if (row._rawData[5] === Fecha) { // Suponiendo que el teléfono está en la sexta columna (índice 5).
        turnos['Fecha'].push(row._rawData[0]);
        turnos['Hora de inicio'].push(row._rawData[1]);
        turnos['Hora de finalización'].push(row._rawData[2]);
        turnos['Servicio'].push(row._rawData[3]);
        turnos['Cliente'].push(row._rawData[4]);
        turnos['Telefono'].push(row._rawData[5]);
      }
    }
    return turnos;
  }

// Función para consultar la disponibilidad de un turno
const verificarDisponibilidad = async(fecha, horaSolicitada, servicio)=> {
    // 1. Obtener todos los turnos para la fecha dada.
    const turnosPorDiaYServicio = await consultarTurnos(fecha);
  
    // 2. Obtener la duración del servicio solicitado.
    const duracionServicio = await obtenerDuracionServicio(servicio);
  
    // 3. Verificar disponibilidad en la hora solicitada.
    // Calcula el intervalo de tiempo ocupado por el servicio solicitado.
    const horaInicioSolicitada = new Date(`01/01/2000 ${horaSolicitada}`);
    const horaFinSolicitada = new Date(horaInicioSolicitada);
    horaFinSolicitada.setHours(horaFinSolicitada.getHours() + duracionServicio);
  
    // Comprueba si hay algún solapamiento con los turnos existentes.
    for (let i = 0; i < turnosPorDiaYServicio['Hora de inicio'].length; i++) {
      const horaInicioTurno = new Date(`01/01/2000 ${turnosPorDiaYServicio['Hora de inicio'][i]}`);
      const horaFinTurno = new Date(`01/01/2000 ${turnosPorDiaYServicio['Hora de finalización'][i]}`);
  
      // Verifica si hay solapamiento de horarios.
      if (
        (horaInicioSolicitada >= horaInicioTurno && horaInicioSolicitada < horaFinTurno) ||
        (horaFinSolicitada > horaInicioTurno && horaFinSolicitada <= horaFinTurno)
      ) {
        // Hay solapamiento, no está disponible.
        return false;
      }
    }
  
    // No hay solapamiento, está disponible.
    return true;
  }
  

// Función para obtener la duración de un servicio
const obtenerDuracionServicio= async(servicio)=> {
    let duracionServicio = {
      'Servicio': [],
      'Duracion': [],
    };
    const CREDENTIALS={
      "type": "service_account",
      "project_id": "calendar-turnos-400220",
      "private_key_id": "0b3dea17024160a280f1a7cee89ccca4686e4f22",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCUhRTHyLORDs3u\nghO1F6K7ewDoZ7S18ZzcWvJGr5aR0KihyjAaMnbRNlX/5WLR7erSNx1ycWoNqY45\n+HKKQb1QQW3mvmjQ69SiL/nO7sox+wOg+eHbkHZtQyZVLQ9hP3bqUlIAkXIiJYKB\nUe7OIqA2WWJBRR0oK3a8aIZ3sJ537MvTznq40qGezHBcOUbpFwoCne7hZSzKKWT+\nHHonR0F5hVXg7On+Rd3foFtK2F7Dfgc4hpAmOC0fr4F0gq7RWl307oPK+DluKEBF\nAM8aBv0vk2+DKzqRwGwaBTVANBk5TPWBUUV+ObcAu4by6im02VBj6rf9jcELB29h\nBOl+iQ8dAgMBAAECggEAA2TUtnIHHAUI0sZ695kIK+BvdbD0/YvpLrOVpw0tWnlM\noZ9Q5D3V+YK19gUq60YRGZAVwYXeoxjrW98V5KkR3UlXysQyBwiWQ7fnTz5Uk58F\nXpo2XzDzyVIVo2ZGVZ5vrRbYv940rWXeuCP2qxQERemrqyY2+/WChATjI9sZ3ngH\nNuTJagoP2dyit9//WqKMK3atLNbMC0/aaDhBcGBF3GUb3gbngM8m2ITKYQCpkfX3\nP9PCSX2vDVrhNIO9nVFWn/iEWhOB/8wl3hhHeexlxzdPNLGZgSr2ZVn3ZcsRs3r2\nagEUVnVUv03sUVQ0MiFScl1GOsy8EWO3K6pQcvO1owKBgQDMVyJTVQPWWRCMkaYX\noq3cxf6Ycn/4qFOF8pfJGaVncz7NZk1WHtCYX4pYgMZczI8hcKi7ZXNWIDO29wah\nFV9gLg+7jCXrFt0bsEeU4lUHa2S8/BhYUN6i0Y7SlzUbpP5LIXQ/jubGsSEfSZU3\nIWL3ghUMCsCemeBZoBuKQXRofwKBgQC6EUE26qf8rGhuPK9p3LgzwMtCRe22TCo/\nGb735zcwmWWMwHNidRSIn5sDz1Jpl2Tx5hp6IoLF+CiGLWnEnbyXFpkp5PnskwjE\nhDLDJWBv1pfKARlxz3prfvv1hlrgQ4POJ++NWmASBp+Q9Eolq5tQwxz7fXrZiZyP\nRqbkmjhaYwKBgCN9BpMecropYbxoF0aHlFaBdIQZbqxK36alyUK914It+7xEhi3s\n0CGGhkp0ov6+8CTIoiVZqzxL/29JW7diNNxJY6YY4wT/RYtnhCcRX98YAbjot3mv\nIdt5NarRZAHXF+sIdl4LfX0Iik4aw3V9sOh3iRw8SdPBubsXGXFbiNIVAoGBAJGc\nJTPryRC0f3kdZozq3QArNSWlAdUyn7EH3em0+PzAXrcaeHGpfCs69B20JiNaBfZE\nA55m2X5BqLzwVyA17Ls0RSKC/Y7EtgzMA8mxu1lqTxkXaSkmm//5vQW0YfO1AjXY\nDODKw/n3UvImKsx2EjLOriSlWvlYdrutJ7godEdPAoGBAKLT/pqhlk96TUMoONhB\nIcrTQy1x4VVWZhx3MaVJKDhz6TvcmWBX6Fev0f5060PusKrKrVaCo4/mgWc20bit\niJ3NGdXKRxIoi54tdTOIf35UobN+bVfUVy1uRGN3PZEaFgTUIJVsKEdI8Pn07eQI\nNy3/BcKkTIJ4rWnMH5nWEjJl\n-----END PRIVATE KEY-----\n",
      "client_email": "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
      "client_id": "107884470593691798095",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo(); // Asumiendo que 'doc' está definido y representa la hoja de cálculo.
    let sheet = doc.sheetsByTitle['Hoja 2'];
  
    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if (row._rawData[0] === servicio) { // Suponiendo que el teléfono está en la sexta columna (índice 5).
        duracionServicio['Servicio'].push(row._rawData[0]);
        duracionServicio['Duracion'].push(row._rawData[1]);
      }
    }
    return duracionServicio.Duracion;
}













// Función para agendar un turno
const agendarTurno=async(fecha, horaSolicitada, servicio, telefono,nombre)=> {
  // Verificar si ya hay un turno con el mismo número de teléfono
  const turnosExistente = await consultarTurnos(telefono);
  if (turnosExistente.length > 0) {
    return 'Ya tienes un turno agendado.';
  }

  // Verificar disponibilidad en la hora solicitada
  const disponibilidad = await verificarDisponibilidad(fecha, horaSolicitada, servicio);
  if (!disponibilidad) {
    return 'El horario solicitado no está disponible.';
  }

  // Obtener la duración del servicio
  const duracionServicio = await obtenerDuracionServicio(servicio);

  // Calcular la hora de finalización del turno
  const horaInicio = new Date(`01/01/2000 ${horaSolicitada}`);
  const horaFin = new Date(horaInicio);
  horaFin.setHours(horaFin.getHours() + duracionServicio);

  // Agregar el nuevo turno a tus datos
  const turnoNuevo = {
    Fecha: fecha,
    'Hora de inicio': horaSolicitada,
    'Hora de finalización': horaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    Servicio: servicio,
    Cliente: nombre, // Puedes llenar este campo con el nombre del cliente si lo tienes
    Telefono: telefono,
  };
  return 'Turno agendado con éxito.';
}

// Ejemplo de uso
/* const fechaBuscada = '4/10/23'; // Fecha en formato DD/MM/YY
const servicioBuscado = 'Esculpidas'; // Nombre del servicio a buscar
const horaSolicitada = '13:00'; // Hora solicitada
const telefonoCliente = '5491140314482'; // Número de teléfono del cliente

(async () => {
  await doc.useServiceAccountAuth(CREDENTIALS);
  await doc.loadInfo(); // Asumiendo que 'doc' está definido y representa la hoja de cálculo.

  const resultado = await agendarTurno(fechaBuscada, horaSolicitada, servicioBuscado, telefonoCliente);
  console.log(resultado);
})();
 */