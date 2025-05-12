import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const response = {
  //   messages: [
  //     {
  //       content: "mock content",
  //       promptId: 12,
  //     },
  //     {
  //       content: "mock content 2",
  //       promptId: 24,
  //     },
  //   ],
  //   sender: "ai",
  //   articles: [
  //     "https://edition.cnn.com/2025/05/12/investing/stock-market-dow-trade-deal-china",
  //     "https://edition.cnn.com/2025/05/12/europe/europe-us-pressure-russia-trump-ukraine-intl-cmd",
  //   ],
  // };
  // return new NextResponse(JSON.stringify(response, null, 2));
  const { userMessage, context, mode } = await req.json();

  try {
    const promptResponse = await fetch(
      process.env.BACKEND_URL + "/llm/prompt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          context,
          mode,
        }),
      }
    );

    const data = await promptResponse.json();

    if (promptResponse.status !== 200)
      return NextResponse.json(
        {
          text: data.error,
        },
        { status: data.status_code }
      );

    const response = {
      messages: [
        {
          content: data.response,
          promptId: data.system_prompt_id,
        },
      ],
      sender: "ai",
      articles: data.articles,
    };

    if (data.second_response)
      response.messages.push({
        content: data.second_response,
        promptId: data.second_system_prompt_id,
      });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      {
        text: "Failed to get response from AI.",
      },
      { status: 500 }
    );
  }
}
