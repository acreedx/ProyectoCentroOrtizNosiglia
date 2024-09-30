import mongoose from "mongoose";
const { Schema } = mongoose;

const imagingStudySchema = new Schema(
  {
    resourceType: { type: String, default: "ImagingStudy" },
    status: { type: String, required: true },
    subject: {
      reference: { type: String, required: true },
      display: { type: String },
    },
    encounter: {
      reference: { type: String, required: true },
      display: { type: String },
    },
    started: { type: String, required: true },
    modality: {
      coding: [
        {
          system: { type: String, required: true },
          code: { type: String, required: true },
          display: { type: String, required: true },
        },
      ],
    },
    reason: [
      {
        coding: [
          {
            system: { type: String, required: true },
            code: { type: String, required: true },
            display: { type: String, required: true },
          },
        ],
      },
    ],
    description: { type: String },
    series: [
      {
        bodySite: {
          coding: [
            {
              system: { type: String, required: true },
              code: { type: String, required: true },
              display: { type: String, required: true },
            },
          ],
        },
        media: [
          {
            reference: { type: String, required: true },
            display: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ImagingStudy = mongoose.model("ImagingStudy", imagingStudySchema);
/*
id: int;
resourceType: string;
status: string;
subject: { 
    reference: string;
    display: string;
};
encounter: { 
    reference: string;
    display: string;
};
started: string;
modality: { 
    coding: [{ 
        system: string;
        code: string;
        display: string;
    }];
};
reason: [{ 
    coding: [{ 
        system: string; 
        code: string; 
        display: string; 
    }];
}];
description: string;
series: [{ 
    bodySite: { 
        coding: [{ 
            system: string; 
            code: string; 
            display: string; 
        }];
    }; 
    media: [{
        reference: string;
        display: string;
    }];
}];
*/
export default ImagingStudy;
