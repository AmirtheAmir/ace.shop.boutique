import { notFound } from "next/navigation";
import { itemData } from "@/data/ItemData";
import ProductPageDetails from "@/app/components/organisms/ProductPageDetails";
import ProductsRelated from "@/app/components/organisms/ProductsRelated";

type Props = {
  params: Promise<{
    productSlug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { productSlug } = await params;

  const product = itemData.find((item) => item.slug === productSlug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-2">
      <ProductPageDetails product={product} />
      <ProductsRelated currentProductId={product.id} />
    </main>
  );
}
