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
    async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
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
        return endFlow({body: agendar})
        /* flowDynamic(agendar) */
      } else {
        flowDynamic('Lo siento , escribiste mal el horario',
                    'recorda que solo aceptamos turnos de 10:00 a 18:30',
                    "Solo pueden intervalos de 30'")
                    return  await gotoFlow(flowAgendar)
                  }
      }
    
  );
export default flowAgendar;
