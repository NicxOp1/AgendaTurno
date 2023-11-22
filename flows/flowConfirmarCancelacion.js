import bot from "@bot-whatsapp/bot";
import {cancelarTurnoPorPosicion} from "../services/sheets/index.js"
import flowReagendar from "./flowReagendar.js";
import flowSeleccionarTurno from "./flowSeleccionarTurno.js";

const flowConfirmarCancelacion = bot
.addKeyword("confirmar_cancelacion", { sensitive: true })
.addAnswer(
  "¿Estás seguro de que quieres cancelar este turno? Responde *sí* para confirmar o *no* para seleccionar otro turno.",
  { capture: true },
  async (ctx, { state, gotoFlow }) => {
    const myState = state.getMyState();
    let confirmacion = ctx.body.toLowerCase();
    // Asegúrate de que el usuario ha confirmado la cancelación.
    console.log(confirmacion);
    if (confirmacion === 'sí' || confirmacion === 'si') {
      // Cancela el turno y pasa al flujo de reagendamiento.
      let turnoCancelado = await cancelarTurnoPorPosicion(myState.telefono,myState.numeroTurno);
      console.log(turnoCancelado)
      // Almacena los datos del turno cancelado en el estado del flujo.    
      await state.update({ 
        dia: turnoCancelado.dia,
        servicio: turnoCancelado.servicio,
        nombre: turnoCancelado.nombre,
        telefono: turnoCancelado.telefono
      });
      return await gotoFlow(flowReagendar);
    } else if (confirmacion === 'no') {
      // Si el usuario no confirma, vuelve al flujo de selección de turno.
      return await gotoFlow(flowSeleccionarTurno);
    } else {
      // Si el usuario introduce algo distinto de sí o no, pide una nueva confirmación.
      return await flowDynamic("Por favor, responde sí para confirmar la cancelación del turno o no para seleccionar otro turno.");
    }
  }
);
export default	flowConfirmarCancelacion
