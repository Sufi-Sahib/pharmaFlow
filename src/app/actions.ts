"use server";

import {
  suggestCounterPrice,
  type SuggestCounterPriceInput,
  type SuggestCounterPriceOutput,
} from "@/ai/flows/suggest-counter-price";

export async function getCounterPriceSuggestion(
  input: SuggestCounterPriceInput
): Promise<SuggestCounterPriceOutput> {
  try {
    const output = await suggestCounterPrice(input);
    return output;
  } catch (error) {
    console.error("Error in suggestCounterPrice flow:", error);
    throw new Error("Failed to get AI suggestion.");
  }
}
