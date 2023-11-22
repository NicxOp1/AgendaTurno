import "dotenv/config";
import bot from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";
import flowPrincipal from "./flows/flowBienvenida.js"
import flowSelecion1 from "./flows/flowSeleccion.js";
import flowConsultar from "./flows/flowSeleccion2.js";
import flowSeleccion3 from "./flows/flowSeleccion3.js";
import flowBusqueda from "./flows/flowBusqueda.js";
import flowAgendar from "./flows/flowAgendar.js";
import flowReagendar from "./flows/flowReagendar.js";
import flowCambiarFecha from "./flows/flowCambiarFecha.js";
import flowSeleccionarTurno from "./flows/flowSeleccionarTurno.js";
import flowConfirmarCancelacion from "./flows/flowConfirmarCancelacion.js";
import flowConfirmarCancelacionPBorrar from "./flows/flowConfirmarCancelacionPBorrar.js"
import flowSeleccionarTurnoPBorrar from "./flows/flowSeleccionarTurnoPBorrar.js";
import flowNombre from "./flows/flowNombre.js";
import flowSelecion4 from "./flows/flowSeleccion4.js";
import flowBarbero from "./flows/flowBarbero.js";

const GLOBAL_STATE = [];
export default function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = bot.createFlow([
    flowPrincipal,
    flowSelecion1,
    flowBarbero,
    flowSeleccion3,
    flowConsultar,
    flowNombre,
    flowBusqueda,
    flowAgendar,
    flowReagendar,
    flowCambiarFecha,
    flowSeleccionarTurno,
    flowConfirmarCancelacion,
    flowConfirmarCancelacionPBorrar,
    flowSeleccionarTurnoPBorrar,
    flowSelecion4
  ]);
  const adapterProvider = bot.createProvider(BaileysProvider);

  bot.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();

/* Crear un flujo de conversación para un chatbot que permita a los usuarios agendar turnos es un proceso que implica la planificación de interacciones y la consideración de diversos escenarios. Aquí hay una guía paso a paso para crear un flujo de conversación básico para un chatbot de agendamiento de turnos:

Paso 1: Definir Objetivos y Alcance

Antes de comenzar, debes definir claramente los objetivos y el alcance de tu chatbot de agendamiento de turnos. ¿Qué tipo de turnos se pueden agendar? ¿Para qué tipo de servicio o negocio? ¿Cuál es la información necesaria para agendar un turno? Establece metas claras para tu chatbot.

Paso 2: Identificar las Intenciones del Usuario

Identifica las diferentes intenciones que los usuarios pueden tener al interactuar con el chatbot. Algunas posibles intenciones incluyen:

Agendar un nuevo turno.
Consultar o cambiar un turno existente.
Cancelar un turno.
Obtener información sobre disponibilidad de turnos.
Preguntas frecuentes sobre el proceso de agendamiento.
Paso 3: Diseñar el Flujo de Conversación

Diseña un flujo de conversación que guíe a los usuarios a través de estas intenciones. Puedes utilizar un diagrama de flujo o una lista de pasos para visualizar cómo se desarrollará la conversación. Asegúrate de incluir saludos, despedidas y mensajes de confirmación en cada paso.

Por ejemplo, un flujo de conversación básico podría ser:

Saludo inicial del chatbot.
Usuario: "Quiero agendar un turno".
Chatbot: "Por supuesto, ¿para qué fecha y hora te gustaría agendar el turno?".
Usuario: Proporciona la fecha y la hora deseadas.
Chatbot: "¿Para qué servicio te gustaría agendar el turno?".
Usuario: Especifica el servicio.
Chatbot: "Gracias. ¿Cuál es tu nombre y número de contacto?".
Usuario: Proporciona el nombre y el número de contacto.
Chatbot: "Hemos agendado tu turno para [fecha y hora] para el servicio de [servicio]. ¿Deseas confirmar?".
Usuario: Confirma o solicita cambios.
Chatbot: Confirma el turno o realiza los cambios necesarios.
Despedida del chatbot.
Paso 4: Implementar el Chatbot

Utiliza una plataforma de desarrollo de chatbots o un marco de trabajo de chatbots como Dialogflow, BotPress, o Microsoft Bot Framework para implementar tu chatbot. Configura las intenciones, entidades y diálogos de acuerdo con el flujo de conversación que diseñaste.

Paso 5: Prueba y Ajusta

Realiza pruebas exhaustivas de tu chatbot para asegurarte de que funcione correctamente en diferentes escenarios. Ajusta el flujo de conversación y las respuestas del chatbot según sea necesario.

Paso 6: Manejo de Errores y Excepciones

Ten en cuenta los posibles errores o excepciones que puedan ocurrir durante la conversación, como fechas no válidas, servicios no disponibles, etc. Diseña respuestas para manejar estos casos y proporciona una opción para que los usuarios obtengan ayuda humana si es necesario.

Paso 7: Implementar la Integración

Si el chatbot interactúa con un sistema de agendamiento real, como un calendario o una base de datos, asegúrate de que la integración funcione correctamente para reservar los turnos y actualizar la información.

Paso 8: Documentación y Entrenamiento

Proporciona documentación clara para los usuarios sobre cómo interactuar con el chatbot y agendar turnos. También, capacita al personal que pueda necesitar interactuar con el chatbot o manejar solicitudes de usuarios.

Recuerda que este es solo un flujo de conversación básico y que puedes agregar características adicionales según las necesidades de tu negocio. También puedes mejorar la experiencia del usuario al incluir características como recordatorios de turno por correo electrónico o mensajes de confirmación. */

/* 
const flowTurno  = bot
  .addKeyword(["turno"])
  .addAnswer(
    `Para que servicio te gustaria ?`,
    `1-*Esculpidas*`,
    `2-*Kapping con acrilico*`,
    `3-*kapping con gel*`,
    `4-*Esmaltado Semipermanente*`)
  .addAction({capture:true},async (ctx,{state}) => {
    state.update({nombreServicio:ctx.body})
  })
  .addAnswer(
    `Para que dia te gustaria agendar el turno ?`,
    `Ingrese el dia en formato DD/MM/YY`,
    `ejemplo: 14/05/23`)
  .addAction({ capture: true }, async (ctx, {flowDynamic,gotoFlow}) => {
      const diaSeleccionado = {Day:ctx.body}
      const getHorariosDisponibles = await googelSheet.calcularHorariosDisponibles(diaSeleccionado,nombreServicio);
      for (const horariosLibres of getHorariosDisponibles) {
        GLOBAL_STATE.push(horariosLibres);
        await flowDynamic(horariosLibres);
        await gotoFlow(flowServicio)
      }
    })
 */

/*     const flowServicio = bot
    .addAnswer('Estoy validando que turnos disponibles tengo libres para ese dia', null, async (ctx, {flowDynamic}) => {
        const chequeo  = await googelSheet.buscarTurno()
        const messages = categories.((mapc) => ({body: c.name)})
        await flowDynamic(messages)
    })
 */
    
