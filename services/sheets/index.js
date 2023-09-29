import { JWT } from "google-auth-library";

import dotenv from "dotenv";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

/* const { GoogleSpreadsheet } = require('google-spreadsheet'); */

class GoogleSheetService {
  jwtFromEnv = undefined;
  doc = undefined;

  constructor(id = undefined, googleSpreadsheet) {
    if (!id) {
      throw new Error("ID_UNDEFINED");
    }

    dotenv.config();

    this.jwtFromEnv = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });
    this.doc = googleSpreadsheet;
  }

  async calcularHorariosDisponibles(diaSeleccionado, nombreServicio) {
    try {
      const sheetCitas = this.doc.sheetsByIndex[0];
      const sheetServicios = this.doc.sheetsByIndex[1];

      const citasProgramadas = await this.obtenerCitasProgramadas(sheetCitas);
      const duracionServicio = await this.obtenerDuracionServicio(sheetServicios, nombreServicio);

      const minutosInicio = this.convertirHoraAMinutos24Horas("10:00");
      const minutosFin = this.convertirHoraAMinutos24Horas("20:00");

      const horariosDisponibles = [];

      for (let minutos = minutosInicio; minutos < minutosFin; minutos += duracionServicio) {
        const horaInicio = this.convertirMinutosAHora24Horas(minutos);
        const horaFinalizacion = this.convertirMinutosAHora24Horas(minutos + duracionServicio);

        const esHoraDisponible = !citasProgramadas.some((cita) => {
          const horaCitaInicio = cita[1];
          const horaCitaFin = cita[2];

          return (
            horaInicio >= horaCitaInicio && horaInicio < horaCitaFin ||
            horaFinalizacion > horaCitaInicio && horaFinalizacion <= horaCitaFin
          );
        });

        if (esHoraDisponible) {
          horariosDisponibles.push({ horaInicio, horaFinalizacion });
        }
      }

      return horariosDisponibles;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async obtenerDuracionServicio(sheetServicios, nombreServicio) {
    await sheetServicios.loadCells("A2:B");

    const numRows = sheetServicios.rowCount;

    for (let i = 2; i <= numRows; i++) {
      const servicio = sheetServicios.getCellByA1(`A${i}`).value;
      const duracion = sheetServicios.getCellByA1(`B${i}`).value;

      if (servicio === nombreServicio) {
        return duracion;
      }
    }

    throw new ServiceNotFoundError(nombreServicio);
  }

  async obtenerCitasProgramadas(sheet) {
    await sheet.loadCells("A1:D");

    const citas = [];
    const rows = await sheet.getRows();

    for (const row of rows) {
      const fecha = row.getCellByCol(1).value;
      const horaInicio = row.getCellByCol(2).value;
      const horaFin = row.getCellByCol(3).value;
      const servicio = row.getCellByCol(4).value;

      citas.push([fecha, horaInicio, horaFin, servicio]);
    }

    return citas;
  }

  convertirHoraAMinutos24Horas(hora) {
    const [hh, mm] = hora.split(':');
    const minutos = parseInt(hh) * 60 + parseInt(mm);
    return minutos;
  }

  convertirMinutosAHora24Horas(minutos) {
    const hh = Math.floor(minutos / 60).toString().padStart(2, '0');
    const mm = (minutos % 60).toString().padStart(2, '0');
    return `${hh}:${mm}`;
  }
}

class ServiceNotFoundError extends Error {
  constructor(serviceName) {
    super(`The service "${serviceName}" was not found in the services sheet.`);
    this.name = "ServiceNotFoundError";
  }
}

export default GoogleSheetService;
