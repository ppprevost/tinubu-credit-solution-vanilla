import { z } from "zod";

export const BrokerSchema = z.object({
  legalName: z.string(),
  commission: z.number().optional(),
  contact: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
  }),
  country: z.string(),
});

export const IdSchema = z.object({ id: z.number() });

export const BrokerSchemaWithId = BrokerSchema.merge(IdSchema);

export type Broker = z.infer<typeof BrokerSchema>;
export type BrokerWithId = z.infer<typeof BrokerSchemaWithId>;