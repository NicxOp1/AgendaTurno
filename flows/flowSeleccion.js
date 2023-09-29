import bot from "@bot-whatsapp/bot";
import flowBusqueda from "./flowBusqueda.js";
/* import pkg from '@bot-whatsapp/bot';
const {EVENTS} = pkg; */


const flowSelecion = bot
.addKeyword('1')//Reservar un turno
.addAnswer(
    'Perfecto! Ingresá la fecha que buscas atenderte. Recordá el formato DD/MM/YY',
    {capture:true}, 
    async (ctx,{state,fallBack,gotoFlow})=> {
        if(!ctx.body.includes('/')){
            return 'Porfavor ingresa bien los datos',fallBack
        }else{
            state.update({dia:ctx.body})
            console.log(`👉 Dia ingresado:${ctx.body}`, ctx)
            return gotoFlow(flowBusqueda)
        }
    })
    export default flowSelecion
