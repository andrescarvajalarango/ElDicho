import { getDichosWithRelations, addDicho } from "@/lib/mockData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const departamentoId = searchParams.get("departamentoId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  let dichos = getDichosWithRelations();

  // Filter by departamento if specified
  if (departamentoId) {
    dichos = dichos.filter(d => d.departamentoId === departamentoId);
  }

  // Sort by date descending
  dichos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Pagination
  const total = dichos.length;
  const paginatedDichos = dichos.slice(skip, skip + limit);

  return NextResponse.json({
    dichos: paginatedDichos,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text, meaning, author, isAnonymous, userId, departamentoId } = body;

  if (!text || !userId || !departamentoId) {
    return NextResponse.json(
      { error: "text, userId, and departamentoId are required" },
      { status: 400 }
    );
  }

  const dicho = addDicho({
    text,
    meaning,
    author,
    isAnonymous: isAnonymous || false,
    userId,
    departamentoId,
  });

  // Get with relations
  const dichosWithRelations = getDichosWithRelations();
  const newDicho = dichosWithRelations.find(d => d.id === dicho.id);

  return NextResponse.json(newDicho, { status: 201 });
}
