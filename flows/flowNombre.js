import bot from "@bot-whatsapp/bot";
import flowBusqueda from "./flowBusqueda.js";
let error = 0
const flowNombre = bot
.addKeyword('bot')
.addAnswer(
    "¿Cual es tu nombre?",
    { capture: true, delay : 2000 },
    async (ctx, {state,gotoFlow }) => {
      console.log(ctx.body)
      await state.update({ nombre: ctx.body });
/* testing      await state.update({ servicio: "Esculpidas" });
      await state.update({ dia: "25/10/23" }); */
      return await gotoFlow(flowBusqueda)
    }
)
export default flowNombre