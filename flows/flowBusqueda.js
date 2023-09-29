import bot from "@bot-whatsapp/bot";

let STATUS = {}
const flowBusqueda = bot
.addAnswer(
    ['Podrias proporcionarme el servicio que buscas realizarte?',
    '1)💅Esculpidas',
    '2)💅Kapping con acrilico',
    '3)💅Kapping con gel',
    '4)💅Esmaltado Semi-permanente'],
    {capture:true},
    async(ctx,{fallBack, flowDynamic})=>{
        telefono = ctx.from
        if(ctx.body==='1'){
            ServicioSeleccionado = 'Esculpidas'
            DuracionS = '3:00'
            Servicio = STATUS[telefono] = {...STATUS[telefono], Servicio : ServicioSeleccionado}
            Telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}
            Duracion = STATUS[telefono] = {...STATUS[telefono], Duracion : DuracionS}
            console.log(STATUS[telefono])
            await flowDynamic('Enviar un mensaje text')
        }else if(ctx.body==='2'){
            ServicioSeleccionado = 'Kapping con acrilico'
            DuracionS = '2:30'
            Servicio = STATUS[telefono] = {...STATUS[telefono], Servicio : ServicioSeleccionado}
            Telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}
            Duracion = STATUS[telefono] = {...STATUS[telefono], Duracion : DuracionS}
            console.log(STATUS[telefono])
            await flowDynamic('Enviar un mensaje text')
        }else if(ctx.body==='3'){
            ServicioSeleccionado = 'Kapping con gel'
            DuracionS = '2:00'
            Servicio = STATUS[telefono] = {...STATUS[telefono], Servicio : ServicioSeleccionado}
            Telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}
            Duracion = STATUS[telefono] = {...STATUS[telefono], Duracion : DuracionS}     
            console.log(STATUS[telefono])
            await flowDynamic('Enviar un mensaje text')
        }else if(ctx.body==='4'){
            ServicioSeleccionado = 'Esmaltado Semi-permanente'
            DuracionS = '3:00'
            Servicio = STATUS[telefono] = {...STATUS[telefono], Servicio : ServicioSeleccionado}
            Telefono = STATUS[telefono] = {...STATUS[telefono], telefono : ctx.from}
            Duracion = STATUS[telefono] = {...STATUS[telefono], Duracion : DuracionS}     
            console.log(STATUS[telefono])
            await flowDynamic('Enviar un mensaje text')
        }else{
            return 'Porfavor vuelve a intentarlo y escribe un numero valido',fallBack
        }
        await flowDynamic('Enviar un mensaje text')
    },null)
export default flowBusqueda