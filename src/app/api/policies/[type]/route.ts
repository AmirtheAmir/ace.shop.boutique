import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ALLOWED_TYPES = ["refund", "privacy", "shipping", "terms", "cookies"];

export async function GET(
  _request: Request,
  context: { params: Promise<{ type: string }> },
) {
  const { type } = await context.params;

  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("policies")
    .select("id, type, section_order, title, description, created_at")
    .eq("type", type)
    .order("section_order", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: "Failed to fetch policy sections" },
      { status: 500 },
    );
  }

  return NextResponse.json(data ?? []);
}