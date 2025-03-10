//C:\Users\Acer\Portofolio\interactive-3d-event-badge\utils\fonts.ts
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Bebas_Neue, Lato } from "next/font/google";

export const lato: NextFontWithVariable = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const bebas_neue: NextFontWithVariable = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--font-bebas_neue",
  display: "swap",
});

import { Oswald } from "next/font/google";

export const oswald: NextFontWithVariable = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-oswald",
  display: "swap",
});
