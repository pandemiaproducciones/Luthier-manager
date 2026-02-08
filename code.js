/* LUTHIER MANAGER v1.0 
  Backend - Google Apps Script
*/

const SHEET_ID = "1Nd8iiB3cATuQy6g2CeeT5bulat8siprSr0h4LnS1eks"; // Tu ID real

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Luthier Manager v1.0')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// --- CONEXIÓN BASE DE DATOS ---
function getSheet(name) {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
}

// --- LOGIN ---
function validarLogin(usuario, clave) {
  const sheet = getSheet("USUARIOS");
  const data = sheet.getDataRange().getValues(); // Fila 1 son headers
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == usuario && data[i][1] == clave) {
      return { 
        success: true, 
        nombre: data[i][2], 
        rol: data[i][3] 
      };
    }
  }
  return { success: false };
}

// --- CLIENTES ---
function buscarClientes(query) {
  const sheet = getSheet("CLIENTES");
  const data = sheet.getDataRange().getValues();
  const resultados = [];
  
  for (let i = 1; i < data.length; i++) {
    const nombre = String(data[i][1]).toLowerCase();
    const agrupacion = String(data[i][4]).toLowerCase();
    if (nombre.includes(query.toLowerCase()) || agrupacion.includes(query.toLowerCase())) {
      resultados.push({
        id: data[i][0],
        nombre: data[i][1],
        telefono: data[i][2],
        agrupacion: data[i][4]
      });
    }
  }
  return resultados;
}

function crearCliente(datos) {
  const sheet = getSheet("CLIENTES");
  const id = "CLI-" + new Date().getTime().toString().slice(-6);
  sheet.appendRow([id, datos.nombre, datos.telefono, datos.email, datos.agrupacion]);
  return { success: true, id: id, nombre: datos.nombre };
}

// --- REPARACIONES ---
function guardarIngreso(datos) {
  const sheet = getSheet("REPARACIONES");
  const idTicket = "TKT-" + new Date().getTime().toString().slice(-5);
  const fecha = new Date();
  
  // Orden: ID_Ticket, Fecha_Ingreso, Cliente, Instrumento, Marca, Serie, Estado, Diagnostico, Trabajo_Realizado, Repuestos_Usados, Tiempo_Invertido, Costo_Total
  sheet.appendRow([
    idTicket, 
    fecha, 
    datos.cliente, 
    datos.instrumento, 
    datos.marca, 
    datos.serie, 
    "Recibido", 
    datos.diagnostico, 
    "", "", "00:00:00", 0
  ]);
  
  return { success: true, id: idTicket };
}

function obtenerHistorial(query) {
  const sheet = getSheet("REPARACIONES");
  const data = sheet.getDataRange().getValues();
  const resultados = [];
  
  // Búsqueda por Serie (Col 5) o Cliente (Col 2) - Indices base 0
  for (let i = 1; i < data.length; i++) {
    const serie = String(data[i][5]).toLowerCase(); 
    const cliente = String(data[i][2]).toLowerCase();
    
    if (serie.includes(query.toLowerCase()) || cliente.includes(query.toLowerCase())) {
      resultados.push({
        ticket: data[i][0],
        fecha: new Date(data[i][1]).toLocaleDateString(),
        cliente: data[i][2],
        instrumento: data[i][3],
        marca: data[i][4],
        serie: data[i][5],
        estado: data[i][6],
        diagnostico: data[i][7]
      });
    }
  }
  return resultados.reverse(); // Mostrar más recientes primero
}

function actualizarEstado(ticketId, nuevoEstado, tiempo, costo) {
  const sheet = getSheet("REPARACIONES");
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == ticketId) {
      // Actualizar Estado (Col 6), Tiempo (Col 10), Costo (Col 11)
      const range = sheet.getRange(i + 1, 7); // Columna 7 es Estado
      range.setValue(nuevoEstado);
      
      if(tiempo) sheet.getRange(i + 1, 11).setValue(tiempo);
      if(costo) sheet.getRange(i + 1, 12).setValue(costo);
      
      return { success: true };
    }
  }
  return { success: false };
}
