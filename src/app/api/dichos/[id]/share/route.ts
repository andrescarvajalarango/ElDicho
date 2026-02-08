import { prisma } from "@/lib/prisma";
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

  const existing = await prisma.share.findUnique({
    where: { userId_dichoId: { userId, dichoId: id } },
  });

  if (existing) {
    return NextResponse.json({ shared: true, alreadyShared: true });
  }

  await prisma.share.create({
    data: { userId, dichoId: id },
  });

  return NextResponse.json({ shared: true, alreadyShared: false });
}
