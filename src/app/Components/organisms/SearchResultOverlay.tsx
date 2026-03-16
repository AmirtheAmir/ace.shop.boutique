"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SearchResultContainer from "../molecules/SearchResultContainer";
import { fetchProducts } from "@/lib/api/products";
import type { ProductItem } from "@/types/product";

type Props = {
  query: string;
  onSuggestionClick: (value: string) => void;
  onCloseOverlay: () => void;
};

export default function SearchResultOverlay({
  query,
  onSuggestionClick,
  onCloseOverlay,
}: Props) {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);

  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to load search overlay products:", error);
      }
    }

    loadProducts();
  }, []);

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    const allTags = allProducts.flatMap((item) => item.tags ?? []);

    return [...new Set(allTags)]
      .filter((tag) => tag.toLowerCase().includes(normalizedQuery))
      .slice(0, 4);
  }, [allProducts, normalizedQuery]);

  const products = useMemo(() => {
    if (!normalizedQuery) return [];

    return allProducts
      .filter((item) => {
        const matchName = item.name.toLowerCase().includes(normalizedQuery);
        const matchTag = item.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery),
        );

        return matchName || matchTag;
      })
      .slice(0, 4);
  }, [allProducts, normalizedQuery]);

  if (!normalizedQuery) return null;

  const handleSearchSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    onCloseOverlay();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSuggestionSearch = (value: string) => {
    onSuggestionClick(value);
    onCloseOverlay();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const handleProductClick = () => {
    onCloseOverlay();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

      <div className="absolute left-0 top-full z-70 mt-px w-full ring ring-border-primary">
        <SearchResultContainer
          query={query}
          suggestions={suggestions}
          products={products}
          onSuggestionClick={handleSuggestionSearch}
          onSearchSubmit={handleSearchSubmit}
          onProductClick={handleProductClick}
        />
      </div>
    </>
  );
}