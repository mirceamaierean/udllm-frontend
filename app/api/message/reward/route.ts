import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, response, reward } = await req.json();

  const resp = await fetch(process.env.BACKEND_URL + "/rlhf/reward", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      response: response,
      reward: reward,
    }),
  });

  console.log(resp);

  if (resp.status !== 200) {
    return NextResponse.json(
      { message: `Failed to reward: ${resp.statusText}` },
      { status: resp.status }
    );
  }

  return NextResponse.json({
    message: `Reward received for ${prompt} and ${response} with reward ${reward}`,
  });
}
