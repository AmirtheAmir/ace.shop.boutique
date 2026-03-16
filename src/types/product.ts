export type ProductCollection =
  | "classic"
  | "tactical"
  | "glasses"
  | "lighter"
  | "aggregat";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  main_image: string | null;
  gallery: string[] | null;
  price: number;
  old_price: number | null;
  sold_out: boolean | null;
  tags: string[] | null;
  collection: ProductCollection;
  description: string | null;
  postdescription: string | null;
  features: string[] | null;
};

export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  mainImage: string;
  gallery?: string[];
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  tags: string[];
  collection: ProductCollection;
  description: string;
  postdescription?: string;
  features?: string[];
};