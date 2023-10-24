import bot from "@bot-whatsapp/bot";
import { agendarTurno } from "../services/sheets/index.js";
import flowCambiarFecha from "./flowCambiarFecha.js";

const flowReagendar = bot
.addKeyword('bot')
.addAnswer(`Porfavor ingresá explicitamente el horario que te gustaria tomar. Si queres cambiar el dia escribe *Cambiar*`,
         { capture: true, delay : 2000 },
         async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
            const myState = state.getMyState();
            if(myState.horariosPosibles.includes(ctx.body)){
                flowDynamic("Perfecto, estamos procesando los datos...")
                await state.update({horario:ctx.body})
                const myState = state.getMyState();
                const agendar = await agendarTurno(
                    myState.dia,
                    myState.horario,
                    myState.servicio,
                    myState.nombre,
                    myState.telefono
                  );
                  flowDynamic(agendar);
                  return endFlow(); 
            } 
             else if(ctx.body == "Cambiar"){
              return await gotoFlow(flowCambiarFecha)
            }else{
              flowDynamic('Has ingresado los datos mal.')
              error++
              await state.update({ errorHandler: error });
              const myState = state.getMyState();
              if(myState.errorHandler>=3){
                return endFlow({body: 'Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
              }
              flowDynamic("Lo siento, no se encuentra disponible el horario seleccionado, vuelve a intentarlo...")
              return await gotoFlow(flowReagendar)
            } 
            
         })
export default flowReagendar