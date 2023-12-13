import bot from "@bot-whatsapp/bot";

let error = 0;
const flowSeleccion5 = bot
  .addKeyword("flow_Seleccion5")
  .addAnswer(`Por favor,
  elige una opción para continuar:\n
  1️⃣💰 *Costos por Servicio*\n
  2️⃣🧱 *Costos de Producto*\n
  3️⃣🔅 *Consejos antes de hacerte _Color_*\n
  4️⃣💇🏻‍♂️ *Consejos para explicar mejor tu corte*\n

  
  Si en algún momento deseas
  detener la comunicación,
  simplemente escribe *cancelar*. 
  ¡Estoy aquí para ayudarte! 😊`,
    {capture:true, delay : 2000}, 
    async (ctx,{state,gotoFlow,endFlow,flowDynamic})=> { 
      await state.update({ telefono: ctx.from });
      if(parseInt(ctx.body)==1){

      }else if(parseInt(ctx.body)==2){
 
      } else if(parseInt(ctx.body)==3){
 
      }else if(parseInt(ctx.body)==4){

      }
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

    export default flowSeleccion5
