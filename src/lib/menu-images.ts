import burrata from "@/assets/dish-burrata.jpg";
import octopus from "@/assets/dish-octopus.jpg";
import salad from "@/assets/dish-salad.jpg";
import flatbread from "@/assets/dish-flatbread.jpg";
import pappardelle from "@/assets/dish-pappardelle.jpg";
import branzino from "@/assets/dish-branzino.jpg";
import oliveoilcake from "@/assets/dish-oliveoilcake.jpg";
import pannacotta from "@/assets/dish-pannacotta.jpg";
import wine from "@/assets/dish-wine.jpg";
import cocktail from "@/assets/dish-cocktail.jpg";

export const menuImages: Record<string, string> = {
  burrata,
  octopus,
  salad,
  flatbread,
  pappardelle,
  branzino,
  oliveoilcake,
  pannacotta,
  wine,
  cocktail,
};

export function imageForSlug(slug?: string | null): string | undefined {
  if (!slug) return undefined;
  return menuImages[slug];
}
