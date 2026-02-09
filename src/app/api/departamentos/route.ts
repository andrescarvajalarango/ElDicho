import { getDepartamentosWithCount } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  const departamentos = getDepartamentosWithCount();
  return NextResponse.json(departamentos);
}
