import bot from "@bot-whatsapp/bot";
import flowConfirmarCancelacionPBorrar from "./flowConfirmarCancelacionPBorrar.js";

const flowSeleccionarTurnoPBorrar = bot
.addKeyword("seleccionar_turno", { sensitive: true })
.addAnswer(
  "Por favor, selecciona el turno que deseas *Eliminar* ❌ introduciendo su número:",
  { capture: true },
  async (ctx, { state, gotoFlow,flowDynamic }) => {
    clearTimeout(timeoutId);
timeoutId = setTimeout(() => {
  endFlow({body: '⚠️Has superado el tiempo de espera. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
}, 5 * 60 * 1000); // 5 minutos
    const myState = state.getMyState();
    let numeroTurno = parseInt(ctx.body);
    // Asegúrate de que el número del turno es un número y está dentro del rango válido.
    if (isNaN(numeroTurno) || numeroTurno < 1 || numeroTurno > myState.contadorTurnos.length) {
      return await flowDynamic("❌ El número que has introducido no es válido. Por favor, intenta de nuevo.");
    }
    // Almacena el número del turno en el estado.
    await state.update({ numeroTurno:numeroTurno });
    return await gotoFlow(flowConfirmarCancelacionPBorrar);
  }
);

export default flowSeleccionarTurnoPBorrar
