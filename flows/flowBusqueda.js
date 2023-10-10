import bot from "@bot-whatsapp/bot";
import flowAgendar from "./flowAgendar.js";

const flowBusqueda = bot
.addKeyword('bot')
.addAnswer(
    ['Podrias proporcionarme el servicio que buscas realizarte?',
    'A)💅Esculpidas',
    'B)💅Kapping con acrilico',
    'C)💅Kapping con gel',
    'D)💅Esmaltado Semi-permanente'],
    {capture:true},
    async(ctx,{fallBack,flowDynamic,state,gotoFlow})=>{
        if(ctx.body==='A'){
            const ServicioSeleccionado = 'Esculpidas'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='B'){
            const ServicioSeleccionado = 'Kapping con acrilico'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='C'){
            const ServicioSeleccionado = 'Kapping con gel'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='D'){
            const ServicioSeleccionado = 'Esmaltado Semipermanente'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else{
            flowDynamic ('Porfavor vuelve a intentarlo y selecciona una opcion valida',fallBack)
        }
    })
export default flowBusqueda