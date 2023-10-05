import  { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';


const serviceAccountAuth = new JWT({
email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ,
key: process.env.GOOGLE_PRIVATE_KEY,
scopes: ['https://www.googleapis.com/auth/spreadsheets',
]});
const doc = new GoogleSpreadsheet('1MFSLDq62rA7gHQtIuDAcFwm5R91yyKrECLelh7mPWnc', serviceAccountAuth) 

// Función para formatear la fecha en "dd/mm/yyyy"
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  // Función para formatear la hora en "hh:mm"
  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  const checkAvailability = async(dateStr, startTimeStr, service)=> {
    try {
      console.log("primer parametro:",dateStr)
      console.log("segundo parametro:",startTimeStr)
      console.log("tercer parametro:",service)
      const date = new Date(dateStr);
      const startTime = new Date(`1970-01-01T${startTimeStr}`);

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
      await doc.loadInfo();
  
      // Primera hoja del sheet
      let sheet = doc.sheetsByTitle['Hoja 1']
/*       console.log(sheet) */
      // Carga todas las celdas de la hoja
      /* const pedro= */await sheet.loadCells();
/*       console.log(pedro) */
    
      // Obtiene la hoja 2 para obtener la duración de los servicios
      let sheet2 = doc.sheetsByTitle['Hoja 2']
      await sheet2.loadCells();
  
      // Itera a través de las filas y verifica la disponibilidad
      const availableSlots = [];
  
      for (let i = 1; i < sheet.rowCount; i++) {
        const dateCell = sheet.getCell(i, 0); // Columna de Fecha
        const startTimeCell = sheet.getCell(i, 1); // Columna de Hora de inicio
        const serviceCell = sheet.getCell(i, 3); // Columna de Servicio
        const clientCell = sheet.getCell(i, 4); // Columna de Cliente
  
        const cellDate = new Date(dateCell.value);
        console.log(cellDate)
        const cellStartTime = new Date(`1970-01-01T${startTimeCell.value}`);
        const serviceValue = serviceCell.value;
  
        if (
          cellDate.toDateString() === date.toDateString() &&
          cellStartTime.toTimeString() === startTime.toTimeString() &&
          serviceValue === service &&
          !clientCell.value
        ) {
          // Encuentra la duración del servicio en la hoja 2
          const durationCell = sheet2.getCell(sheet2.cellStats.nonEmpty, 0); // Suponiendo que la duración esté en la primera columna de la hoja 2
          const duration = parseFloat(durationCell.value); // Convierte la duración a un número
  
          // Calcula el horario de finalización
          const endTime = new Date(date.getTime() + duration * 60 * 60 * 1000);
  
          availableSlots.push({ startTime: date, endTime });
        }
      }
      console.log(availableSlots)
      return availableSlots; 
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  

/*    checkAvailability(dateStr, startTimeStr, service)
    .then((availableSlots) => {
      console.log('Turnos disponibles:');
      availableSlots.forEach((slot) => {
        console.log(
          `Inicio: ${formatDate(slot.startTime)} ${formatTime(slot.startTime)}, Fin: ${formatDate(slot.endTime)} ${formatTime(slot.endTime)}`
        );
      });
    })
    .catch((error) => {
      console.error('Error al verificar la disponibilidad:', error);
    }); */
 
  // Función para guardar el turno (en caso de disponibilidad)
   const saveAppointment = async(dateStr, startTimeStr, service, cliente)=> {
    try {
      const date = new Date(dateStr);
      const startTime = new Date(`1970-01-01T${startTimeStr}`);
  
      const doc = new GoogleSpreadsheet(doc);
      await doc.useServiceAccountAuth(serviceAccountAuth);
      await doc.loadInfo();
  
      // Supongamos que tu hoja se llama "Turnos"
      const sheet = doc.sheetsByTitle['Turnos'];
  
      // Carga todas las celdas de la hoja
      await sheet.loadCells();
  
      // Itera a través de las filas y verifica la disponibilidad
      for (let i = 1; i < sheet.rowCount; i++) {
        const dateCell = sheet.getCell(i, 0); // Columna de Fecha
        const startTimeCell = sheet.getCell(i, 1); // Columna de Hora de inicio
        const serviceCell = sheet.getCell(i, 3); // Columna de Servicio
        const clientCell = sheet.getCell(i, 4); // Columna de Cliente
  
        const cellDate = new Date(dateCell.value);
        const cellStartTime = new Date(`1970-01-01T${startTimeCell.value}`);
        const serviceValue = serviceCell.value;
  
        if (
          cellDate.toDateString() === date.toDateString() &&
          cellStartTime.toTimeString() === startTime.toTimeString() &&
          serviceValue === service &&
          !clientCell.value
        ) {
          // El horario está disponible, registra el turno
          await sheet.addRow({
            fecha: formatDate(date),
            horaInicio: formatTime(startTime),
            servicio: service,
            cliente: cliente,
          });
          return true; // Éxito al registrar el turno
        }
      }
  
      return false; // El horario no está disponible
    } catch (error) {
      console.error('Error al registrar el turno:', error);
      return false; // Error al registrar el turno
    }
  }
  
  /* saveAppointment(dateStr, startTimeStr, service, cliente)
    .then((result) => {
      if (result) {
        console.log(`Turno registrado para ${cliente}`);
      } else {
        console.log(`El horario no está disponible para ${cliente}`);
      }
    })
    .catch((error) => {
      console.error('Error al registrar el turno:', error);
    });
    */
 
    export default checkAvailability