export type ProductItem = {
  id: string;
  name: string;
  image: string; // Supabase storage path
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  tags: string[];
  collection: "classic" | "tactical" | "glasses" | "lighter" | "aggregat";
};

export const itemData: ProductItem[] = [
  {
    id: "1",
    name: "Aggragat Vanguard Heritage",
    image: "watches/ace_watch_1.png",
    price: 1980,
    soldOut: true,
    tags: ["Signature", "Heritage", "Automatic", "Watch"],
    collection: "aggregat",
  },
  {
    id: "2",
    name: "ACE Pulse Bone Edition",
    image: "watches/ace_watch_2.png",
    oldPrice: 1012,
    price: 980,
    tags: ["Pulse", "Bone", "Minimal", "Watch"],
    collection: "tactical",
    
  },
  {
    id: "3",
    name: "Ace Meridian Chronograph Automatic",
    image: "watches/ace_watch_6.png",
    oldPrice: 1340,
    price: 1200,
    tags: ["Chronograph", "Automatic", "Meridian", "Watch"],
    collection: "tactical",
  },
  {
    id: "4",
    name: "Sterling Classic Automatic",
    image: "watches/ace_watch_4.png",
    price: 660,
    tags: ["Classic", "Sterling", "Automatic", "Watch"],
    collection: "classic",
  },
  {
    id: "5",
    name: "Atelier Signature Chronograph",
    image: "watches/ace_watch_5.png",
    price: 1450,
    tags: ["Atelier", "Signature", "Chronograph", "Watch"],
    collection: "classic",
  },
  {
    id: "6",
    name: "Vector Digital Series",
    image: "watches/ace_watch_3.png",
    price: 742,
    tags: ["Vector", "Digital", "Series", "Watch"],
    collection: "tactical",
  },
  {
    id: "7",
    name: "Steel Light Vector",
    image: "watches/ace_watch_8.png",
    price: 880,
    tags: ["Watch", "Classic", "Steel", "Minimal"],
    collection: "classic",
  },
  {
    id: "8",
    name: "AeroSight Visible",
    image: "glasses/ace_glasses_2.png",
    price: 1650,
    tags: ["Aerosight", "Visible", "Eyewear", "Sight"],
    collection: "glasses",
  },
  {
    id: "9",
    name: "Night Hawk Vision",
    image: "glasses/ace_glasses_1.png",
    price: 1200,
    tags: ["Night", "Hawk", "Vision", "Eyewear"],
    collection: "glasses",
  },
  {
    id: "10",
    name: "ClearCore Utility Lighter",
    image: "lighter/ace_lighter_1.png",
    price: 56,
    tags: ["Lighter", "Utility", "Clearcore", "Accessory"],
    collection: "lighter",
  },
];