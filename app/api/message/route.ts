import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function POST(request: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();

  const response = await prisma.message.create({
    data: {
      content: data.content,
      senderId: data.userId,
      conversationId: data.conversationId,
    },
  });

  return new NextResponse(JSON.stringify(response, null, 2));
}
