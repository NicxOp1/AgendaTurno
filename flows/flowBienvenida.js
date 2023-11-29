import bot from "@bot-whatsapp/bot";
import flowSelecion1 from "./flowSeleccion.js";
import flowSeleccion2 from "./flowSeleccion2.js";
import flowSeleccion3 from "./flowSeleccion3.js";
/* let timeoutId;  */
let error = 0;
const flowPrincipal = bot
  .addKeyword("tonta",{sensitive:false})
  .addAnswer(`💈 ¡Hola! 💈 
  Bienvenido a Barbería Gambino ✂️
  ¿Cómo puedo ayudarte hoy? 
  Por favor,
  elige una opción para continuar:\n
  1️⃣📅 *Reservar un turno*\n
  2️⃣🔄 *Consultar o cambiar un turno*\n
  3️⃣❌ *Cancelar un turno*\n
  4️⃣🗓️ *Ver turnos disponibles según la fecha*\n
  5️⃣❓ *Preguntas frecuentes*
  
  Si en algún momento deseas
  detener la comunicación,
  simplemente escribe *cancelar*. 
  ¡Estoy aquí para ayudarte! 😊`,
    {capture:true, delay : 2000}, 
    async (ctx,{state,gotoFlow,endFlow,flowDynamic})=> { 
      await state.update({ telefono: ctx.from });
      if(parseInt(ctx.body)==1){
        await gotoFlow(flowSelecion1)
      }else if(parseInt(ctx.body)==2){
/*         await gotoFlow(flowSeleccion2)
      } else if(parseInt(ctx.body)==3){
        await gotoFlow(flowSeleccion3) */
      }/*else if(parseInt(ctx.body)==4){
        await gotoFlow(flowSeleccion4)
      }else if(parseInt(ctx.body)==5){
        await gotoFlow(flowSeleccion5)
      } */
      if(ctx.body.toLowerCase()=="cancelar"){
        return endFlow({body:'👋Nos vemos pronto!, en caso de volver a encenderme escribe *hola*'})
      }else{
        await flowDynamic("Lo lamento😔, te has equivocado con el numero ingresado")
        error++;
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        console.log(myState.errorHandler)
        if(myState.errorHandler>=3){
          error = 0
          await state.update({ errorHandler: error });
          return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
        }
        return await gotoFlow(flowPrincipal)
      }
    })

    export default flowPrincipal
