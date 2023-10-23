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
.addKeyword("pene")
.addAnswer(
    "¿Cual es tu nombre?",
    { capture: true, delay : 2000 },
    async (ctx, { flowDynamic, state }) => {
      console.log(ctx.body)
      await state.update({ nombre: ctx.body });
      await state.update({ servicio: "Esculpidas" });
      await state.update({ dia: "25/10/23" });
      flowDynamic();
    }
)
.addAnswer(
    "Dime el horario que te gustaria el turno",
    { capture: true, delay : 2000 },
    async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
      let error = 0
      if (esHorarioValido(ctx.body)) {
        await state.update({ horario: "12:00" });
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
          let nuevoDia = '';
          let listadoDeHorarios = '';
          let dia = agendar.DiasDisponibles;
          let lista = '';
          for (let i = 0; i < dia.Horarios.length; i++) {
            let hora = dia.Horarios[i];
            lista += hora + (i % 3 === 2 ? '\n' : ' ');}
          nuevoDia = dia.Fecha;
          listadoDeHorarios = lista;
          await delay(2000)
          flowDynamic(`Para el dia ${dia.Fecha} hay los siguientes turnos disponibles:\n\n${lista}`);
          await state.update({dia: nuevoDia});
          await state.update({horariosPosibles: listadoDeHorarios});
          await delay(2000)
          return await gotoFlow(flowReagendar)
        } else {
          flowDynamic(agendar)
          return endFlow()
        }
      } else {
        error++
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        if(myState.errorHandler>=3){
          return endFlow({body: 'Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
        }
        flowDynamic('Lo siento , escribiste mal el horario',
                    'recorda que solo aceptamos turnos de 10:00 a 18:30',
                    "Solo pueden intervalos de 30'")
                    return await gotoFlow(flowAgendar)
                  }
      }
    
);
export default flowAgendar;