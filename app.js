import "dotenv/config";
import bot from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import MockAdapter from "@bot-whatsapp/database/mock";
import flowPrincipal from "./flows/flowBienvenida.js"
import flowSeleccion1 from "./flows/flowSeleccion.js";
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
import flowSeleccion4 from "./flows/flowSeleccion4.js";
import flowBarbero from "./flows/flowBarbero.js";
import flowSeleccionBarbero from "./flows/flowSeleccionBarbero.js";
import flowSeleccion5 from "./flows/flowSeleccion5.js";

const GLOBAL_STATE = [];
export default function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = bot.createFlow([
    flowPrincipal,
    flowSeleccion1,
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
    flowSeleccion4,
    flowSeleccionBarbero,
    flowSeleccion5
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
