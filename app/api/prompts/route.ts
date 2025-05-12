import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();

  const { promptId, liked } = data;

  if (liked) {
    await prisma.systemPrompts.update({
      where: { id: promptId },
      data: { likes: { increment: 1 } },
    });
  } else {
    await prisma.systemPrompts.update({
      where: { id: promptId },
      data: { dislikes: { increment: 1 } },
    });
  }

  return NextResponse.json({ message: "Prompt updated" }, { status: 200 });
}
