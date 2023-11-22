import bot from "@bot-whatsapp/bot";
import flowBusqueda from "./flowBusqueda.js";
import { getBarberosDisponibles } from "../services/sheets/index.js";
let error = 0
const flowBarbero = bot
.addKeyword('bot')
.addAnswer(
    `👤 ¿Tenes algun barbero de preferencia?
    Responde *Si* o *No*`,
    { capture: true, delay : 2000 },
    async (ctx, {state,gotoFlow,flowDynamic,endFlow }) => {
        console.log(ctx.body)
            if(ctx.body.toLowerCase()=="si"){
                console.log("entro por si")
                const myState = state.getMyState();
                let dia = myState.dia
                let barberos = await getBarberosDisponibles(dia)
                let barberosEnumerados = barberos.map((barbero, index) => `${index + 1}. ${barbero}`).join('\n');
                return flowDynamic(`Los barberos que hay disponibles son:\n${barberosEnumerados}`)
                //se muestra lista de barberos
            }else{
                //se elige un barbero segun disponibilidad.
            }
 
    }
)
export default flowBarbero