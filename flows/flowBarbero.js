import bot from "@bot-whatsapp/bot";
import { getBarberosDisponibles } from "../services/sheets/index.js";
import flowSeleccionBarbero from "./flowSeleccionBarbero.js";
import flowAgendar from "./flowAgendar.js";
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
                await state.update({ barberos: barberos });
                await flowDynamic(`Los barberos que hay disponibles son: \n${barberosEnumerados}`)
                return await gotoFlow(flowSeleccionBarbero)
            }else if (ctx.body.toLowerCase()=="no"){
                const myState = state.getMyState();
                let dia = myState.dia
                let barberos = await getBarberosDisponibles(dia)
                let barberoRandom = barberos[Math.floor(Math.random() * barberos.length)];
                await state.update({ barberos: barberoRandom });
                console.log(barberoRandom)

                return gotoFlow(flowAgendar)//el que le pide el horario , creo que es flowAgendar
            }else{
                await flowDynamic("Lo lamento😔, te has equivocado...")
                error++;
                await state.update({ errorHandler: error });
                const myState = state.getMyState();
                console.log(myState.errorHandler)
                if(myState.errorHandler>=3){
                  error = 0
                  await state.update({ errorHandler: error });
                  return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
                }
                return  gotoFlow(flowBarbero)
            }
 
    }
)
export default flowBarbero