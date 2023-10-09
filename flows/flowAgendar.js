import bot from "@bot-whatsapp/bot";
import checkAvailability from '../services/sheets/index.js'

const flowAgendar = bot
.addKeyword('bot')
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
    
    await state.update({ horario: ctx.body })
    await state.update({ telefono: ctx.from })
    const myState = state.getMyState()
    console.log(myState)

    const validarHorarios=await checkAvailability(myState.dia,myState.horario,myState.servicio)
        await flowDynamic('Bien,los siguientes horarios disponibles son :');
        for(const horarios of validarHorarios){
            await flowDynamic(
          `Inicio: ${formatDate(horarios.startTime)} ${formatTime(horarios.startTime)}, Fin: ${formatDate(horarios.endTime)} ${formatTime(slot.endTime)}`
        )
      }
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