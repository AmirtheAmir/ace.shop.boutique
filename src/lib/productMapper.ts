import type { ProductItem, ProductRow } from "@/types/product";

export function mapProductRow(row: ProductRow): ProductItem {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    mainImage: row.main_image ?? "",
    gallery: row.gallery ?? [],
    price: Number(row.price),
    oldPrice: row.old_price ?? undefined,
    soldOut: row.sold_out ?? false,
    tags: row.tags ?? [],
    collection: row.collection,
    description: row.description ?? "",
    postdescription: row.postdescription ?? undefined,
    features: row.features ?? [],
  };
}