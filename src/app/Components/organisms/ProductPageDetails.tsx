"use client";

import React from "react";
import { ProductItem } from "@/data/ItemData";
import ProductPagesSideGallery from "../molecules/ProductPagesSideGallery";
import ProductPageInformation from "../molecules/ProductPageInformation";

type Props = {
  product: ProductItem;
};

export default function ProductPageDetails({ product }: Props) {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-[96px_1fr_420px] py-6 gap-4">
      <ProductPagesSideGallery
        name={product.name}
        mainImage={product.mainImage}
        gallery={product.gallery ?? []}
      />

      <ProductPageInformation product={product} />
    </section>
  );
}
