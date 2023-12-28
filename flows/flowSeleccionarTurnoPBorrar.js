import bot from "@bot-whatsapp/bot";
import flowConfirmarCancelacionPBorrar from "./flowConfirmarCancelacionPBorrar.js";

let error=0
const flowSeleccionarTurnoPBorrar = bot
.addKeyword("seleccionar_turno", { sensitive: true })
.addAnswer(
  "Por favor, selecciona el turno que deseas *Eliminar* ❌ introduciendo su número:",
  { capture: true, delay: 2000 },
  async (ctx, { state, gotoFlow,flowDynamic }) => {
    const myState = state.getMyState();
    let numeroTurno = parseInt(ctx.body);
    // Asegúrate de que el número del turno es un número y está dentro del rango válido.
    if (isNaN(numeroTurno) || numeroTurno < 1 || numeroTurno > myState.contadorTurnos.length) {
      error++
      await state.update({ errorHandler: error });
      const myState = state.getMyState();
      if(myState.errorHandler>=3){
        error = 0
        await state.update({ errorHandler: error });
        return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
      }
      return await flowDynamic("❌ El número que has introducido no es válido. Por favor, intenta de nuevo.");
    }
    // Almacena el número del turno en el estado.
    await state.update({ numeroTurno:numeroTurno });
    return await gotoFlow(flowConfirmarCancelacionPBorrar);
  }
);

export default flowSeleccionarTurnoPBorrar
