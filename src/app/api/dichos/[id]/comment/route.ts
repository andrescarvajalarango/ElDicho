import { addComment } from "@/lib/mockData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { userId, text } = body;

  if (!userId || !text) {
    return NextResponse.json(
      { error: "userId and text are required" },
      { status: 400 }
    );
  }

  const comment = addComment(id, text, userId);

  return NextResponse.json(comment, { status: 201 });
}
