'use server';

/**
 * @fileOverview Implements the AI-powered suggestion of counter prices for customer bids.
 *
 * - suggestCounterPrice - A function that suggests a counter price based on the bid request.
 * - SuggestCounterPriceInput - The input type for the suggestCounterPrice function.
 * - SuggestCounterPriceOutput - The return type for the suggestCounterPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCounterPriceInputSchema = z.object({
  productId: z.string().describe('The ID of the product being bid on.'),
  customerId: z.string().describe('The ID of the customer making the bid.'),
  requestedPrice: z.number().describe('The price requested by the customer.'),
  quantity: z.number().describe('The quantity of the product being bid on.'),
  adminRole: z.string().describe('The role of the admin/manager approving the bid.'),
  minMarginPercentage: z.number().describe('The minimum acceptable margin percentage for the product.'),
  tierRules: z.string().describe('Tier rules applicable to the customer.'),
});

export type SuggestCounterPriceInput = z.infer<typeof SuggestCounterPriceInputSchema>;

const SuggestCounterPriceOutputSchema = z.object({
  suggestedPrice: z.number().describe('The AI-suggested counter price for the bid.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested price.'),
});

export type SuggestCounterPriceOutput = z.infer<typeof SuggestCounterPriceOutputSchema>;

export async function suggestCounterPrice(input: SuggestCounterPriceInput): Promise<SuggestCounterPriceOutput> {
  return suggestCounterPriceFlow(input);
}

const suggestCounterPricePrompt = ai.definePrompt({
  name: 'suggestCounterPricePrompt',
  input: {schema: SuggestCounterPriceInputSchema},
  output: {schema: SuggestCounterPriceOutputSchema},
  prompt: `You are an AI assistant that suggests counter prices for customer bids on pharmaceutical products. Consider the following factors when determining the suggested price:

- Minimum margin percentage: {{minMarginPercentage}}%
- Customer tier rules: {{tierRules}}
- Admin/Manager Role: {{adminRole}}
- Requested Price: {{requestedPrice}}
- Product ID: {{productId}}
- Customer ID: {{customerId}}
- Quantity: {{quantity}}

Your goal is to suggest a price that is both competitive for the customer and profitable for the distributor. Explain your reasoning for the suggested price.

Suggested Price:`,
});

const suggestCounterPriceFlow = ai.defineFlow(
  {
    name: 'suggestCounterPriceFlow',
    inputSchema: SuggestCounterPriceInputSchema,
    outputSchema: SuggestCounterPriceOutputSchema,
  },
  async input => {
    const {output} = await suggestCounterPricePrompt(input);
    return output!;
  }
);
