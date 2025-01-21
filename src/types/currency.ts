import { AVAILABLE_CURRENCIES, availableCurrencyCodes } from "@/constants/currency";
import { z } from "zod";

export type Currency = {
  title: string;
  label: string;
  symbol: string;
  decimals: number;
};

export const currencySchema = z.enum(availableCurrencyCodes)
export type CurrencyCodes = z.infer<typeof currencySchema>
