import bot from "@bot-whatsapp/bot";
/* import pkg from '@bot-whatsapp/bot'; */
import flowSelecion from "./flowSeleccion.js";
/* const {EVENTS} = pkg;
 */
const flowPrincipal = bot
  .addKeyword("hola")
  .addAnswer(
    `Hola ! te estas comunicando con
    Bel´s Nails
    \nPorfavor seleccione una opción para continuar
    \n1)📅Reservar un turno
    \n2)🤔Consultar o cambiar un turno
    \n3)❌Cancelar un turno
    \n4)🕔Ver turnos disponibles segun fecha
    \n5)❓Preguntas frecuentes
    \n💤Escribe *cancelar* para frenar la comunicación`,
    {capture:true, delay : 2000}, 
    async (ctx,{state,gotoFlow,endFlow,flowDynamic})=> {
      let error = 0;
      if(ctx.body==1||2||3||4||5){
        await gotoFlow(flowSelecion)
      }else if(ctx.body==cancelar){
        return endFlow('Nos vemos pronto!, en caso de volver a encenderme escribe *hola*')
      }else{
        flowDynamic('Porfavor escribe una opcion valida')
        error++
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        if(myState.errorHandler>=3){
          return endFlow({body: 'Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
        }
        return await gotoFlow(flowPrincipal)
      }
    })

    export default flowPrincipal
