import bot from "@bot-whatsapp/bot";
import flowAgendar from "./flowAgendar.js";

const flowSeleccionBarbero = bot
.addKeyword('bot')
.addAnswer(
    `Por favor, selecciona el número del barbero que prefieres:`,
    { capture: true, delay : 2000 },
    async (ctx, {state,gotoFlow,flowDynamic,endFlow }) => {
        const myState = state.getMyState();
        let barberos = myState.barberos;  
        console.log(barberos) 
        let seleccion = parseInt(ctx.body);
        console.log(seleccion);
        if (isNaN(seleccion) || seleccion < 1 || seleccion > barberos.length) {
            // Si la entrada no es un número válido, pide al usuario que intente de nuevo.
            await flowDynamic(`Lo siento, eso no es una opción válida. Por favor, selecciona un número entre 1 y ${barberos.length}.`);
            error++;
            await state.update({ errorHandler: error });
            const myState = state.getMyState();
            console.log(myState.errorHandler)
            if(myState.errorHandler>=3){
              error = 0
              await state.update({ errorHandler: error });
              return endFlow({body: '⚠️Has superado los 3 intentos. Por favor, escribe *Hola* para empezar de nuevo. ¡Gracias!'})
            }
            return gotoFlow(flowSeleccionBarbero);
        } else {
            // Si la entrada es válida, guarda el barbero seleccionado en el estado y continúa con el flujo.
            let barberoSeleccionado = barberos[seleccion - 1];
            await state.update({ barbero: barberoSeleccionado });
            // Aquí puedes continuar con el próximo flujo o enviar un mensaje al usuario confirmando su selección.
            console.log("paso")
            return gotoFlow(flowAgendar)
        }
    }
)

export default flowSeleccionBarbero;
