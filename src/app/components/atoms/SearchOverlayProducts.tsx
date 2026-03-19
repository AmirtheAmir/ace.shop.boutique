"use client";

import ProductCard from "../molecules/ProductCard";
import type { ProductItem } from "@/types/product";

type Props = {
  products: ProductItem[];
  onProductClick?: () => void;
};

export default function SearchOverlayProducts({
  products,
  onProductClick = () => {},
}: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <h3 className="font-M-500 text-text-tertiary uppercase">Products</h3>

      <div className="grid grid-cols-1 gap-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="hover:ring hover:ring-border-primary transition-all duration-300" key={product.id} onClick={onProductClick}>
              <ProductCard
                slug={product.slug}
                name={product.name}
                image={product.mainImage}
                price={product.price}
                oldPrice={product.oldPrice}
                soldOut={product.soldOut}
                showPrice={false}
                showBadge={false}
                compact
              />
            </div>
          ))
        ) : (
          <p className="font-M-500 text-text-primary">No products found</p>
        )}
      </div>
    </div>
  );
}