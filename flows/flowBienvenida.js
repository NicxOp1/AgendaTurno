import bot from "@bot-whatsapp/bot";
/* import pkg from '@bot-whatsapp/bot'; */
import flowSelecion1 from "./flowSeleccion.js";
import flowSeleccion2 from "./flowSeleccion2.js";
import flowSeleccion3 from "./flowSeleccion3.js";
/*import flowSeleccion4 from "./flowSeleccion4.js";
import flowSeleccion5 from "./flowSeleccion5.js"; */
/* const {EVENTS} = pkg;
*/
let error = 0;
const flowPrincipal = bot
  .addKeyword("hola")
  .addAnswer(`🌼 ¡Hola! 🌼 
Bienvenido a Bel's Nails💅
¿Cómo puedo ayudarte hoy? 
Por favor,
elige una opción para continuar:\n
1️⃣📅 *reservar un turno*\n
2️⃣🤔 *consultar o cambiar un turno*\n
3️⃣❌ *cancelar un turno*\n
4️⃣🕔 *ver turnos disponibles según la fecha*\n
5️⃣❓ *preguntas frecuentes*

Si en algún momento deseas
detener la comunicación,
simplemente escribe *cancelar*. 
¡Estoy aquí para ayudarte! 😊`,
    {capture:true, delay : 2000}, 
    async (ctx,{state,gotoFlow,endFlow,flowDynamic})=> {
      console.log("ctx del flow Bienvenida:",ctx.body)
      await state.update({ telefono: ctx.from });
      if(parseInt(ctx.body)==1){
        await gotoFlow(flowSelecion1)
      }else if(parseInt(ctx.body)==2){
        console.log("entro en consultar o cambiar")
        await gotoFlow(flowSeleccion2)
      } else if(parseInt(ctx.body)==3){
        await gotoFlow(flowSeleccion3)
      }/*else if(parseInt(ctx.body)==4){
        await gotoFlow(flowSeleccion4)
      }else if(parseInt(ctx.body)==5){
        await gotoFlow(flowSeleccion5)
      } */
      if(ctx.body.toLowerCase()=="cancelar"){
        return endFlow({body:'Nos vemos pronto!, en caso de volver a encenderme escribe *hola*'})
      }else{
        await flowDynamic("Lo lamento, te has equivocado con el numero ingresado")
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
