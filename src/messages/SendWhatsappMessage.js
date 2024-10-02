// sendWhatsAppMessage.js
import pkg from "twilio";
const { Twilio } = pkg;
const accountSid = "ACf8cfcff85381dbfa10745d54e429f3d4";
const authToken = "7f3916f7d0c4a95988e01ba904843074";

const client = new Twilio(accountSid, authToken);

async function sendWhatsAppMessage({ nombre, mensaje, destino }) {
  // Usar el mensaje dinámico en lugar de uno fijo
  console.log(nombre, mensaje, destino);
  const bodyMessage = mensaje.replace("{nombre}", nombre);

  const message = await client.messages.create({
    from: "whatsapp:+14155238886",
    to: `whatsapp:${destino}`, // Número del destinatario pasado como parámetro
    body: bodyMessage,
  });

  console.log(`Mensaje enviado a ${nombre}: `, message.sid);
}

export default sendWhatsAppMessage;
