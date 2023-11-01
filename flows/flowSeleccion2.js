//este es el 
import bot from "@bot-whatsapp/bot";
import { consultarTurnos } from "../services/sheets/index.js";
import flowSeleccionarTurno from "./flowSeleccionarTurno.js";
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
const flowConsultar = bot
.addKeyword("2",{ sensitive: true })
.addAnswer(
   `Perfecto aquí se encuentran tus turnos ya agendados..
Recuerda siempre que quieras *Cancelar*`,
  {capture:false },
  async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
    const myState = state.getMyState();
    console.log(myState.telefono)
    let mensaje = await consultarTurnos(myState.telefono)
    console.log("Turnos consultados ✖✖➖➖✖✖➖✖✖ ",mensaje.contadorTurnos)
    await state.update({contadorTurnos:mensaje.contadorTurnos});

    if(mensaje.contadorTurnos>0){
      await flowDynamic(mensaje.mensaje)
      return gotoFlow(flowSeleccionarTurno)
    }else{
      flowDynamic("no tienes ningun turno agendado.!")
      return endFlow()
    }
  }
)
export default flowConsultar