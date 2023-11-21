 import bot from "@bot-whatsapp/bot";
import {consultarTurnos} from '../services/sheets/index.js'
import flowSeleccionarTurnoPBorrar from './flowSeleccionarTurnoPBorrar.js'
const flowSelecion3 = bot
.addKeyword("3",{ sensitive: true })
.addAnswer(
   `Perfecto aquí se encuentran tus turnos ya agendados..
Recuerda siempre que quieras terminar escribe: *Cancelar*`,
  {capture:false },
  async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
    clearTimeout(timeoutId);
timeoutId = setTimeout(() => {
  endFlow({body: '⚠️Has superado el tiempo de espera. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
}, 5 * 60 * 1000); // 5 minutos

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