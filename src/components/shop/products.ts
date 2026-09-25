// Products exactly as written in the Shopping frame (480:1955 → grid 482:2164), in design order.
// `card` is the Figma card frame, `img`/`imgFrame` the photo + its 373×365 clip, `badge` the gradient
// chip frame. `nx`/`ny` keep the design's per-card title offsets (they drift by a few px in Figma).

export type Category = "makeup" | "clothing" | "skincare";

export type Product = {
  card: string;
  imgFrame: string;
  img: string;
  /** Background of the 373×365 photo frame. */
  imgBg: string;
  badge?: { node: string; label: string };
  name: string;
  nx: number;
  ny: number;
  price: string;
  compareAt: string;
  rating: string;
  category: Category;
};

export const tabs: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "makeup", label: "Makeup" },
  { id: "clothing", label: "Clothing" },
  { id: "skincare", label: "Medical Grade Skincare" },
];

const base = { compareAt: "$29.75", rating: "4.3" };

export const products: Product[] = [
  { ...base, card: "482:2216", imgFrame: "483:2257", img: "483:2251", imgBg: "#000000", badge: { node: "483:2262", label: "Best Seller" }, name: "Nude Reverie Eyeshadow Palette", nx: 24, ny: 385, price: "$ 20.00", category: "makeup" },
  { ...base, card: "483:2295", imgFrame: "483:2296", img: "483:2341", imgBg: "#000000", badge: { node: "483:2298", label: "AFL Choice" }, name: "Fractionated Hyaluronic Acid Serum", nx: 25, ny: 385, price: "$ 100.00", category: "skincare" },
  { ...base, card: "483:2318", imgFrame: "483:2319", img: "487:2342", imgBg: "#000000", badge: { node: "487:2343", label: "Exclusive" }, name: "AFL Hoodie (White)", nx: 24, ny: 385, price: "$ 45.00", category: "clothing" },
  { ...base, card: "487:2624", imgFrame: "487:2625", img: "487:2720", imgBg: "#000000", name: "Soft Sculpt Contour Stick By AFL", nx: 24, ny: 386, price: "$ 20.00", category: "makeup" },
  { ...base, card: "487:2368", imgFrame: "487:2369", img: "487:2718", imgBg: "#000000", name: "Phyto Multi-Correction Serum Large", nx: 25, ny: 388, price: "$ 75.00", category: "skincare" },
  { ...base, card: "487:2584", imgFrame: "487:2585", img: "487:2711", imgBg: "#000000", name: "Volume & Length Enhancing Mascara", nx: 19, ny: 385, price: "$ 19.99", category: "makeup" },
  { ...base, card: "487:2644", imgFrame: "487:2645", img: "487:2723", imgBg: "#000000", name: "Dynamic Shades", nx: 24, ny: 385, price: "$ 19.99", category: "makeup" },
  { ...base, card: "487:2664", imgFrame: "487:2665", img: "487:2731", imgBg: "#000000", name: "Peptide Firming + Hydrating Eye Cream", nx: 24, ny: 386, price: "$ 85.00", category: "skincare" },
  { ...base, card: "487:2544", imgFrame: "487:2545", img: "487:2729", imgBg: "#000000", name: "Fairy Beauty God Mother Eye Shadow Palette   ", nx: 16, ny: 389, price: "$ 20.00", category: "makeup" },
  { ...base, card: "487:2564", imgFrame: "487:2565", img: "487:2737", imgBg: "#fee4e3", name: "AFL Hoodie (Black)", nx: 24, ny: 385, price: "$ 45.00", category: "clothing" },
  { ...base, card: "487:2604", imgFrame: "487:2605", img: "487:2732", imgBg: "#000000", name: "AFL Fattee Leggings", nx: 24, ny: 385, price: "$ 29.00", category: "clothing" },
  { ...base, card: "487:2684", imgFrame: "487:2685", img: "487:2740", imgBg: "#000000", name: "Velvet Hour Eye Shadow Palette", nx: 17, ny: 384, price: "$ 20.00", category: "makeup" },
];
