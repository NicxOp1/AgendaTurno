/* import bot from "@bot-whatsapp/bot";
import { agendarTurno } from "../services/sheets/index.js";
/* import flowSelecion from "./flowSeleccion.js";
 */
/*
const errorMessages = {
    invalidFormat: "Formato de fecha incorrecto, recuerda que es DD/MM/AA.",
    notFutureDate: "No puedes reservar un turno con menos de 24hs de anticipación.",
    notValidDay: "Lo siento, domingos y lunes no trabajamos, selecciona otra fecha."
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
    }ss
  
    let diaSemana = fecha.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      return { valido: false, log: errorMessages.notValidDay };
    }
  
    return { valido: true, log: "Fecha válida." };
  }

const flowCambiarFecha = bot
.addKeyword("Cambiar")
.addAnswer("Perfecto, Ingrese el dia al que quieres cambiar",
        "Recuerda que debe ser un dia futuro al seleccionado previamente",
         "Recordá el formato DD/MM/AA",
        { capture: true, delay : 2000 },
        async (ctx, { state, flowDynamic,gotoFlow,endFlow }) => {
            const resultado = validarFecha(ctx.body); */
/*             let error = 0
            if (!resultado.valido) {
              flowDynamic(resultado.log);
              error+1
              await state.update({ errorHandler: error });
              const myState = state.getMyState();
              if(myState.errorHandler>=3){
                return endFlow({body: 'Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
              }
              /* return await gotoFlow(flowSelecion); *//* 
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
            } */
     /*}
)
export default flowCambiarFecha; */