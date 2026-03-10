"use client";

import Image from "next/image";
import { ProductItem } from "../../../data/ItemData";

type Props = {
  products: ProductItem[];
};

export default function ProductColumn({ products }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 ">
      <h3 className="font-M-500 text-text-tertiary uppercase">Products</h3>

      <div className="flex flex-col gap-2">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center hover:cursor-pointer gap-4 transition-all duration-300 hover:ring"
            >
              <div className="relative h-21 w-21  shrink-0 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="font-S-500 text-text-primary">
                {product.name}
              </p>
            </div>
          ))
        ) : (
          <p className="font-M-500 text-text-primary">No products found</p>
        )}
      </div>
    </div>
  );
}