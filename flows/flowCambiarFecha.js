import bot from "@bot-whatsapp/bot";
import { agendarTurno } from "../services/sheets/index.js";
import flowSelecion1 from "./flowSeleccion.js";
 
let error = 0
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

const flowCambiarFecha = bot
.addKeyword('bot')
.addAnswer(`Perfecto, Ingrese el dia
al que quieres cambiar
Recuerda que debe ser un
dia futuro al seleccionado previamente
Recordá el formato DD/MM/AA`,
        { capture: true, delay : 2000 },
        async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
            const resultado = validarFecha(ctx.body);  
            if (!resultado.valido) {
              flowDynamic(resultado.log);
              error++
              await state.update({ errorHandler: error });
              const myState = state.getMyState();
              if(myState.errorHandler>=3){
                return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
              }
              return await gotoFlow(flowSelecion1); 
            } else {
              await state.update({ dia: ctx.body });
              const myState = state.getMyState();
              const agendar = await agendarTurno(
                myState.dia,
                myState.horario,
                myState.servicio,
                myState.nombre,
                myState.telefono
             );
             flowDynamic(agendar);
              return endFlow()
            } 
     }
)
export default flowCambiarFecha; 