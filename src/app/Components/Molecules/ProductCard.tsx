"use client";

import Image from "next/image";
import React from "react";
import ItemTitle from "../Atoms/ItemTitle";
import ItemPrice from "../Atoms/ItemPrice";
import SoldOutBadge from "../Atoms/SoldOutBadge";
import { useCurrency } from "@/context/CurrencyContext";
import { getProductImageUrl } from "@/lib/storage";

type ProductCardProps = {
  name: string;
  image: string; // Supabase storage path
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  className?: string;
};


export default function ProductCard({
  name,
  image,
  price,
  oldPrice,
  soldOut = false,
  className = "",
}: ProductCardProps) {
  const { selectedCurrency, convertFromBase } = useCurrency();
  
  const convertedPrice = convertFromBase(price);
  const convertedOldPrice =
  typeof oldPrice === "number" ? convertFromBase(oldPrice) : undefined;
  
  const imageUrl = getProductImageUrl(image);
  
console.log(getProductImageUrl("watches/ace_watch_1.png"))
  return (
    <article className={["flex flex-col gap-2 group", className].join(" ")}>
      <div className="relative flex flex-col">
        <div
          className="
            relative w-full aspect-417/417 overflow-hidden bg-transparent
            ring-1 ring-transparent
            group-hover:ring-border-primary group-hover:cursor-pointer
            transition-all duration-300
          "
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>

        {soldOut && (
          <div className="absolute bottom-2 left-2">
            <SoldOutBadge />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <ItemTitle className="group-hover:underline">{name}</ItemTitle>

        <ItemPrice
          price={convertedPrice}
          oldPrice={convertedOldPrice}
          currencySymbol={selectedCurrency.symbol}
          currencyCode={selectedCurrency.code}
        />
      </div>
    </article>
  );
}