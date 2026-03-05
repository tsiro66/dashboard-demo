import { Playfair_Display, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
