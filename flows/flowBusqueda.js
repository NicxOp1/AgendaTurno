import bot from "@bot-whatsapp/bot";
import delay from "../app.js";
import flowSeleccion4 from "./flowSeleccion4.js";
import flowBarbero from "./flowBarbero.js";
let error = 0;
const flowBusqueda = bot
  .addKeyword("bot")
  .addAnswer(
    [
      "Podrias proporcionarme el servicio que buscas realizarte?",
      "A)💇‍♂️Corte",
      "B)🧔🏻Corte y Barba",
      "C)🌈Color",
      "D)🪒Barba",
    ],
    { capture: true, delay: 2000 },
    async (ctx, { flowDynamic, state, gotoFlow }) => {
      if (ctx.body.toLowerCase() === "a") {
        const myState = state.getMyState();
        const ServicioSeleccionado = "Corte";
        await state.update({ servicio: ServicioSeleccionado });
        if (myState.Consulta) {
          return await gotoFlow(flowSeleccion4);
        }
        await gotoFlow(flowBarbero);
      } else if (ctx.body.toLowerCase() === "b") {
        const myState = state.getMyState();
        const ServicioSeleccionado = "Corte y Barba";
        await state.update({ servicio: ServicioSeleccionado });
        if (myState.Consulta) {
          return await gotoFlow(flowSeleccion4);
        }
        await gotoFlow(flowBarbero);
      } else if (ctx.body.toLowerCase() === "c") {
        const myState = state.getMyState();

        const ServicioSeleccionado = "Color";
        await state.update({ servicio: ServicioSeleccionado });
        if (myState.Consulta) {
          return await gotoFlow(flowSeleccion4);
        }
        await gotoFlow(flowBarbero);
      } else if (ctx.body.toLowerCase() === "d") {
        const myState = state.getMyState();
        const ServicioSeleccionado = "Barba";
        await state.update({ servicio: ServicioSeleccionado });
        if (myState.Consulta) {
          return await gotoFlow(flowSeleccion4);
        }
        await gotoFlow(flowBarbero);
      } else {
        await delay(2000);
        await flowDynamic(
          "❗ Por favor, intenta de nuevo y selecciona una opción válida."
        );
        error++;
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        if (myState.errorHandler >= 3) {
          error = 0;
          await state.update({ errorHandler: error });
          return endFlow({
            body: "⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!",
          });
        }
        return await gotoFlow(flowBusqueda);
      }
    }
  );
export default flowBusqueda;
