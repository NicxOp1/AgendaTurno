//este es el 
import bot from "@bot-whatsapp/bot";
import { consultarTurnos } from "../services/sheets/index.js";
/* import pkg from '@bot-whatsapp/bot';
const {EVENTS} = pkg; */
let error = 0;
const errorMessages = {
  invalidFormat: "Formato de fecha incorrecto.",
  notFutureDate: "La fecha debe ser futura.",
  notValidDay: "La fecha no puede ser ni lunes ni domingo.",
  tooFarFuture: "La fecha no puede excederse a más de 3 meses de la fecha actual."
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
const flowSelecion2 = bot
.addKeyword("2",{ sensitive: true })
.addAnswer(
   `Perfecto aquí se encuentran tus turnos ya agendados..
  Recuerda siempre que quieras *Cancelar*`
)
.addAction(
  {delay: 2000 },
  async (ctx, { state, gotoFlow, flowDynamic }) => {
    const myState = state.getMyState();
    console.log(myState.telefono)
    let consulta = consultarTurnos(myState.telefono)
    console.log("Turnos consultados ✖✖➖➖✖✖➖✖✖ ",consulta)
    return consulta['Fecha']
  /*   const resultado = validarFecha(ctx.body); */
    /* 
    if (!resultado.valido) {
      error++
      flowDynamic(resultado.log);
       console.log(`CANTIDAD DE ERRORES ✖✖➖➖✖✖➖✖✖ ${error}`) 
      await state.update({ errorHandler: error });
      const myState = state.getMyState();
      if(myState.errorHandler>=3){
        return endFlow({body: 'Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
      }
      return gotoFlow(flowSelecion);
    } else {
      await state.update({ dia: ctx.body });
      return await gotoFlow(flowBusqueda);
    } */
  }
)
export default flowSelecion2