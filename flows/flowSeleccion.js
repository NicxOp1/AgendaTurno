import bot from "@bot-whatsapp/bot";
import delay from "../app.js"
import { consultarTurnos } from "../services/sheets/index.js";
import flowNombre from "./flowNombre.js";
import moment from "moment";
/* import pkg from '@bot-whatsapp/bot';
const {EVENTS} = pkg; */
let error = 0;
const errorMessages = {
  invalidFormat: "❌ Formato de fecha incorrecto.",
  notFutureDate: "🔮 La fecha debe ser futura.",
  notValidDay: "🚫 La fecha no puede ser ni lunes ni domingo.",
  tooFarFuture: "📆 La fecha no puede excederse a más de 3 meses de la fecha actual."
};


function validarFecha(fechaStr) {
  console.log(fechaStr)
  let partes = fechaStr.split("/");
  let fechaFormateada = `20${partes[2]}-${partes[1]}-${partes[0]}`;
  console.log(fechaFormateada)
  let fecha = moment(fechaFormateada).startOf('day');
  
  if (!fecha.isValid()) {
    return { valido: false, log: errorMessages.invalidFormat };
  }

  let hoy = moment().startOf('day');

  if (fecha.isBefore(hoy)) {
    console.log(hoy)
    console.log(fecha)
    return { valido: false, log: errorMessages.notFutureDate };
  }

  let tresMesesDesdeHoy = moment().add(3, 'months').startOf('day');

  // Comprobar si la fecha es más de tres meses a partir de hoy
  if (fecha.isAfter(tresMesesDesdeHoy)) {
    return { valido: false, log: errorMessages.tooFarFuture };
  }

  let diaSemana = fecha.day();
  if (diaSemana === 0 || diaSemana === 6) {
    return { valido: false, log: errorMessages.notValidDay };
  }

  return { valido: true, log: "Fecha válida." };
}

const flowSeleccion1 = bot
  .addKeyword("bot") //Reservar un turno
  .addAnswer(
    "📆 Por favor, ingresa la fecha en la que deseas atenderte. Recuerda usar el formato DD/MM/AA.",
    "🚫 Puedes escribir *Cancelar* si necesitas detener el proceso.",
  )
  .addAction(
    { capture: true, delay: 2000 },
    async (ctx, { state, gotoFlow, flowDynamic, endFlow }) => {
      const resultado = validarFecha(ctx.body);
      if (!resultado.valido) {
        error++
        flowDynamic(resultado.log);
        await delay(2000)
        /* console.log(`CANTIDAD DE ERRORES ✖✖➖➖✖✖➖✖✖ ${error}`) */
        await state.update({ errorHandler: error });
        const myState = state.getMyState();
        if(myState.errorHandler>=3){
          error = 0
          await state.update({ errorHandler: error });
          return endFlow({body: '⚠️ Has superado los 3 intentos. Por favor, escribe *Hola* para comenzar de nuevo. ¡Gracias!'})
        }
        return gotoFlow(flowSeleccion1);
      } else {
        await state.update({ dia: ctx.body });
        return await gotoFlow(flowNombre);
      }
    }
  )


export default flowSeleccion1

