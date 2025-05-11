import { NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;
  const conversations = await prisma.conversation.findMany({
    where: {
      userId: userId,
    },
    include: {
      messages: true,
    },
  });

  return NextResponse.json({ conversations });
}
