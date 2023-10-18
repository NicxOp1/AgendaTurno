import bot from "@bot-whatsapp/bot";
import { consultarTurnos, agendarTurno, buscarDiasDisponibles } from "../services/sheets/index.js";

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
    { capture: true, delay : 2000 },
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
        
        console.log('Resultado de agendarTurno:', agendar);
        if (agendar.Mensaje) {
          flowDynamic(agendar.Mensaje)          
          let mostrar=agendar.DiasDisponibles.forEach((dia) => {
            dia.Horarios.forEach((horario) => {
            return  flowDynamic(`\nPara el día ${dia.Fecha} hay un turno libre para las: ${horario} 
                            \n Si alguno de estos horarios te sirve, responde con *Messirve*
                            \n De lo contrario, responde con *Quiero el horario*`);
            }); //falta resolver el tema de que muestre todos los horarios disponibles que sean posibles , dentro del dia que se mostro , solo llega el primero que seria a las 10:00 si es que no hay algo agendado
          });
          mostrar
        } else {
          flowDynamic(agendar)
        }
      } else {
        flowDynamic('Lo siento , escribiste mal el horario',
                    'recorda que solo aceptamos turnos de 10:00 a 18:30',
                    "Solo pueden intervalos de 30'")
                    return await gotoFlow(flowAgendar)
                  }
      }
    
);
export default flowAgendar;
