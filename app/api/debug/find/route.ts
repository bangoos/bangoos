import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/vercel-blob";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id || !type) {
    return NextResponse.json(
      {
        error: "Missing id or type parameter",
        usage: "/api/debug/find?id=YOUR_ID&type=blog|portfolio|products",
      },
      { status: 400 }
    );
  }

  try {
    const db = await getDatabase();

    let items = [];
    switch (type) {
      case "blog":
        items = db.blog;
        break;
      case "portfolio":
        items = db.portfolio;
        break;
      case "products":
        items = db.products;
        break;
      default:
        return NextResponse.json(
          {
            error: "Invalid type. Use: blog, portfolio, or products",
          },
          { status: 400 }
        );
    }

    const found = items.find((item) => item.id === id);

    return NextResponse.json({
      success: true,
      search: {
        id,
        type,
        totalItems: items.length,
        found: !!found,
      },
      allIds: items.map((item) => ({
        id: item.id,
        idType: typeof item.id,
        title: (item as any).title || (item as any).name || "Unknown",
        matches: item.id === id,
      })),
      foundItem: found || null,
      debug: {
        searchId: id,
        searchIdType: typeof id,
        comparisons: items.map((item) => ({
          itemId: item.id,
          itemType: typeof item.id,
          searchId: id,
          searchType: typeof id,
          strictEquals: item.id === id,
          stringEquals: String(item.id) === String(id),
          contains: String(item.id).includes(String(id)),
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
