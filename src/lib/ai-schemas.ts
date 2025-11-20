export const receiptSchema = {
  name: "receipt_items",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      vendor: { type: "string", description: "Store or vendor name" },
      purchase_date: { type: "string", description: "ISO-8601 date" },
      currency: { type: "string", description: "Currency code like USD" },
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["name", "category", "amount"],
          properties: {
            name: { type: "string" },
            category: { type: "string" },
            amount: { type: "number" },
            note: {
              type: "string",
              description: "Short description or modifiers when useful",
            },
          },
        },
      },
      total: { type: "number" },
    },
    required: ["items"],
  },
} as const;

export const voiceSchema = {
  name: "voice_expenses",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      summary: { type: "string" },
      mood: { type: "string" },
      purchases: {
        type: "array",
        items: {
          type: "object",
          required: ["merchant", "amount", "category"],
          properties: {
            merchant: { type: "string" },
            category: { type: "string" },
            amount: { type: "number" },
            paymentMethod: {
              type: "string",
              description: "card, cash, transfer, etc.",
            },
            note: { type: "string" },
          },
        },
      },
    },
    required: ["purchases"],
  },
} as const;

