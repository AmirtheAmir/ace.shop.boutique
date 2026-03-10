import { supabase } from "./supabase";

const PRODUCT_BUCKET = "Ace Images";
const PRODUCT_FOLDER = "products";

export function getProductImageUrl(path: string) {
  const normalizedPath = path.startsWith(`${PRODUCT_FOLDER}/`)
    ? path
    : `${PRODUCT_FOLDER}/${path}`;

  const { data } = supabase.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(normalizedPath);

  return data.publicUrl;
}

export function getStorageAsset(path: string) {
  const { data } = supabase.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}