import { z } from "zod";

export const BrokerSchema = z.object({
  legalName: z.string().min(1),
  commission: z.number().or(z.string()).optional(),
  contact: z.string().optional(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
  }),
  country: z.string().min(1),
});

export const IdSchema = z.object({ id: z.number() });

export const BrokerSchemaWithId = BrokerSchema.merge(IdSchema);

export type Broker = z.infer<typeof BrokerSchema>;
export type BrokerWithId = z.infer<typeof BrokerSchemaWithId>;
