import bot from "@bot-whatsapp/bot";
import {buscarTurnosDisponibles, consultarTurnos, consultarTurnosPorDiaYServicio} from '../services/sheets/index.js'
import flowBusqueda from "./flowBusqueda.js";

let error = 0
const errorMessages = {
    invalidFormat: "❌ Formato de fecha incorrecto.",
    notFutureDate: "🔮 La fecha debe ser futura.",
    notValidDay: "🚫 La fecha no puede ser ni lunes ni domingo.",
    tooFarFuture: "📆 La fecha no puede excederse a más de 3 meses de la fecha actual."
};

function validarFecha(fechaStr) {
    let partes = fechaStr.split("/");
    let fechaFormateada = `20${partes[2]}-${partes[1]}-${partes[0]}`;
    let fecha = new Date(fechaFormateada);

    if (isNaN(fecha)) {
      return { valido: false, log: errorMessages.invalidFormat };
    }

    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha <= hoy) {
      return { valido: false, log: errorMessages.notFutureDate };
    }

    let tresMesesDesdeHoy = new Date(hoy.getFullYear(), hoy.getMonth() + 3, hoy.getDate());

    // Comprobar si la fecha es más de tres meses a partir de hoy
    if (fecha > tresMesesDesdeHoy) {
      return { valido: false, log: errorMessages.tooFarFuture };
    }

    let diaSemana = fecha.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return { valido: false, log: errorMessages.notValidDay };
    }

    return { valido: true, log: "Fecha válida." };
}

const flowSelecion4 = bot
.addKeyword("bot")
.addAction(
    null,
   { capture : false},
   async (ctx, { state,gotoFlow }) => {
     const myState = state.getMyState();
     if(!myState.Consulta||myState.Consulta==null){
      await state.update({Consulta:true})
      return await gotoFlow(flowBusqueda)
   }}
)
.addAnswer(
   `📆 Por favor, elige la fecha en la que quieres consultar un turno. Recuerda el formato DD/MM/AA 
   Ej: 12/02/23 `,
  { capture : true , delay : 2000 },
  async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
    const myState = state.getMyState();
    /* console.log(myState.telefono) */
    let mensaje = await consultarTurnos(myState.telefono)
    if(mensaje.contadorTurnos>=3){
        await flowDynamic("❌ No puedes reservar mas turnos , llegaste al límite.")
        return endFlow()
    }else{
        let validacion = validarFecha(ctx.body);
        if(validacion.valido){
          const myState = state.getMyState();
            let consulta = await buscarTurnosDisponibles(ctx.body,myState.servicio)
            return await flowDynamic(`📆 Los turnos disponibles para la fecha solicitada son: ${consulta}`)
        } else {
            error++
            await state.update({ errorHandler: error });
            const myState = state.getMyState();
            if(myState.errorHandler>=3){
              error = 0
              await state.update({ errorHandler: error });
              return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
            }
            return await flowDynamic(validacion.log)
        }
    }
  }
)
export default flowSelecion4
