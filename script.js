// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);

// Obtener los valores de los parámetros
var nro_boleta = params.has('boleta') ? params.get('boleta') : "10000";
var nombre_cliente = params.has('cliente') ? params.get('cliente') : "NOMBRE CLIENTE";
var usuario = params.has('usuario') ? params.get('usuario') : "USUARIO";
var puntos = params.has('puntos') ? params.get('puntos') : "0";
var telefono = params.has('telefono') ? params.get('telefono') : "999999999";
var codigo_pais = params.has('codigo_pais') ? params.get('codigo_pais') : "+";
var fecha = params.has('fecha') ? params.get('fecha') : "31/05/2025 10:00:23";
var fecha_entrega = params.has('fecha_entrega') ? params.get('fecha_entrega') : "31/05/2025 10:00:23";
var total = params.has('total') ? params.get('total') : "100";
var total_a_pagar = params.has('total_a_pagar') ? params.get('total_a_pagar') : "50";
var descuento = params.has('descuento') ? params.get('descuento') :  '0.00';
var a_cuenta = params.has('a_cuenta') ? params.get('a_cuenta') : "0";
var desc_por_prenda = params.has('desc_por_prenda') ? params.get('desc_por_prenda') : "0";
var pagado_con = params.has('pagado_con') ? params.get('pagado_con') : "0";
var a_cuenta_dos = params.has('a_cuenta_dos') ? params.get('a_cuenta_dos') : "0";
var pagado_con_dos = params.has('pagado_con_dos') ? params.get('pagado_con_dos') : "0";
var porcent_desc = params.has('porcent_desc') ? params.get('porcent_desc') : "0";
var porcent_desc_plata = params.has('porcent_desc_plata') ? params.get('porcent_desc_plata') : "0";
var total_por_pagar = params.has('total_por_pagar') ? params.get('total_por_pagar') : "0";
var estado = params.has('estado') ? params.get('estado') : "PAGADO";
var total_prendas = params.has('total_prendas') ? params.get('total_prendas') : "";      
var cantidades = params.has('cantidades') ? params.get('cantidades') : "10";
var descripciones = params.has('servicios') ? params.get('servicios') : "AL AGUA: SABANAS 2 PLZ Ploma cuadritos blancos basement home";
var detalle = params.has('detalles') ? params.get('detalles') : "TERNO";
var p_units = params.has('p_unit') ? params.get('p_unit') : "15";
var subtotal = params.has('subtotal') ? params.get('subtotal') : "150";

// crea una lista de cada columna a partir de las comas.
cantidades = cantidades.split(",");
descripciones = descripciones.split(",");
detalle = detalle.split(",");
p_units = p_units.split(",");

// Crea una lista para mostrar en cada fila de la tabla
var result = [];
cantidades.forEach(function(value, id) {
    result[id] = {
        cantidad: cantidades[id],
        descripcion: descripciones[id], 
        detalle: detalle[id],
        subtotal: subtotal[id],
        precio_unit: p_units[id] ? parseFloat(p_units[id]).toFixed(2) : "0.00",
    };
});

// Función auxiliar de redondeo (ya la tenías)
function redondearPersonalizado(valor) {
    let entero = Math.floor(valor); 
    let decimales = valor - entero;
    let decima = Math.round(decimales * 10) / 10;
    let resultado = entero + decima;
    return resultado.toFixed(2);
}

// Construir tabla
function construirTabla() {
  var tablaBody = document.getElementById("tablaBody");
  tablaBody.innerHTML = `
    <tr class="table-header">
      <th><h2>Cant</h2></th>
      <th><h2>Descripción</h2></th>
      <th><h2>Subtotal</h2></th>
    </tr>
  `;
  result.forEach(function(row) {
    var newRow = document.createElement("tr");
    newRow.className = "table-item";
    var subtotalCalculado = (parseFloat(row.cantidad) || 0) * (parseFloat(row.precio_unit) || 0);
    var subtotalRedondeado = redondearPersonalizado(subtotalCalculado);
    newRow.innerHTML = `
      <td class="itemtab" style="text-align: left; font-size: 0.5mm;">${row.cantidad}</td>
      <td class="itemtab" style="text-align: right; font-size: 0.5mm;">${row.descripcion} ${parseFloat(row.precio_unit).toFixed(2)}</td>
      <td class="itemtab" style="text-align: right; font-size: 0.5mm;">${subtotalRedondeado}</td>
    `;
    tablaBody.appendChild(newRow);
  });
}
construirTabla();

// Abrir popup (si lo usas)
function abrirPopup(event, url) {
  event.preventDefault();
  window.open(url,'Ticket','width=400,height=600,scrollbars=no,resizable=no,top=100,left=100');
}

/* -------------------- ACORTADOR (tu propio servidor) -------------------- */
async function shortURL(urlLarga) {
  try {
    const formData = new FormData();
    formData.append('url', urlLarga);
    const response = await fetch('https://miticket.sysventa.com/acortar.php', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error("Error al conectar con el servidor del acortador");
    const shortedURL = (await response.text()).trim();
    return shortedURL;
  } catch (error) {
    console.error("Error al acortar la URL:", error);
    throw error;
  }
}

/* -------------------- TÉRMINOS (texto plano para enviar por WhatsApp) -------------------- */
const termsText = `Términos y Condiciones del Servicio
>>>LAVADO AL PESO || ROPA X KG (Polo, camisa, pantalón, medias, ropa interior, etc ropa de uso diario NO PRENDAS DELICADAS O DE TRATAMIENTO ESPECIAL) <<<

1. El cliente traerá debidamente separadas sus prendas blancas de las de color o las separa, posterior al ser pesadas. 
2. El personal no separa prendas y tampoco verifica el estado de estas (desgastes, encajes, empedrados y demás).
3. Si en el servicio de lavado de ropa x kg (ropa de uso diario), se detecta otra(s) prenda(s) como sabanas, edredones, etc. Se hará un cobro adicional por dicha prenda. (Aplica a toda prenda que no sea ropa de uso diario).
4. No nos RESPONSABILIZAMOS por prendas dañadas por causa de objetos olvidados en ellas como; encendedores, lapiceros, llaves, alimentos, golosinas, lápiz labial, etc. (NO A LUGAR RECLAMOS).
5. No somos RESPONSABLES por prendas manchadas o desmanchadas, estiradas o encogidas, rotas producto de malos tintes o calidad de tela.
6. El servicio de lavado de ropa por kg, no incluye el lavado a detalle de la(s) prenda(s).
7. No aceptamos: TRAJES DE GALA, VESTIDOS DE SEDA Y LANA, CHALECOS, ESMOQUIN, CALZADO EN GENERAL, MOCHILAS, DISFRACES Y NINGUNA PRENDA QUE SEA LAVADA AL SECO O VAPOR

ENTREGA ROPA DE USO DIARIO (AL PESO – X KG): 24 HORAS DESPUES
ENTREGA DE PRENDAS UNITARIAS (Edredones, sabanas, etc): 48 HORAS DESPUES`;

/* -------------------- Mensajes predefinidos -------------------- */
const mensajes = [
  "Hola! Enviamos su ticket de atención: {link}",
  "Saludos! adjuntamos su ticket de atención: {link}",
  "Estimado usuario!! , adjuntamos su ticket: {link}",
  "Buen día! enviamos su nota de atenciión: {link}",
  "Estimado cliente, su ticket está disponible en el siguiente link: {link}",
  "Hola! en el siguiente lin podra visualizar su ticket de venta: {link}",
  "Saludos! para verificar su ticket, clik en el siguiente link: {link}",
  "Hola, adjuntamos el ticket de atención por el sevicio: {link}",
  "Estimado usuario , en el siguiente link podra encontrar su ticket: {link}",
  "Hola! para revisar el detalle de su ticket , clik en el siguiente link: {link}"
];

/* -------------------- Evento: Enviar por Evolution API (y agregar términos al caption) -------------------- */
document.getElementById('sendMessageButton').addEventListener('click', async function () {
  const statusMessage = document.getElementById('statusMessage');
  const sendMessageButton = document.getElementById('sendMessageButton');

  // Mostrar mensaje de carga
  if (statusMessage) {
    statusMessage.style.display = 'block';
    statusMessage.textContent = 'Enviando Whatsapp...';
    statusMessage.className = 'loading';
  }
  if (sendMessageButton) sendMessageButton.disabled = true;

  const url = "https://mensajero-evolution-api.ykf6ye.easypanel.host/message/sendMedia/acuamaticinstancia";
  const apikey = "3CB27EF6696B-40C1-8AF8-A227EFD74AB8";
  const numeroTelefono = `+51${telefono}`;
  const longURL = window.location.href;

  try {
    // Acortar la URL
    const shortedURL = await shortURL(longURL);

    // Seleccionar mensaje
    const ahora = new Date();
    const hora = ahora.getHours();
    const minuto = ahora.getMinutes();
    const segundo = ahora.getSeconds();
    const index = (hora + minuto + segundo) % mensajes.length;

    // Construir caption: mensaje + link + términos
    // IMPORTANTE: el termsText es texto plano y se añade al final
    const captionMessage = `*LAVANDIA*\n\n${mensajes[index].replace("{link}", shortedURL)}\n\n${termsText}`;

    const body = {
      "number": numeroTelefono,
      "mediatype": "image",
      "mimetype": "image/png",
      "caption": captionMessage,
      "media": "https://iili.io/3wDiY41.png",
      "fileName": "Imagem.png",
      "delay": 1200,
      "quoted": {
        "key": { "id": "MESSAGE_ID" },
        "message": { "conversation": "CONTENT_MESSAGE" }
      },
      "mentionsEveryOne": false,
      "mentioned": ["51931200418"]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apikey
      },
      body: JSON.stringify(body)
    });

    const responseData = await response.json();

    if (response.ok) {
      setTimeout(() => {
        if (statusMessage) {
          statusMessage.textContent = '¡Envío exitoso!';
          statusMessage.className = 'success';
        }
        // efecto visual (si existe)
        const whatsappButton = document.getElementById('whatsappButton');
        if (whatsappButton) {
          whatsappButton.disabled = true;
          whatsappButton.style.opacity = "0.5";
          whatsappButton.style.cursor = "not-allowed";
        }
      }, 1500);
    } else {
      console.error('Error en la respuesta:', responseData);
      if (statusMessage) {
        statusMessage.textContent = `Error: ${responseData.message || 'Parece que el whatsapp no existe'}`;
        statusMessage.className = 'error';
      }
      if (sendMessageButton) sendMessageButton.disabled = false;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    if (statusMessage) {
      statusMessage.textContent = `Error en la solicitud: ${error.message}`;
      statusMessage.className = 'error';
    }
    if (sendMessageButton) sendMessageButton.disabled = false;
  }
});

/* -------------------- Antes: función que abre api.whatsapp.com (por si la usas en otra parte) --------------------
   Si llamas a sendWhatsAppMessage() que abre api.whatsapp.com, también incluimos los términos en ese mensaje.
*/
async function sendWhatsAppMessage() {
  var currentURL = window.location.href;
  try {
    var shortedURL = await shortURL(currentURL);
    var message = `Hola!! somos de la lavandería, adjuntamos su ticket de atención virtual 👇\n${shortedURL}\n\n${termsText}`;
    var whatsappLink = 'https://api.whatsapp.com/send?phone=' + codigo_pais + telefono + '&text=' + encodeURIComponent(message) + '&sharelink=1';
    window.open(whatsappLink, '_blank');
  } catch (error) {
    console.error("Error al acortar la URL:", error);
    alert("Hubo un error al acortar la URL. Por favor, intente nuevamente.");
  }
}

/* -------------------- Imprimir ticket -------------------- */
function printTicket() {
  window.print();
}
if (document.getElementById('impresoraButton')) {
  document.getElementById('impresoraButton').addEventListener('click', printTicket);
}

/* -------------------- Rellenar campos del ticket -------------------- */
document.getElementById("nro_boleta_id").textContent = nro_boleta;
document.getElementById("fecha").textContent = fecha;
document.getElementById("nombre_client").textContent = nombre_cliente;
document.getElementById("usuario").textContent = usuario;
document.getElementById("puntos").textContent = puntos;
document.getElementById("fecha_entrega").textContent = fecha_entrega;
document.getElementById("total").textContent = parseFloat(total).toFixed(2);
document.getElementById("descuento").textContent = parseFloat(descuento).toFixed(2);
document.getElementById("a_cuenta").textContent = parseFloat(a_cuenta).toFixed(2);
document.getElementById("a_cuenta_dos").textContent = parseFloat(a_cuenta_dos).toFixed(2);
document.getElementById("total_por_pagar").textContent = parseFloat(total_por_pagar).toFixed(2);
document.getElementById("estado").textContent = estado;
document.getElementById("total_prendas").textContent = total_prendas;

/* -------------------- Ocultar botones si sharelink=1 -------------------- */
var sendMessageButton = document.getElementById('sendMessageButton');
var impresoraButton = document.getElementById('impresoraButton');
var currentURL = window.location.href;
if (currentURL.indexOf('sharelink=1') !== -1) {
  if (sendMessageButton) sendMessageButton.style.display = 'none';
  if (impresoraButton) impresoraButton.style.display = 'none';
}
console.log(`Teléfono obtenido: ${telefono}`);

/* -------------------- Generar QR (si usas) -------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const qr = params.has('qr') ? params.get('qr') : "sddsd12";

  const qrElement = new QRious({
    element: document.getElementById('qr-code'),
    value: qr,
    size: 100
  });
});
