import bot from "@bot-whatsapp/bot";
import { consultarTurnos, agendarTurno } from "../services/sheets/index.js";
import flowReagendar from "./flowReagendar.js"
import delay from "../app.js"
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
let nuevoDia = 0
let listadoDeHorarios= 0
const flowAgendar = bot
.addKeyword("bot")
.addAnswer(
  `⏰ Por favor, dime a qué hora te gustaría tu turno. Recuerda usar el formato HH:MM, por ejemplo: 13:30⏱.`,
    { capture: true, delay : 2000 },
    async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
      let error = 0
      if (esHorarioValido(ctx.body)) {
        await state.update({ horario: ctx.body }); 
        await state.update({ telefono: ctx.from });
        const myState = state.getMyState();
        console.log(myState.barbero);
        const agendar = await agendarTurno(
          myState.dia,
          myState.horario,
          myState.servicio,
          myState.nombre,
          myState.telefono,
          myState.barbero
        );
        
        console.log('Resultado de agendarTurno:', agendar);
        if (agendar.Mensaje && !agendar.DiasDisponibles.Horarios) {
          console.log(agendar)
          flowDynamic(agendar.Mensaje)  
          return endFlow();        
        }
        else if(agendar.DiasDisponibles.Horarios && agendar.DiasDisponibles.Horarios.length > 0) {
          flowDynamic("Lo siento😞, no hemos encontrado un turno disponible...")
          let nuevoDia = '';
          let listadoDeHorarios = '';
          let dia = agendar.DiasDisponibles;
          console.log("dia",dia)
          let lista = '';
          dia.Horarios.sort();
          for (let i = 0; i < dia.Horarios.length; i++) {
            let hora = dia.Horarios[i];
            lista += hora + (i % 3 === 2 ? '\n' : ' ');}
          nuevoDia = dia.Fecha;
          listadoDeHorarios = lista;
          await delay(2000)
          flowDynamic(`🗓️Para el dia ${dia.Fecha} hay los siguientes turnos disponibles:\n\n${lista}`);
          await state.update({dia: nuevoDia});
          await state.update({horariosPosibles: listadoDeHorarios});
          await delay(2000)
          return await gotoFlow(flowReagendar)
        }
      } else {
        error++
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        if(myState.errorHandler>=3){
          error = 0
          await state.update({ errorHandler: error });
          return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
        }
        flowDynamic(`Lo siento😞 , escribiste mal el horario\n
recorda que solo aceptamos turnos de 10:00 a 18:30\n
Solo pueden intervalos de 30'👀\n
El formato es *hh/mm* ej: *13:00*⌚`)
        await delay(2000)
                    return await gotoFlow(flowAgendar)
                  }
      }
    
);
export default flowAgendar;