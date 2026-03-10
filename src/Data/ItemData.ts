export type ProductItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  tags: string[];
};

export const itemData: ProductItem[] = [
  {
    id: "1",
    name: "Aggragat Vanguard Heritage",
    image: "/Images/ace_watch_1.png",
    price: 1980,
    soldOut: true,
    tags: ["Signature", "Heritage", "Automatic", "Watch"],
  },
  {
    id: "2",
    name: "ACE Pulse Bone Edition",
    image: "/Images/ace_watch_2.png",
    oldPrice: 1012,
    price: 980,
    tags: ["Pulse", "Bone", "Minimal", "Watch"],
  },
  {
    id: "3",
    name: "Ace Meridian Chronograph Automatic",
    image: "/Images/ace_watch_4.png",
    oldPrice: 1340,
    price: 1200,
    tags: ["Chronograph", "Automatic", "Meridian", "Watch"],
  },
  {
    id: "4",
    name: "Sterling Classic Automatic",
    image: "/Images/ace_watch_3.png",
    price: 660,
    tags: ["Classic", "Sterling", "Automatic", "Watch"],
  },
  {
    id: "5",
    name: "Atelier Signature Chronograph",
    image: "/Images/ace_watch_5.png",
    price: 1450,
    tags: ["Atelier", "Signature", "Chronograph", "Watch"],
  },
  {
    id: "6",
    name: "Vector Digital Series",
    image: "/Images/ace_watch_6.png",
    price: 742,
    tags: ["Vector", "Digital", "Series", "Watch"],
  },
  {
    id: "7",
    name: "ClearCore Utility Lighter",
    image: "/Images/ace_lighter.png",
    price: 56,
    tags: ["Lighter", "Utility", "Clearcore", "Accessory"],
  },
  {
    id: "8",
    name: "AeroSight Visible",
    image: "/Images/ace_glasses_2.png",
    price: 1650,
    tags: ["Aerosight", "Visible", "Eyewear", "Sight"],
  },
  {
    id: "9",
    name: "Night Hawk Vision",
    image: "/Images/ace_glasses_3.png",
    price: 1200,
    tags: ["Night", "Hawk", "Vision", "Eyewear"],
  },
];
