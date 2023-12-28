import bot from "@bot-whatsapp/bot";
import { consultarServicios,consultarProductos } from "../services/sheets/index.js";


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
          const servicios = await consultarServicios();
          for (let i = 0; i < servicios.Servicio.length; i++) {
              await flowDynamic(`💇🏻‍♂️${servicios.Servicio[i]} en tarjeta está a $${servicios.ValorTarjeta[i]} y con efectivo tiene descuento que queda a $${servicios.ValorEfectivo[i]}`);
            
            }
              return endFlow() 
      }else if(parseInt(ctx.body)==2){
        const productos = await consultarProductos();
        for (let i = 0; i < productos.Producto.length; i++) {
            await flowDynamic(`🧱${productos.Producto[i]} en tarjeta está a $${productos.ValorTarjeta[i]} y con efectivo tiene descuento que queda a $${productos.ValorEfectivo[i]}`);
          
          }
            return endFlow() 
      } else if(parseInt(ctx.body)==3){
        await flowDynamic("Te recomendamos , que a la hora de hacerte un 🌈 _*color*_ , 2 dias previos al teñido, no te laves la cabeza para poder crear una capa protectora que cubra el cuero cabelludo. Además que tengas el pelo bien hidratado los dias antes y despues del tinte. Puedes utilizar baños de crema o mascarillas para el pelo")
        return endFlow()
      }else if(parseInt(ctx.body)==4){
        await flowDynamic("Te recomendamos , que a la hora de hacerte un 💇🏻‍♂️ _*corte*_ , mostrar como te peinas todos los dias, si utilizás algun producto para modelarlo y con que largo te sentís comodo (Algo que puede ayudar tambien es decir hace cuanto no te cortás)")
        return endFlow()
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
