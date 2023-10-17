import bot from "@bot-whatsapp/bot";
import flowBusqueda from "./flowBusqueda.js";
/* import pkg from '@bot-whatsapp/bot';
const {EVENTS} = pkg; */

const errorMessages = {
  invalidFormat: "Formato de fecha incorrecto.",
  notFutureDate: "La fecha debe ser futura.",
  notValidDay: "La fecha no puede ser ni lunes ni domingo."
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

  let diaSemana = fecha.getDay();
  if (diaSemana === 0 || diaSemana === 6) {
    return { valido: false, log: errorMessages.notValidDay };
  }

  return { valido: true, log: "Fecha válida." };
}

const flowSelecion = bot
  .addKeyword("1",{ sensitive: true }) //Reservar un turno
  .addAnswer(
    "Ingresá la fecha que buscas atenderte. Recordá el formato DD/MM/YY"
  )
  .addAction(
    { capture: true, delay: 2000 },
    async (ctx, { state, fallBack, gotoFlow, flowDynamic }) => {
      const resultado = validarFecha(ctx.body);
      if (!resultado.valido) {
        flowDynamic(resultado.log);
        return gotoFlow(flowSelecion);
      } else {
        await state.update({ dia: ctx.body });
        return gotoFlow(flowBusqueda);
      }
    }
  )
export default flowSelecion;
