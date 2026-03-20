// import { NextResponse } from "next/server";
// import { getSupabase } from "@/lib/supabase";
// import { mapProductRow } from "@/lib/productMapper";
// import type { ProductRow } from "@/types/product";

// export async function GET() {
//   const supabase = getSupabase();
//   if (!supabase) {
//     return NextResponse.json(
//       { message: "Server is missing Supabase environment variables." },
//       { status: 500 }
//     );
//   }

//   const { data, error } = await supabase
//     .from("products")
//     .select(`
//       id,
//       slug,
//       name,
//       main_image,
//       gallery,
//       price,
//       old_price,
//       sold_out,
//       tags,
//       collection,
//       description,
//       postdescription,
//       features
//     `)
//     .order("name", { ascending: true });

//   if (error) {
//     console.error("SUPABASE ERROR:", error);   // 👈 add this line
//     return NextResponse.json(
//       {
//         message: error.message,
//         details: error.details,
//         hint: error.hint,
//       },
//       { status: 500 }
//     );
//   }

//   const products = ((data ?? []) as ProductRow[]).map(mapProductRow);

//   return NextResponse.json(products);
// }
import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { mapProductRow } from "@/lib/productMapper";
import type { ProductRow } from "@/types/product";

export async function GET() {
  try {
    const supabase = getSupabase();

    if (!supabase) {
      console.error("Supabase client was not created. Missing env vars.");
      return NextResponse.json(
        { message: "Server is missing Supabase environment variables." },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        slug,
        name,
        main_image,
        gallery,
        price,
        old_price,
        sold_out,
        tags,
        collection,
        description,
        postdescription,
        features
      `)
      .order("name", { ascending: true });

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json(
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    const products = ((data ?? []) as ProductRow[]).map((row) => {
      try {
        return mapProductRow(row);
      } catch (mapError) {
        console.error("MAP PRODUCT ERROR:", row, mapError);
        throw mapError;
      }
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("API /products UNHANDLED ERROR:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}