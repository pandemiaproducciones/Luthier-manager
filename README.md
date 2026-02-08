# Luthier Manager v1.0 🎷

**Sistema de Gestión Integral para Talleres de Luthier.**
Conectado a Google Sheets para un control total sin necesidad de servidores complejos.

## 🚀 Características Principales

### 🛠️ Gestión de Taller
* **Historial por Filas:** Cada ingreso genera un ticket único, permitiendo un historial infinito por instrumento.
* **Base de Datos en la Nube:** Todos los datos (clientes, inventario, reparaciones) viven en Google Sheets.
* **Buscador Inteligente:** Encuentra instrumentos por serie, cliente o agrupación en milisegundos.

### ⏱️ Control de Productividad
* **Cronómetro Integrado:** Modo "Enfoque" a pantalla completa para registrar el tiempo real de trabajo en cada ticket.
* **Cálculo de Costos:** Suma automática de Mano de Obra + Repuestos.

### 📱 Experiencia de Usuario
* **Login Seguro:** Acceso restringido para el luthier y administradores.
* **Integración con WhatsApp:** Genera mensajes automáticos para notificar al cliente cuando su instrumento está listo.
* **Interfaz Responsiva:** Diseñada con tipografía Montserrat y lista para usar en tablet o PC.

## 📦 Instalación

1. **Google Sheet:**
   Crea una copia de la estructura de base de datos requerida (Pestañas: USUARIOS, CLIENTES, INVENTARIO, REPARACIONES).

2. **Google Apps Script:**
   - Abre tu hoja de cálculo.
   - Ve a `Extensiones` > `Apps Script`.
   - Copia el contenido de `src/Code.js` en el archivo `.gs`.
   - Copia el contenido de `src/index.html` en un archivo HTML nuevo.

3. **Despliegue:**
   - Haz clic en `Implementar` > `Nueva implementación`.
   - Tipo: `Aplicación web`.
   - Acceso: `Cualquier usuario`.

## 🛠️ Tecnologías

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Backend:** Google Apps Script.
* **Base de Datos:** Google Sheets.

---
*Desarrollado para optimizar el flujo de trabajo de luthieres profesionales.*

