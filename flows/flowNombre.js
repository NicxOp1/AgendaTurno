import bot from "@bot-whatsapp/bot";
import flowBusqueda from "./flowBusqueda.js";
let error = 0
const flowNombre = bot
.addKeyword('bot')
.addAnswer(
    "👤 ¿Podrías decirme tu nombre, por favor?",
    { capture: true, delay : 2000 },
    async (ctx, {state,gotoFlow }) => {
      console.log(ctx.body)
      await state.update({ nombre: ctx.body });
      return await gotoFlow(flowBusqueda)
    }
)
export default flowNombre