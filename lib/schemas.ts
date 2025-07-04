// lib/schemas.ts
import { z } from 'zod';

const baseSchema = z.object({
  driverName: z.string().min(1, { message: "O nome é obrigatório." }).optional(),
  driverEmail: z.string().email({ message: "E-mail inválido." }).optional().or(z.literal('')),
  driverPhone: z.string().optional(),
  driverCPF: z.string().optional(),
  driverBirthDate: z.string().optional(),
  driverLicense: z.string().optional(),
  driverLicenseExpiry: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições.",
  }).optional(),
  
  additionalInsurance: z.boolean().optional(),
  carWash: z.boolean().optional(),
  babySeat: z.boolean().optional(),
});

const creditCardSchema = baseSchema.extend({
  paymentMethod: z.literal('credit-card'),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVV: z.string().optional(),
});

const pixSchema = baseSchema.extend({
  paymentMethod: z.literal('pix'),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVV: z.string().optional(),
});

export const checkoutSchema = z.discriminatedUnion("paymentMethod", [
  creditCardSchema,
  pixSchema,
]);

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;