import bot from "@bot-whatsapp/bot";
import {cancelarTurnoPorPosicion} from "../services/sheets/index.js"
import flowSeleccionarTurnoPBorrar from "./flowSeleccionarTurnoPBorrar.js";

let error = 0

const flowConfirmarCancelacionPBorrar = bot
.addKeyword("confirmar_cancelacion", { sensitive: true })
.addAnswer(
  "¿Estás seguro de que quieres cancelar este turno? Responde *sí* para confirmar o *no* para seleccionar otro turno.",
  { capture: true },
  async (ctx, { state, gotoFlow,flowDynamic,endFlow }) => {

    const myState = state.getMyState();
    let confirmacion = ctx.body.toLowerCase();
    // Asegúrate de que el usuario ha confirmado la cancelación.
    console.log(confirmacion);
    if (confirmacion === 'sí' || confirmacion === 'si') {
      // Cancela el turno y finaliza el flujo
      let turnoCancelado = await cancelarTurnoPorPosicion(myState.telefono,myState.numeroTurno);
      console.log(turnoCancelado)
      if(turnoCancelado){
         await flowDynamic(`El turno del dia ${turnoCancelado.dia} a las ${turnoCancelado.horario} se encuentra cancelado `);
         return endFlow()
      }
    } else if (confirmacion === 'no') {
      // Si el usuario no confirma, vuelve al flujo de selección de turno.
      error++
      await state.update({ errorHandler: error });
      const myState = state.getMyState();
      if(myState.errorHandler>=3){
        return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
      }
      return await gotoFlow(flowSeleccionarTurnoPBorrar);
    } else {
      error++
      await state.update({ errorHandler: error });
      const myState = state.getMyState();
      if(myState.errorHandler>=3){
        return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
      }
      // Si el usuario introduce algo distinto de sí o no, pide una nueva confirmación.
      return gotoFlow(flowConfirmarCancelacionPBorrar);
    }
  }
);
export default	flowConfirmarCancelacionPBorrar
