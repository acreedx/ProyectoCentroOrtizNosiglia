import mongoose from "mongoose";
const { Schema } = mongoose;

const auditEventSchema = new Schema(
  {
    resourceType: { type: String, default: "AuditEvent" },
    type: {
      coding: [
        {
          system: { type: String, required: true },
          code: { type: String, required: true },
          display: { type: String, required: true },
        },
      ],
    },
    action: { type: String, required: true },
    severity: { type: String, required: true },
    occurredDateTime: { type: String, required: true },
    outcome: {
      code: { type: String, required: true },
      description: { type: String, required: true },
    },
    patient: {
      reference: { type: String, required: true },
      display: { type: String },
    },
    encounter: {
      reference: { type: String, required: true },
      display: { type: String },
    },
    entity: [
      {
        what: {
          id: { type: Number, required: true },
          reference: { type: String, required: true },
          display: { type: String },
        },
        role: { type: String, required: true },
        detail: [
          {
            type: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
      },
    ],
    agent: [
      {
        who: {
          reference: { type: String, required: true },
          display: { type: String },
        },
        requestor: { type: Boolean, required: true },
        type: {
          coding: [
            {
              system: { type: String, required: true },
              code: { type: String, required: true },
              display: { type: String, required: true },
            },
          ],
        },
        network: {
          address: { type: String, required: true },
          type: { type: String, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const AuditEvent = mongoose.model("AuditEvent", auditEventSchema);

export default AuditEvent;

/*
id: int;
resourceType: string;
type: {
    coding: [{
        system: string;
        code: string;
        display: string;
    }];
};
action: string;  // C, R, U, D (create, read, update, delete)
severity: string;  // low, moderate, high, critical
occurredDateTime: string;  // Date and time of the event
outcome: {
    code: string;
    description: string;
};
patient: {
    reference: string;  // Reference to Patient resource
    display: string;
};
encounter: {
    reference: string;  // Reference to Encounter resource
    display: string;
};
entity: [{
    what: {
        id: int;
        reference: string;
        display: string;
    };
    role: string;  // E.g., 'source' or 'destination'
    detail: [{
        type: string;
        value: string;
    }];
}];
agent: [{
    who: {
        reference: string;  // Reference to Practitioner or related entity
        display: string;
    };
    requestor: boolean;  // Whether the agent initiated the request
    type: {
        coding: [{
            system: string;
            code: string;
            display: string;
        }];
    };
    network: {
        address: string;  // IP address
        type: string;  // 1 for machine, 2 for IP, etc.
    };
}];
*/
