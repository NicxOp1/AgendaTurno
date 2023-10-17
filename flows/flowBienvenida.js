import bot from "@bot-whatsapp/bot";
import pkg from '@bot-whatsapp/bot';
import flowSelecion from "./flowSeleccion.js";
const {EVENTS} = pkg;

const flowPrincipal = bot
  .addKeyword(EVENTS.WELCOME)
  .addAnswer(
    `Hola ! te estas comunicando con
    Bel´s Nails
    \nPorfavor seleccione una opción para continuar
    \n1)📅Reservar un turno
    \n2)🤔Consultar o cambiar un turno
    \n3)❌Cancelar un turno
    \n4)🕔Ver turnos disponibles segun fecha
    \n5)❓Preguntas frecuentes`,
    {capture:true}, 
    async (ctx,{gotoFlow})=> {
      if(ctx.body===1||2||3||4||5){
        await gotoFlow(flowSelecion)
      }
    })

    export default flowPrincipal
