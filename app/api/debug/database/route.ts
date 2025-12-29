import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/vercel-blob";

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        blog: db.blog.map((item) => ({
          id: item.id,
          id_type: typeof item.id,
          title: item.title,
          slug: item.slug,
        })),
        portfolio: db.portfolio.map((item) => ({
          id: item.id,
          id_type: typeof item.id,
          title: item.title,
          slug: item.slug,
        })),
        products: db.products.map((item) => ({
          id: item.id,
          id_type: typeof item.id,
          name: item.name,
        })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
