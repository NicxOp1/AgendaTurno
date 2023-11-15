import bot from "@bot-whatsapp/bot";
import flowAgendar from "./flowAgendar.js";
import delay from "../app.js";
let error = 0
const flowBusqueda = bot
.addKeyword('bot')
.addAnswer(
    ['Podrias proporcionarme el servicio que buscas realizarte?',
    'A)💅Esculpidas',
    'B)💅Kapping con acrilico',
    'C)💅Kapping con gel',
    'D)💅Esmaltado Semi-permanente'],
    {capture:true, delay : 2000},
    async(ctx,{flowDynamic,state,gotoFlow})=>{
        if(ctx.body==='A'){
            const myState = state.getMyState();

            const ServicioSeleccionado = 'Esculpidas'
            await state.update({ servicio: ServicioSeleccionado })
            if(myState.Consulta){
                return await gotoFlow(flowTurnosPorDia)
            }
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='B'){
            const myState = state.getMyState();

            const ServicioSeleccionado = 'Kapping con acrilico'
            await state.update({ servicio: ServicioSeleccionado })
            if(myState.Consulta){
                return await gotoFlow(flowTurnosPorDia)
            }
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='C'){
            const myState = state.getMyState();

            const ServicioSeleccionado = 'Kapping con gel'
            await state.update({ servicio: ServicioSeleccionado })
            if(myState.Consulta){
                return await gotoFlow(flowTurnosPorDia)
            }
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='D'){
            const myState = state.getMyState();

            const ServicioSeleccionado = 'Esmaltado Semipermanente'
            await state.update({ servicio: ServicioSeleccionado })
            if(myState.Consulta){
                return await gotoFlow(flowTurnosPorDia)
            }
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else{
            await delay(2000)
            await flowDynamic ('❗ Por favor, intenta de nuevo y selecciona una opción válida.')
            error++
            await state.update({ errorHandler: error });
            const myState = state.getMyState();
            if(myState.errorHandler>=3){
              return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
            }
            return await gotoFlow(flowBusqueda)
        }
    })
export default flowBusqueda