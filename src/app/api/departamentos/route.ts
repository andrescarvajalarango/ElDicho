import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const departamentos = await prisma.departamento.findMany({
    include: {
      _count: {
        select: { dichos: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(departamentos);
}
