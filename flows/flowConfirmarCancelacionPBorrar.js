import bot from "@bot-whatsapp/bot";
import {cancelarTurnoPorPosicion} from "../services/sheets/index.js"
import flowSeleccion3 from "./flowSeleccion3.js"

let error = 0

const flowConfirmarCancelacionPBorrar = bot
.addKeyword("confirmar_cancelacion", { sensitive: true })
.addAnswer(
  "¿Estás seguro de que quieres cancelar este turno? Responde *sí* para confirmar o *no* para seleccionar otro turno.",
  { capture: true, delay : 2000 },
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
         await flowDynamic(`El turno del dia ${turnoCancelado.dia} a las ${turnoCancelado.horario} con el barbero *${turnoCancelado.barbero}* se encuentra ❌ *CANCELADO* ❌ `);
         return endFlow()
      }
    } else if (confirmacion === 'no') {
      // Si el usuario no confirma, vuelve al flujo de selección de turno.
      return await gotoFlow(flowSeleccion3);
    } else {
      error++
      await state.update({ errorHandler: error });
      const myState = state.getMyState();
      if(myState.errorHandler>=3){
        error = 0
        await state.update({ errorHandler: error });
        return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
      }
      // Si el usuario introduce algo distinto de sí o no, pide una nueva confirmación.
      await flowDynamic("Lo siento😔, te has equivocado... Porfavor volvé a intentarlo")
      return gotoFlow(flowConfirmarCancelacionPBorrar);
    }
  }
);
export default	flowConfirmarCancelacionPBorrar
