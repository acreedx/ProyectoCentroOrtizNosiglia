import mongoose from "mongoose";
const { Schema } = mongoose;

const encounterSchema = new Schema({
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
  participant: [
    {
      type: {
        coding: [
          {
            system: { type: String, required: true },
            code: { type: String, required: true },
            display: { type: String, required: true },
          },
        ],
      },
      period: {
        start: { type: String },
        end: { type: String },
      },
      actor: {
        reference: { type: String, required: true },
        display: { type: String },
      },
    },
  ],
  appointment: {
    reference: { type: String },
  },
  actualPeriod: {
    start: { type: String },
    end: { type: String },
  },
  reason: {
    use: {
      coding: [
        {
          system: { type: String, required: true },
          code: { type: String, required: true },
          display: { type: String, required: true },
        },
      ],
    },
    value: { type: String },
  },
  diagnosis: [
    {
      condition: {
        reference: { type: String, required: true },
      },
      use: {
        coding: [
          {
            system: { type: String, required: true },
            code: { type: String, required: true },
            display: { type: String, required: true },
          },
        ],
      },
    },
  ],
  account: {
    reference: { type: String },
  },
});

const Encounter = mongoose.model("Encounter", encounterSchema);
module.exports = Encounter;

/*
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
participant: [{ 
    type: { 
        coding: [{ 
            system: string; 
            code: string; 
            display: string; 
        }]; 
    }; 
    period: { 
        start: string; 
        end: string; 
    }; 
    actor: { 
        reference: string;
        display: string; 
    }; 
}]; 
appointment: { 
    reference: string;
}; 
actualPeriod: { 
    start: string; 
    end: string; 
}; 
reason: { 
    use: { 
        coding: [{ 
            system: string; 
            code: string; 
            display: string; 
        }]; 
    }; 
    value: string; 
}; 
diagnosis: [{ 
    condition: { 
        reference: string;
    }; 
    use: { 
        coding: [{ 
            system: string; 
            code: string; 
            display: string; 
        }]; 
    }; 
}]; 
account: { 
    reference: string;
};
*/
