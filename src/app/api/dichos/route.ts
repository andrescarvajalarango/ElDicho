import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const departamentoId = searchParams.get("departamentoId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const where = departamentoId ? { departamentoId } : {};

  const [dichos, total] = await Promise.all([
    prisma.dicho.findMany({
      where,
      include: {
        user: {
          select: { id: true, username: true, name: true, avatar: true },
        },
        departamento: true,
        comments: {
          include: {
            user: {
              select: { id: true, username: true, name: true, avatar: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 3,
        },
        _count: {
          select: { likes: true, comments: true, shares: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.dicho.count({ where }),
  ]);

  return NextResponse.json({
    dichos,
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

  const dicho = await prisma.dicho.create({
    data: {
      text,
      meaning,
      author,
      isAnonymous: isAnonymous || false,
      userId,
      departamentoId,
    },
    include: {
      user: {
        select: { id: true, username: true, name: true, avatar: true },
      },
      departamento: true,
      _count: {
        select: { likes: true, comments: true, shares: true },
      },
    },
  });

  return NextResponse.json(dicho, { status: 201 });
}
