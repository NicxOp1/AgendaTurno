import bot from "@bot-whatsapp/bot";
import { consultarTurnos,agendarTurno} from "../services/sheets/index.js";

function esHorarioValido(horario) {
  // Dividir la hora y los minutos
  var partes = horario.split(':');
  var hora = parseInt(partes[0]);
  var minutos = parseInt(partes[1]);

  // Verificar si la hora está entre 10 y 18
  if (hora < 10 || hora > 18) {
      return false;
  }

  // Verificar si los minutos son 00 o 30
  if (minutos !== 0 && minutos !== 30) {
      return false;
  }

  // Verificar si la hora es 18 y los minutos son más de 30
  if (hora === 18 && minutos > 30) {
      return false;
  }

  // Si pasó todas las verificaciones, el horario es válido
  return true;
}



const flowAgendar = bot
  .addKeyword("bot")
  .addAnswer(
    "¿Cual es tu nombre?",
    { capture: true },
    async (ctx, { flowDynamic, state }) => {
      await state.update({ nombre: ctx.body });
      flowDynamic();
    }
  )
  .addAnswer(
    "Dime el horario que te gustaria el turno",
    { capture: true },
    async (ctx, { state, flowDynamic,fallBack }) => {
      if (esHorarioValido(ctx.body)) {
        await state.update({ horario: ctx.body });
        await state.update({ telefono: ctx.from });
        const myState = state.getMyState();
        console.log(myState.horario);
        const agendar = await agendarTurno(
          myState.dia,
          myState.horario,
          myState.servicio,
          myState.nombre,
          myState.telefono
        );
        flowDynamic(agendar)
      } else {
        flowDynamic('Lo siento , escribiste mal el horario, recorda que solo aceptamos turnos de 10:00 a 18:30',
                    "Solo pueden intervalos de 30'",fallBack)}
      }
    
  );
export default flowAgendar;

/* 

const getMenu = await googelSheet.retriveDayMenu(dayNumber);
      for (const menu of getMenu) {
        GLOBAL_STATE.push(menu);
        await flowDynamic(menu);




  async function consultarDatos(telefono){
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle['Hoja 1'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA
   
   
   
    consultados = [];




    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.Telefono === telefono) {
           
            consultados['Sexo'] = row.Sexo                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:
            consultados['Nombre'] = row.Nombre        
            consultados['Apellidos'] = row.Apellidos                  // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
            consultados['Telefono'] = row.Telefono
            consultados['Edad'] = row.Edad




        }
           
}
           
return consultados




};
 */

/* ESTO VA DE EJEMPLO



*/
/* 
const fechaSolicitada = '04/10/23'; // Fecha en formato DD/MM/YY
const horaSolicitada = '13:00'; // Hora solicitada
const servicioSolicitado = 'Esculpidas'; // Nombre del servicio
const numeroTelefono = '5491140314482'; // Número de teléfono

const resultado = await agendarTurno(fechaSolicitada, horaSolicitada, servicioSolicitado, numeroTelefono);

console.log(resultado); */
