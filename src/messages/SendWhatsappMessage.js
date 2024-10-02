// sendWhatsAppMessage.js
import pkg from "twilio";
const { Twilio } = pkg;
const accountSid = "ACf8cfcff85381dbfa10745d54e429f3d4";
const authToken = "ea1272ff1c4d650b683ffc743704e8e2";

const client = new Twilio(accountSid, authToken);

async function sendWhatsAppMessage({ nombre, mensaje, destino }) {
  // Usar el mensaje dinámico en lugar de uno fijo
  const bodyMessage = mensaje.replace("{nombre}", nombre);

  const message = await client.messages.create({
    from: "whatsapp:+14155238886",
    to: `whatsapp:${destino}`, // Número del destinatario pasado como parámetro
    body: bodyMessage,
  });

  console.log(`Mensaje enviado a ${nombre}: `, message.sid);
}

export default sendWhatsAppMessage;
