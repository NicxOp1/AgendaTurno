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
  "17Z4N0Njas3Py95x2Y4SPCh94WBH5h6tQUPsyx2_3lts",
  serviceAccountAuth
);

export const getBarberosDisponibles = async (diaMoment) => {
  try {
    let dia = moment(diaMoment, 'DD/MM/YY');
    let barberosDisponibles = [];
    const CREDENTIALS ={
      "type": "service_account",
      "project_id": "calendar-turnos-400220",
      "private_key_id": "bd34687a0a364a900d0c7a275c19bf79914d0e75",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEe9+CZgDNv4j4\nsHgdnszTuS6HT+9F6f3bQUB/Qi+q1zswlsCNNdiJq/xte0w1VNfnHRFlBfy79CTO\ntm0w2ny5cuT0RmxXOeACKnY80jiwb/FDlBV5YIzeUiCn2B1zoB6hTevVSC/+df4z\ntyCLWEw+Ggrux48s7Fudlda1sq+kp+kyEr3C8Pa4dAJn4j/0QMGhPSSdMb3eQSzF\nC+ymn0oA6ntPFPEwez63sMeZlEcrIAtQCVgJjn5u9T6/58dr1snk9F73qbnAwgAP\nCe7SRjJzgt+neat/KWtX5pxkCvgpeUsOC5rZFgbFzjYnly1B3wdVT3x/VMmFv0yX\nS5/h98TjAgMBAAECggEADgNwYqpSwVnj839mjw+YjTsxEdkwzWbjF6RU7MlJgWDz\naZjpknNg28TRQ/UIxOmlsmfqKdneTNYcr++ROcGY0ViGnX4jqP70NpiqW9Z50OpS\n+0kQVQVUAWE7JK1vFaQ5uwhwha2DMB4LQMtSqLg7S9dAqLIWnejHn1AkraCDvXWq\nUg1HnjffENx5IiWHAob24u5551xsxVHjVJSU+7RSzET/uMrmyDBCndf3pON8N0bU\n8wL53JE0rapBbjmH03k6Xn+RE+vUWluHLiDNAOg4Y/9MaRB16iaxP0xKeI9/6drr\nFwgjUZTz437SfOmKVxFLCP4O5ZqdDxFRKPmprtQDEQKBgQDpDBMwzqXvxGxo0AYx\n9wkIBT7kZUQXk3B1/XCQ4eYZpNtv5UZCD9d5j+WQ9rOKgsUjy1fYSpUWrxrO8fg5\nauv5XhmIQ2Kx0vJ4zEJpnbrsiNIPeTTd0/2g8zxrF7D54ES53SuiPJUVgZ3aYZO+\nbzWajDJSykDC+PXEgJzJTXqqcQKBgQDX1elCZ4vQBnwYHMjZeMA24+mcpniOG37F\nafcxlJ6LKWY6dle9XyWxc31AEH2+wtMALEp8OFtwC3438zxUP9NkIFSfbwbooJVl\n44cdH5d6vSFzciTWb0jHNUA8cVmFIq85wTcuTz8AhbxpxbzuZHyG4r2iJRbyYo7T\nK5GejT1GkwKBgHvDAd4FoHH4qmnvL5sRSiaMQp4geUzb6/l9Im6OyRgNSMvfwrQK\nna/dD1kw6qBAWllr/7bJxOtLCr2kGuLDOZYwtvZ6cstk74ffUdWtAjvjXUsCX2T+\n087J3egxqLbKtzTNlAKQkcveDeqPr1qOzLTKh18YMdRZSouUka8GCoLBAoGAUq69\npxSnuM9jJpGQV88sQ1rYGYykTjw2OkY3ziSS/9iiMu82+XLDq9EEQFCQ+00DK+PL\nvP6R+MBOX/ysNdIllwvTnygXS3KJCPk6v2tkyj493E3z0rna9YVu0DjUBG6fFc7w\n5qqxBfA1l4eKswCHu9yMrNrsiXo8IKVmKYkN2kUCgYA0wc3E3LfS365TY/nfqb4W\n5YnwJKRlF1/r64Cx8Qk1udv7LwYlt27DbeeMAJRDk/vu4q3CFwnaeissJ5adc1Jz\n54wm+sSsy9xIAQ6vH5+apasEs3HlM8kk/OQ15yih7vjcjApaJE+xkV+ly5Y5TkRo\nXDV9seAvU9vYc8XeOJG4bg==\n-----END PRIVATE KEY-----\n",
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
    let sheet = doc.sheetsByTitle["Hoja 3"];  // Asume que 'Hoja 3' es la hoja de los barberos.
    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      let diasDeTrabajo = row._rawData[1].toLowerCase().split('-');

      if (diasDeTrabajo.length === 2) {
        // Si hay un guión, asumimos que es un rango de días.
        let inicioSemana = moment().day(diasDeTrabajo[0]);  // Inicio del rango.
        let finSemana = moment().day(diasDeTrabajo[1]);  // Fin del rango.

        if (inicioSemana.isSameOrBefore(dia) && finSemana.isSameOrAfter(dia)) {
          // Si el día está dentro del rango, añadimos el barbero a la lista de disponibles.
          barberosDisponibles.push(row._rawData[0]);
        }
      } else {
        // Si no hay un guión, asumimos que son días individuales.
        let diasIndividuales = row._rawData[1].toLowerCase().split(',');

        if (diasIndividuales.includes(dia.format('dddd').toLowerCase())) {
          // Si el día está en la lista, añadimos el barbero a la lista de disponibles.
          barberosDisponibles.push(row._rawData[0]);
        }
      }
    }

    console.log('Barberos disponibles:', barberosDisponibles);
    return barberosDisponibles;
  } catch (error) {
    console.error('Ocurrió un error al consultar los barberos:', error);
    throw error;
  }
};

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
    const CREDENTIALS ={
      "type": "service_account",
      "project_id": "calendar-turnos-400220",
      "private_key_id": "bd34687a0a364a900d0c7a275c19bf79914d0e75",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEe9+CZgDNv4j4\nsHgdnszTuS6HT+9F6f3bQUB/Qi+q1zswlsCNNdiJq/xte0w1VNfnHRFlBfy79CTO\ntm0w2ny5cuT0RmxXOeACKnY80jiwb/FDlBV5YIzeUiCn2B1zoB6hTevVSC/+df4z\ntyCLWEw+Ggrux48s7Fudlda1sq+kp+kyEr3C8Pa4dAJn4j/0QMGhPSSdMb3eQSzF\nC+ymn0oA6ntPFPEwez63sMeZlEcrIAtQCVgJjn5u9T6/58dr1snk9F73qbnAwgAP\nCe7SRjJzgt+neat/KWtX5pxkCvgpeUsOC5rZFgbFzjYnly1B3wdVT3x/VMmFv0yX\nS5/h98TjAgMBAAECggEADgNwYqpSwVnj839mjw+YjTsxEdkwzWbjF6RU7MlJgWDz\naZjpknNg28TRQ/UIxOmlsmfqKdneTNYcr++ROcGY0ViGnX4jqP70NpiqW9Z50OpS\n+0kQVQVUAWE7JK1vFaQ5uwhwha2DMB4LQMtSqLg7S9dAqLIWnejHn1AkraCDvXWq\nUg1HnjffENx5IiWHAob24u5551xsxVHjVJSU+7RSzET/uMrmyDBCndf3pON8N0bU\n8wL53JE0rapBbjmH03k6Xn+RE+vUWluHLiDNAOg4Y/9MaRB16iaxP0xKeI9/6drr\nFwgjUZTz437SfOmKVxFLCP4O5ZqdDxFRKPmprtQDEQKBgQDpDBMwzqXvxGxo0AYx\n9wkIBT7kZUQXk3B1/XCQ4eYZpNtv5UZCD9d5j+WQ9rOKgsUjy1fYSpUWrxrO8fg5\nauv5XhmIQ2Kx0vJ4zEJpnbrsiNIPeTTd0/2g8zxrF7D54ES53SuiPJUVgZ3aYZO+\nbzWajDJSykDC+PXEgJzJTXqqcQKBgQDX1elCZ4vQBnwYHMjZeMA24+mcpniOG37F\nafcxlJ6LKWY6dle9XyWxc31AEH2+wtMALEp8OFtwC3438zxUP9NkIFSfbwbooJVl\n44cdH5d6vSFzciTWb0jHNUA8cVmFIq85wTcuTz8AhbxpxbzuZHyG4r2iJRbyYo7T\nK5GejT1GkwKBgHvDAd4FoHH4qmnvL5sRSiaMQp4geUzb6/l9Im6OyRgNSMvfwrQK\nna/dD1kw6qBAWllr/7bJxOtLCr2kGuLDOZYwtvZ6cstk74ffUdWtAjvjXUsCX2T+\n087J3egxqLbKtzTNlAKQkcveDeqPr1qOzLTKh18YMdRZSouUka8GCoLBAoGAUq69\npxSnuM9jJpGQV88sQ1rYGYykTjw2OkY3ziSS/9iiMu82+XLDq9EEQFCQ+00DK+PL\nvP6R+MBOX/ysNdIllwvTnygXS3KJCPk6v2tkyj493E3z0rna9YVu0DjUBG6fFc7w\n5qqxBfA1l4eKswCHu9yMrNrsiXo8IKVmKYkN2kUCgYA0wc3E3LfS365TY/nfqb4W\n5YnwJKRlF1/r64Cx8Qk1udv7LwYlt27DbeeMAJRDk/vu4q3CFwnaeissJ5adc1Jz\n54wm+sSsy9xIAQ6vH5+apasEs3HlM8kk/OQ15yih7vjcjApaJE+xkV+ly5Y5TkRo\nXDV9seAvU9vYc8XeOJG4bg==\n-----END PRIVATE KEY-----\n",
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
  telefono,
  barbero
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
      servicio,
      barbero
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
      let devolucion = await agregarTurno(fecha, horaSolicitada, servicio, cliente, telefono,barbero);
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
  telefono,
  barbero
  ) => {
    try {
      const CREDENTIALS ={
        "type": "service_account",
        "project_id": "calendar-turnos-400220",
        "private_key_id": "bd34687a0a364a900d0c7a275c19bf79914d0e75",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEe9+CZgDNv4j4\nsHgdnszTuS6HT+9F6f3bQUB/Qi+q1zswlsCNNdiJq/xte0w1VNfnHRFlBfy79CTO\ntm0w2ny5cuT0RmxXOeACKnY80jiwb/FDlBV5YIzeUiCn2B1zoB6hTevVSC/+df4z\ntyCLWEw+Ggrux48s7Fudlda1sq+kp+kyEr3C8Pa4dAJn4j/0QMGhPSSdMb3eQSzF\nC+ymn0oA6ntPFPEwez63sMeZlEcrIAtQCVgJjn5u9T6/58dr1snk9F73qbnAwgAP\nCe7SRjJzgt+neat/KWtX5pxkCvgpeUsOC5rZFgbFzjYnly1B3wdVT3x/VMmFv0yX\nS5/h98TjAgMBAAECggEADgNwYqpSwVnj839mjw+YjTsxEdkwzWbjF6RU7MlJgWDz\naZjpknNg28TRQ/UIxOmlsmfqKdneTNYcr++ROcGY0ViGnX4jqP70NpiqW9Z50OpS\n+0kQVQVUAWE7JK1vFaQ5uwhwha2DMB4LQMtSqLg7S9dAqLIWnejHn1AkraCDvXWq\nUg1HnjffENx5IiWHAob24u5551xsxVHjVJSU+7RSzET/uMrmyDBCndf3pON8N0bU\n8wL53JE0rapBbjmH03k6Xn+RE+vUWluHLiDNAOg4Y/9MaRB16iaxP0xKeI9/6drr\nFwgjUZTz437SfOmKVxFLCP4O5ZqdDxFRKPmprtQDEQKBgQDpDBMwzqXvxGxo0AYx\n9wkIBT7kZUQXk3B1/XCQ4eYZpNtv5UZCD9d5j+WQ9rOKgsUjy1fYSpUWrxrO8fg5\nauv5XhmIQ2Kx0vJ4zEJpnbrsiNIPeTTd0/2g8zxrF7D54ES53SuiPJUVgZ3aYZO+\nbzWajDJSykDC+PXEgJzJTXqqcQKBgQDX1elCZ4vQBnwYHMjZeMA24+mcpniOG37F\nafcxlJ6LKWY6dle9XyWxc31AEH2+wtMALEp8OFtwC3438zxUP9NkIFSfbwbooJVl\n44cdH5d6vSFzciTWb0jHNUA8cVmFIq85wTcuTz8AhbxpxbzuZHyG4r2iJRbyYo7T\nK5GejT1GkwKBgHvDAd4FoHH4qmnvL5sRSiaMQp4geUzb6/l9Im6OyRgNSMvfwrQK\nna/dD1kw6qBAWllr/7bJxOtLCr2kGuLDOZYwtvZ6cstk74ffUdWtAjvjXUsCX2T+\n087J3egxqLbKtzTNlAKQkcveDeqPr1qOzLTKh18YMdRZSouUka8GCoLBAoGAUq69\npxSnuM9jJpGQV88sQ1rYGYykTjw2OkY3ziSS/9iiMu82+XLDq9EEQFCQ+00DK+PL\nvP6R+MBOX/ysNdIllwvTnygXS3KJCPk6v2tkyj493E3z0rna9YVu0DjUBG6fFc7w\n5qqxBfA1l4eKswCHu9yMrNrsiXo8IKVmKYkN2kUCgYA0wc3E3LfS365TY/nfqb4W\n5YnwJKRlF1/r64Cx8Qk1udv7LwYlt27DbeeMAJRDk/vu4q3CFwnaeissJ5adc1Jz\n54wm+sSsy9xIAQ6vH5+apasEs3HlM8kk/OQ15yih7vjcjApaJE+xkV+ly5Y5TkRo\nXDV9seAvU9vYc8XeOJG4bg==\n-----END PRIVATE KEY-----\n",
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
      Barbero: barbero
    };
    
    await doc.useServiceAccountAuth(CREDENTIALS);
    await doc.loadInfo();
    
    let sheets = doc.sheetsByTitle["Hoja 1"];
    
    console.log('Agregando turno:', rowse);

    await sheets.addRow(rowse);

    console.log('Turno agendado con éxito');
    
    return `¡Perfecto! ${cliente}, tu turno ya fue agendado. Con el barbero ${barbero} , iniciará a las ${horaInicio} y finalizará a las ${horaFinalizacion}. ¡Gracias por elegirnos! 😊👍`;
  } catch (error) {
    console.error('Ocurrió un error al agregar el turno:', error);
    throw error;
  }
};

export const consultarTurnosPorDiaYServicio = async (fecha, servicio, barbero) => {
  try {
    let turnos = {
      Fecha: [],
      Inicio: [],
      Finalizacion: [],
      Servicio: [],
      Cliente: [],
      Telefono: [],
      Barbero: [], 
      HorarioLaboralBarbero: "",
      DiasLaboralesBarbero: "", 
    };
    const CREDENTIALS ={
      "type": "service_account",
      "project_id": "calendar-turnos-400220",
      "private_key_id": "bd34687a0a364a900d0c7a275c19bf79914d0e75",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEe9+CZgDNv4j4\nsHgdnszTuS6HT+9F6f3bQUB/Qi+q1zswlsCNNdiJq/xte0w1VNfnHRFlBfy79CTO\ntm0w2ny5cuT0RmxXOeACKnY80jiwb/FDlBV5YIzeUiCn2B1zoB6hTevVSC/+df4z\ntyCLWEw+Ggrux48s7Fudlda1sq+kp+kyEr3C8Pa4dAJn4j/0QMGhPSSdMb3eQSzF\nC+ymn0oA6ntPFPEwez63sMeZlEcrIAtQCVgJjn5u9T6/58dr1snk9F73qbnAwgAP\nCe7SRjJzgt+neat/KWtX5pxkCvgpeUsOC5rZFgbFzjYnly1B3wdVT3x/VMmFv0yX\nS5/h98TjAgMBAAECggEADgNwYqpSwVnj839mjw+YjTsxEdkwzWbjF6RU7MlJgWDz\naZjpknNg28TRQ/UIxOmlsmfqKdneTNYcr++ROcGY0ViGnX4jqP70NpiqW9Z50OpS\n+0kQVQVUAWE7JK1vFaQ5uwhwha2DMB4LQMtSqLg7S9dAqLIWnejHn1AkraCDvXWq\nUg1HnjffENx5IiWHAob24u5551xsxVHjVJSU+7RSzET/uMrmyDBCndf3pON8N0bU\n8wL53JE0rapBbjmH03k6Xn+RE+vUWluHLiDNAOg4Y/9MaRB16iaxP0xKeI9/6drr\nFwgjUZTz437SfOmKVxFLCP4O5ZqdDxFRKPmprtQDEQKBgQDpDBMwzqXvxGxo0AYx\n9wkIBT7kZUQXk3B1/XCQ4eYZpNtv5UZCD9d5j+WQ9rOKgsUjy1fYSpUWrxrO8fg5\nauv5XhmIQ2Kx0vJ4zEJpnbrsiNIPeTTd0/2g8zxrF7D54ES53SuiPJUVgZ3aYZO+\nbzWajDJSykDC+PXEgJzJTXqqcQKBgQDX1elCZ4vQBnwYHMjZeMA24+mcpniOG37F\nafcxlJ6LKWY6dle9XyWxc31AEH2+wtMALEp8OFtwC3438zxUP9NkIFSfbwbooJVl\n44cdH5d6vSFzciTWb0jHNUA8cVmFIq85wTcuTz8AhbxpxbzuZHyG4r2iJRbyYo7T\nK5GejT1GkwKBgHvDAd4FoHH4qmnvL5sRSiaMQp4geUzb6/l9Im6OyRgNSMvfwrQK\nna/dD1kw6qBAWllr/7bJxOtLCr2kGuLDOZYwtvZ6cstk74ffUdWtAjvjXUsCX2T+\n087J3egxqLbKtzTNlAKQkcveDeqPr1qOzLTKh18YMdRZSouUka8GCoLBAoGAUq69\npxSnuM9jJpGQV88sQ1rYGYykTjw2OkY3ziSS/9iiMu82+XLDq9EEQFCQ+00DK+PL\nvP6R+MBOX/ysNdIllwvTnygXS3KJCPk6v2tkyj493E3z0rna9YVu0DjUBG6fFc7w\n5qqxBfA1l4eKswCHu9yMrNrsiXo8IKVmKYkN2kUCgYA0wc3E3LfS365TY/nfqb4W\n5YnwJKRlF1/r64Cx8Qk1udv7LwYlt27DbeeMAJRDk/vu4q3CFwnaeissJ5adc1Jz\n54wm+sSsy9xIAQ6vH5+apasEs3HlM8kk/OQ15yih7vjcjApaJE+xkV+ly5Y5TkRo\nXDV9seAvU9vYc8XeOJG4bg==\n-----END PRIVATE KEY-----\n",
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
    let sheet = doc.sheetsByTitle["Hoja 1"];

    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const fechaColumna = row._rawData[0];
      const servicioColumna = row._rawData[3];
      const barberoColumna = row._rawData[6]; 
      if (fechaColumna === fecha && servicioColumna === servicio && barberoColumna === barbero) {
        turnos["Fecha"].push(row._rawData[0]);
        turnos["Inicio"].push(row._rawData[1]);
        turnos["Finalizacion"].push(row._rawData[2]);
        turnos["Servicio"].push(row._rawData[3]);
        turnos["Cliente"].push(row._rawData[4]);
        turnos["Telefono"].push(row._rawData[5]);
        turnos["Barbero"].push(row._rawData[6]);
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

    // Ahora, vamos a cargar la información del horario laboral del barbero desde 'Hoja 3'.
    sheet = doc.sheetsByTitle["Hoja 3"];
    rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const nombreBarbero = row._rawData[0];
      const diasDeTrabajo = row._rawData[1];
      const horarioLaboral = row._rawData[2];
      if (nombreBarbero === barbero) {
        turnos["DiasLaboralesBarbero"]= diasDeTrabajo;
        turnos["HorarioLaboralBarbero"] = horarioLaboral; // Agregado aquí
        break; // Terminamos la búsqueda una vez que encontramos el horario laboral.
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
  servicio,
  barbero
) => {
  try {
    // 1. Obtener todos los turnos para la fecha dada.
    const turnosPorDiaYServicio = await consultarTurnosPorDiaYServicio(
      fecha,
      servicio,
      barbero
    );
    console.log('Turnos por día y servicio obtenidos:', turnosPorDiaYServicio);

    // 2. Obtener la duración del servicio solicitado.
    const duracionServicio = moment.duration(turnosPorDiaYServicio["Duración"]);
    console.log('Duración del servicio:', duracionServicio);

    // 3. Extraer el horario de inicio y fin del horario laboral del barbero.
    const [inicioLaboral, finLaboral] = turnosPorDiaYServicio["HorarioLaboralBarbero"].split('/');

    // 4. Verificar disponibilidad en la hora solicitada.
    // Calcula el intervalo de tiempo ocupado por el servicio solicitado.
    const horaInicioSolicitada = moment(horaSolicitada, "HH:mm");
    const horaFinSolicitada = moment(horaInicioSolicitada).add(duracionServicio);

    // Verifica si la hora de inicio del turno solicitado es antes del inicio del horario laboral.
    if (horaInicioSolicitada.isBefore(moment(inicioLaboral, 'HH:mm'))) {
      console.log('El turno solicitado es demasiado temprano. Los turnos pueden comenzar a las ' + inicioLaboral + ' como muy temprano.');
      return false;
    }

    // Verifica si la hora de finalización del turno solicitado excede el horario laboral.
    if (horaFinSolicitada.isAfter(moment(finLaboral, 'HH:mm'))) {
      console.log('El turno solicitado termina después del horario laboral. Los turnos deben terminar a las ' + finLaboral + ' como muy tarde.');
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

async function obtenerDiasDeTrabajo(barbero) {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  let diasLaborables = [];
  const CREDENTIALS = {
    "type": "service_account",
    "project_id": "calendar-turnos-400220",
    "private_key_id": "bd34687a0a364a900d0c7a275c19bf79914d0e75",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEe9+CZgDNv4j4\nsHgdnszTuS6HT+9F6f3bQUB/Qi+q1zswlsCNNdiJq/xte0w1VNfnHRFlBfy79CTO\ntm0w2ny5cuT0RmxXOeACKnY80jiwb/FDlBV5YIzeUiCn2B1zoB6hTevVSC/+df4z\ntyCLWEw+Ggrux48s7Fudlda1sq+kp+kyEr3C8Pa4dAJn4j/0QMGhPSSdMb3eQSzF\nC+ymn0oA6ntPFPEwez63sMeZlEcrIAtQCVgJjn5u9T6/58dr1snk9F73qbnAwgAP\nCe7SRjJzgt+neat/KWtX5pxkCvgpeUsOC5rZFgbFzjYnly1B3wdVT3x/VMmFv0yX\nS5/h98TjAgMBAAECggEADgNwYqpSwVnj839mjw+YjTsxEdkwzWbjF6RU7MlJgWDz\naZjpknNg28TRQ/UIxOmlsmfqKdneTNYcr++ROcGY0ViGnX4jqP70NpiqW9Z50OpS\n+0kQVQVUAWE7JK1vFaQ5uwhwha2DMB4LQMtSqLg7S9dAqLIWnejHn1AkraCDvXWq\nUg1HnjffENx5IiWHAob24u5551xsxVHjVJSU+7RSzET/uMrmyDBCndf3pON8N0bU\n8wL53JE0rapBbjmH03k6Xn+RE+vUWluHLiDNAOg4Y/9MaRB16iaxP0xKeI9/6drr\nFwgjUZTz437SfOmKVxFLCP4O5ZqdDxFRKPmprtQDEQKBgQDpDBMwzqXvxGxo0AYx\n9wkIBT7kZUQXk3B1/XCQ4eYZpNtv5UZCD9d5j+WQ9rOKgsUjy1fYSpUWrxrO8fg5\nauv5XhmIQ2Kx0vJ4zEJpnbrsiNIPeTTd0/2g8zxrF7D54ES53SuiPJUVgZ3aYZO+\nbzWajDJSykDC+PXEgJzJTXqqcQKBgQDX1elCZ4vQBnwYHMjZeMA24+mcpniOG37F\nafcxlJ6LKWY6dle9XyWxc31AEH2+wtMALEp8OFtwC3438zxUP9NkIFSfbwbooJVl\n44cdH5d6vSFzciTWb0jHNUA8cVmFIq85wTcuTz8AhbxpxbzuZHyG4r2iJRbyYo7T\nK5GejT1GkwKBgHvDAd4FoHH4qmnvL5sRSiaMQp4geUzb6/l9Im6OyRgNSMvfwrQK\nna/dD1kw6qBAWllr/7bJxOtLCr2kGuLDOZYwtvZ6cstk74ffUdWtAjvjXUsCX2T+\n087J3egxqLbKtzTNlAKQkcveDeqPr1qOzLTKh18YMdRZSouUka8GCoLBAoGAUq69\npxSnuM9jJpGQV88sQ1rYGYykTjw2OkY3ziSS/9iiMu82+XLDq9EEQFCQ+00DK+PL\nvP6R+MBOX/ysNdIllwvTnygXS3KJCPk6v2tkyj493E3z0rna9YVu0DjUBG6fFc7w\n5qqxBfA1l4eKswCHu9yMrNrsiXo8IKVmKYkN2kUCgYA0wc3E3LfS365TY/nfqb4W\n5YnwJKRlF1/r64Cx8Qk1udv7LwYlt27DbeeMAJRDk/vu4q3CFwnaeissJ5adc1Jz\n54wm+sSsy9xIAQ6vH5+apasEs3HlM8kk/OQ15yih7vjcjApaJE+xkV+ly5Y5TkRo\nXDV9seAvU9vYc8XeOJG4bg==\n-----END PRIVATE KEY-----\n",
    "client_email": "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
    "client_id": "107884470593691798095",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
  // Autenticación y carga de información.
  await doc.useServiceAccountAuth(CREDENTIALS);
  await doc.loadInfo();

  // Acceso a la "Hoja 3".
  let sheet = doc.sheetsByTitle["Hoja 3"];

  // Obtención de todas las filas.
  let rows = await sheet.getRows();

  // Búsqueda del barbero en las filas.
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    const nombreBarbero = row._rawData[0];

    if (nombreBarbero === barbero) {
      // Si se encuentra el barbero, se procesan sus días de trabajo.
      const diasDeTrabajo = row._rawData[1];

      // Divide los días de trabajo por comas y guiones.
      const partes = diasDeTrabajo.split(/,|-/);

      partes.forEach(parte => {
        parte = parte.trim(); // Elimina los espacios en blanco al principio y al final.

        if (parte.includes('-')) {
          // Si la parte incluye un guión, es un rango de días.
          const [inicio, fin] = parte.split('-');
          const indiceInicio = dias.indexOf(inicio);
          const indiceFin = dias.indexOf(fin);

          // Añade todos los días en el rango al array de días laborables.
          for (let i = indiceInicio; i <= indiceFin; i++) {
            diasLaborables.push(i);
          }
        } else {
          // Si la parte no incluye un guión, es un solo día.
          const indice = dias.indexOf(parte);
          diasLaborables.push(indice);
        }
      });

      break; // Termina la búsqueda una vez que se encuentran los días de trabajo del barbero.
    }
  }

  return diasLaborables;
}

export const buscarProximoDiaYHorariosDisponibles = async (servicio, fechaInicio, barbero) => { // Agregado aquí
  try {
    // Convierte la fecha de inicio al formato de Moment.js.
    let fecha = moment(fechaInicio, 'DD/MM/YY');

    // Obtiene los días de trabajo del barbero.
    const diasDeTrabajo = await obtenerDiasDeTrabajo(barbero); // Asegúrate de implementar esta función

    // Verifica la disponibilidad para el día actual y el siguiente.
    for (let i = 0; i < 2; i++) { // Modificado aquí
      // Verifica si el día es un día de trabajo para el barbero.
      if (diasDeTrabajo.includes(fecha.day())) { // Modificado aquí
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

    // Si no se encontró ningún día disponible en los próximos 2 días, devuelve un mensaje indicando esto.
    return {
      Mensaje: 'No se encontraron días disponibles en los próximos 2 días.'
    };
  } catch (error) {
    // Maneja cualquier error que pueda haber ocurrido.
    console.error(error);
    return {
      Mensaje: 'Ocurrió un error al buscar los próximos días y horarios disponibles.'
    };
  }
}



export const verificarYBuscarDisponibilidad = async (fecha, horaSolicitada, servicio, barbero) => {
  try {
    // Primero verifica la disponibilidad del horario solicitado.
    const horarioAprobado = await verificarDisponibilidad(fecha, horaSolicitada, servicio, barbero);
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

  const CREDENTIALS ={
    "type": "service_account",
    "project_id": "calendar-turnos-400220",
    "private_key_id": "bd34687a0a364a900d0c7a275c19bf79914d0e75",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDEe9+CZgDNv4j4\nsHgdnszTuS6HT+9F6f3bQUB/Qi+q1zswlsCNNdiJq/xte0w1VNfnHRFlBfy79CTO\ntm0w2ny5cuT0RmxXOeACKnY80jiwb/FDlBV5YIzeUiCn2B1zoB6hTevVSC/+df4z\ntyCLWEw+Ggrux48s7Fudlda1sq+kp+kyEr3C8Pa4dAJn4j/0QMGhPSSdMb3eQSzF\nC+ymn0oA6ntPFPEwez63sMeZlEcrIAtQCVgJjn5u9T6/58dr1snk9F73qbnAwgAP\nCe7SRjJzgt+neat/KWtX5pxkCvgpeUsOC5rZFgbFzjYnly1B3wdVT3x/VMmFv0yX\nS5/h98TjAgMBAAECggEADgNwYqpSwVnj839mjw+YjTsxEdkwzWbjF6RU7MlJgWDz\naZjpknNg28TRQ/UIxOmlsmfqKdneTNYcr++ROcGY0ViGnX4jqP70NpiqW9Z50OpS\n+0kQVQVUAWE7JK1vFaQ5uwhwha2DMB4LQMtSqLg7S9dAqLIWnejHn1AkraCDvXWq\nUg1HnjffENx5IiWHAob24u5551xsxVHjVJSU+7RSzET/uMrmyDBCndf3pON8N0bU\n8wL53JE0rapBbjmH03k6Xn+RE+vUWluHLiDNAOg4Y/9MaRB16iaxP0xKeI9/6drr\nFwgjUZTz437SfOmKVxFLCP4O5ZqdDxFRKPmprtQDEQKBgQDpDBMwzqXvxGxo0AYx\n9wkIBT7kZUQXk3B1/XCQ4eYZpNtv5UZCD9d5j+WQ9rOKgsUjy1fYSpUWrxrO8fg5\nauv5XhmIQ2Kx0vJ4zEJpnbrsiNIPeTTd0/2g8zxrF7D54ES53SuiPJUVgZ3aYZO+\nbzWajDJSykDC+PXEgJzJTXqqcQKBgQDX1elCZ4vQBnwYHMjZeMA24+mcpniOG37F\nafcxlJ6LKWY6dle9XyWxc31AEH2+wtMALEp8OFtwC3438zxUP9NkIFSfbwbooJVl\n44cdH5d6vSFzciTWb0jHNUA8cVmFIq85wTcuTz8AhbxpxbzuZHyG4r2iJRbyYo7T\nK5GejT1GkwKBgHvDAd4FoHH4qmnvL5sRSiaMQp4geUzb6/l9Im6OyRgNSMvfwrQK\nna/dD1kw6qBAWllr/7bJxOtLCr2kGuLDOZYwtvZ6cstk74ffUdWtAjvjXUsCX2T+\n087J3egxqLbKtzTNlAKQkcveDeqPr1qOzLTKh18YMdRZSouUka8GCoLBAoGAUq69\npxSnuM9jJpGQV88sQ1rYGYykTjw2OkY3ziSS/9iiMu82+XLDq9EEQFCQ+00DK+PL\nvP6R+MBOX/ysNdIllwvTnygXS3KJCPk6v2tkyj493E3z0rna9YVu0DjUBG6fFc7w\n5qqxBfA1l4eKswCHu9yMrNrsiXo8IKVmKYkN2kUCgYA0wc3E3LfS365TY/nfqb4W\n5YnwJKRlF1/r64Cx8Qk1udv7LwYlt27DbeeMAJRDk/vu4q3CFwnaeissJ5adc1Jz\n54wm+sSsy9xIAQ6vH5+apasEs3HlM8kk/OQ15yih7vjcjApaJE+xkV+ly5Y5TkRo\nXDV9seAvU9vYc8XeOJG4bg==\n-----END PRIVATE KEY-----\n",
    "client_email": "agendaturno@calendar-turnos-400220.iam.gserviceaccount.com",
    "client_id": "107884470593691798095",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/agendaturno%40calendar-turnos-400220.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }    
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
