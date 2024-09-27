import mongoose from "mongoose";
const { Schema } = mongoose;

const mediaSchema = new Schema({
  resourceType: { type: String, required: true },
  status: { type: String, required: true },
  type: {
    coding: [
      {
        system: { type: String, required: true },
        code: { type: String, required: true },
        display: { type: String, required: true },
      },
    ],
  },
  subject: {
    reference: { type: String, required: true },
    display: { type: String },
  },
  context: {
    reference: { type: String, required: true },
    display: { type: String },
  },
  created: { type: String, required: true },
  content: {
    contentType: { type: String, required: true },
    url: { type: String, required: true },
  },
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;

/**
 * id: int;  // Identificador único del Media
resourceType: string;  // "Media"
status: string;  // Estado del Media (ej: "available")
type: { 
    coding: [{ 
        system: string;  // URI que identifica el sistema de codificación
        code: string;  // Código para el tipo de media (ej: "image/jpeg")
        display: string;  // Descripción del tipo de media
    }];
};
subject: { 
    reference: string;  // Referencia al recurso Patient (ej: "Patient/123")
    display: string;  // Nombre del paciente para mostrar
};
context: { 
    reference: string;  // Referencia al ImagingStudy asociado (ej: "ImagingStudy/study-001")
    display: string;  // Descripción del contexto
};
created: string;  // Fecha de creación del recurso Media
content: { 
    contentType: string;  // Tipo de contenido (ej: "image/jpeg")
    url: string;  // URL donde se almacena la imagen
};

id: int;
resourceType: string;
status: string;
type: { 
    coding: [{ 
        system: string;
        code: string;
        display: string;
    }];
};
subject: { 
    reference: string;
    display: string;
};
context: { 
    reference: string;
    display: string;
};
created: string;
content: { 
    contentType: string;
    url: string;
};
 */
