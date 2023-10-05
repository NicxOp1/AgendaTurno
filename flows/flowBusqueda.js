import bot from "@bot-whatsapp/bot";
import flowAgendar from "./flowAgendar.js";

const flowBusqueda = bot
.addKeyword('bot')
.addAnswer(
    ['Podrias proporcionarme el servicio que buscas realizarte?',
    '1)💅Esculpidas',
    '2)💅Kapping con acrilico',
    '3)💅Kapping con gel',
    '4)💅Esmaltado Semi-permanente'],
    {capture:true},
    async(ctx,{fallBack,flowDynamic,state,gotoFlow})=>{
        if(ctx.body==='1'){
            const ServicioSeleccionado = 'Esculpidas'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='2'){
            const ServicioSeleccionado = 'Kapping con acrilico'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='3'){
            const ServicioSeleccionado = 'Kapping con gel'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else if(ctx.body==='4'){
            const ServicioSeleccionado = 'Esmaltado Semi-permanente'
            await state.update({ servicio: ServicioSeleccionado })
            await gotoFlow(flowAgendar)
            flowDynamic()
        }else{
            return ('Porfavor vuelve a intentarlo y escribe un numero valido',fallBack)
        }
    })
export default flowBusqueda