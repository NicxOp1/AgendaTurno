import bot from "@bot-whatsapp/bot";
/* import pkg from '@bot-whatsapp/bot'; */
import flowSelecion from "./flowSeleccion.js";
/* const {EVENTS} = pkg;
*/
let error = 0;
const flowPrincipal = bot
  .addKeyword("hola")
  .addAnswer(`🌼 ¡Hola! 🌼 
Bienvenido a Bel's Nails.
¿Cómo puedo ayudarte hoy? 
Por favor,
elige una opción para continuar:\n
1)📅 *reservar un turno*\n
2)🤔 *consultar o cambiar un turno*\n
3)❌ *cancelar un turno*\n
4)🕔 *ver turnos disponibles según la fecha*\n
5)❓ *preguntas frecuentes*

Si en algún momento deseas
detener la comunicación,
simplemente escribe *cancelar*. 
¡Estoy aquí para ayudarte! 😊`,
    {capture:true, delay : 2000}, 
    async (ctx,{state,gotoFlow,endFlow})=> {
      console.log(ctx.body)
      if(parseInt(ctx.body)>0&&parseInt(ctx.body)<6){
        await gotoFlow(flowSelecion)
      }
      if(ctx.body.toLowerCase()=="cancelar"){
        return endFlow({body:'Nos vemos pronto!, en caso de volver a encenderme escribe *hola*'})
      }else{
        error++;
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        console.log(myState.errorHandler)
        if(myState.errorHandler>=3){
          return endFlow({body: 'Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
        }
        return await gotoFlow(flowPrincipal)
      }
    })

    export default flowPrincipal
