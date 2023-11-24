import bot from "@bot-whatsapp/bot";
import { agendarTurno } from "../services/sheets/index.js";
import flowCambiarFecha from "./flowCambiarFecha.js";
import { cleanMessage } from "@whiskeysockets/baileys";

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


const flowReagendar = bot
.addKeyword('bot')
.addAnswer(`⏲️ Por favor, ingresa explícitamente la hora que te gustaría reservar. Si deseas cambiar el día, escribe *Cambiar*.`,
         { capture: true, delay : 2000 },
         async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
          console.log("EL HORARIO DEL TURNO A CAMBIAR: " + ctx.body)
           const myState = state.getMyState();
          if(myState.horariosPosibles){
            if(myState.horariosPosibles.includes(ctx.body)){               
              flowDynamic("🔄 Perfecto, estamos procesando los datos...")
              await state.update({horario:ctx.body})
              console.log("ES HORARIO POSIBLE"+ctx.body)
              const agendar = await agendarTurno(
                  myState.dia,
                  ctx.body,
                  myState.servicio,
                  myState.nombre,
                  myState.telefono,
                );
                flowDynamic(agendar);
                return endFlow(); 
            }
          }
            if(esHorarioValido(ctx.body)){
                flowDynamic("🔄 Perfecto, estamos procesando los datos...")
                await state.update({horario:ctx.body})
                console.log("ES HORARIO VALIDO: " + ctx.body)
                const agendar = await agendarTurno(
                    myState.dia,
                    ctx.body,
                    myState.servicio,
                    myState.nombre,
                    myState.telefono,
                  );
                  flowDynamic(agendar);
                  return endFlow(); 
            } 
             else if(ctx.body == "Cambiar"){
              return await gotoFlow(flowCambiarFecha)
            }else{
              flowDynamic('❌ Parece que hubo un error al ingresar los datos. Por favor, intenta de nuevo.')
              error++
              await state.update({ errorHandler: error });
              const myState = state.getMyState();
              if(myState.errorHandler>=3){
                error = 0
                await state.update({ errorHandler: error });
                return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
              }
              flowDynamic("Lo siento😔, no se encuentra disponible el horario seleccionado, vuelve a intentarlo...")
              return await gotoFlow(flowReagendar)
            } 
            
         })
export default flowReagendar