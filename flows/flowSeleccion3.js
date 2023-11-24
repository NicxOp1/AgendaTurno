 import bot from "@bot-whatsapp/bot";
import {consultarTurnos} from '../services/sheets/index.js'
import flowSeleccionarTurnoPBorrar from './flowSeleccionarTurnoPBorrar.js'
const flowSelecion3 = bot
.addKeyword("bot")
.addAnswer(
   `Perfecto aquí se encuentran tus turnos ya agendados..
Recuerda siempre que quieras salir escribe *Cancelar*`,
  {capture:false },
  async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
    if(ctx.body.toLowerCase=="cancelar"){
      return endFlow({body: 'Terminaste la conversación. Escribe *Hola* para empezar de nuevo. ¡Gracias!'})
    }
    const myState = state.getMyState();
    /* console.log(myState.telefono) */
    let mensaje = await consultarTurnos(myState.telefono)
    console.log("Turnos consultados ✖✖➖➖✖✖➖✖✖ ",mensaje.contadorTurnos)
    await state.update({contadorTurnos:mensaje.contadorTurnos});
    if(mensaje.contadorTurnos>0){
      await flowDynamic(mensaje.mensaje)
      return gotoFlow(flowSeleccionarTurnoPBorrar)
    }else{
      flowDynamic("no tienes ningun turno agendado.!")
      return endFlow()
    }
  }
)
export default flowSelecion3