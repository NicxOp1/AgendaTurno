import bot from "@bot-whatsapp/bot";
import consultarTurnos from '../services/sheets/index.js'

const flowAgendar = bot
.addKeyword('PERDO')
.addAnswer(
    '¿Cual es tu nombre?',
    {capture: true},
    async (ctx, { flowDynamic, state }) => {
        await state.update({ nombre: ctx.body })
        flowDynamic()
    }
)         
  .addAnswer(
    "Dime el horario que te gustaria el turno",
    { capture: true },
    async (ctx, { state,flowDynamic }) => {
        if(/^(10:00|1[0-8]:[0-2]\d|18:30)$/.test(ctx.body)){
          await state.update({ horario: ctx.body })
          await state.update({ telefono: ctx.from })
        }else{
          return 'lo siento , escribiste mal el horario, recorda que solo aceptamos turnos de 10:00 a 18:30'
        }
      const myState = state.getMyState()
      console.log(myState)
      const verTurnos= await consultarTurnos(myState.telefono)
      console.log(verTurnos)
        await flowDynamic(
          `turnos: ${verTurnos}`
        )
      }
    
  )
  export default flowAgendar


/* 

const getMenu = await googelSheet.retriveDayMenu(dayNumber);
      for (const menu of getMenu) {
        GLOBAL_STATE.push(menu);
        await flowDynamic(menu);




  async function consultarDatos(telefono){
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle['Hoja 1'];                        // AQUÍ DEBES PONER EL NOMBRE DE TU HOJA
   
   
   
    consultados = [];




    let rows = await sheet.getRows();
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.Telefono === telefono) {
           
            consultados['Sexo'] = row.Sexo                      // AQUÍ LE PEDIMOS A LA FUNCION QUE CONSULTE LOS DATOS QUE QUEREMOS CONSULTAR EJEMPLO:
            consultados['Nombre'] = row.Nombre        
            consultados['Apellidos'] = row.Apellidos                  // consultados['EL NOMBRE QUE QUIERAS'] = row.NOMBRE DE LA COLUMNA DE SHEET
            consultados['Telefono'] = row.Telefono
            consultados['Edad'] = row.Edad




        }
           
}
           
return consultados




};
 */









/* ESTO VA DE EJEMPLO



*/
/* 
const fechaSolicitada = '04/10/23'; // Fecha en formato DD/MM/YY
const horaSolicitada = '13:00'; // Hora solicitada
const servicioSolicitado = 'Esculpidas'; // Nombre del servicio
const numeroTelefono = '5491140314482'; // Número de teléfono

const resultado = await agendarTurno(fechaSolicitada, horaSolicitada, servicioSolicitado, numeroTelefono);

console.log(resultado); */