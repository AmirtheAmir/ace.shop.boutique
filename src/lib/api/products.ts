import axios from "axios";
import type { ProductItem } from "@/types/product";

export async function fetchProducts() {
  const { data } = await axios.get<ProductItem[]>("/api/products");
  return data;
}

export async function fetchProductBySlug(slug: string) {
  const { data } = await axios.get<ProductItem>(`/api/products/${slug}`);
  return data;
}