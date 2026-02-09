import { addLike, removeLike, mockLikes } from "@/lib/mockData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const existing = mockLikes.find(l => l.userId === userId && l.dichoId === id);

  if (existing) {
    removeLike(id, userId);
    return NextResponse.json({ liked: false });
  }

  addLike(id, userId);
  return NextResponse.json({ liked: true });
}
