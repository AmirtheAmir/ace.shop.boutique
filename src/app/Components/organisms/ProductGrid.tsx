"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { fetchProducts } from "@/lib/api/products";
import type { ProductItem } from "@/types/product";

export default function ProductGrid() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();

        const order = [
          "aggregat",
          "classic",
          "tactical",
          "glasses",
          "lighter",
        ];

        const sorted = data.sort(
          (a, b) => order.indexOf(a.collection) - order.indexOf(b.collection)
        );

        setProducts(sorted.slice(0, 9));
      } catch (error: unknown) {
        console.error("Failed to load products", error);
        setError(
          error instanceof Error ? error.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p className="font-M-500 text-text-primary">Loading products...</p>;
  }

  if (error) {
    return <p className="font-M-500 text-text-primary">{error}</p>;
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            slug={item.slug}
            name={item.name}
            image={item.mainImage}
            price={item.price}
            oldPrice={item.oldPrice}
            soldOut={item.soldOut}
          />
        ))}
      </div>
    </section>
  );
}
