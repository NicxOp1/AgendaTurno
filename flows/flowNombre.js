import bot from "@bot-whatsapp/bot";
import flowBusqueda from "./flowBusqueda.js";
let error = 0
const flowNombre = bot
.addKeyword('bot')
.addAnswer(
    "👤 ¿Podrías decirme tu nombre, por favor?",
    { capture: true, delay : 2000 },
    async (ctx, {state,gotoFlow }) => {
      clearTimeout(timeoutId);
timeoutId = setTimeout(() => {
  endFlow({body: '⚠️Has superado el tiempo de espera. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
}, 5 * 60 * 1000); // 5 minutos

      console.log(ctx.body)
      await state.update({ nombre: ctx.body });
/* testing      await state.update({ servicio: "Esculpidas" });
      await state.update({ dia: "25/10/23" }); */
      return await gotoFlow(flowBusqueda)
    }
)
export default flowNombre