import { NextResponse } from "next/server";
import { receiptSchema } from "@/lib/ai-schemas";
import { getOpenAIClient } from "@/lib/openai";

const EXTRACT_PROMPT = `You are Mizaniya, a precise financial assistant. Extract every purchasable line item you
see on the receipt image. Convert totals to numbers (no currency signs) and guess the best-fit category
one of: Essentials, Lifestyle, Wellness, Travel, Income, Other.`;

const getJSONFromResponse = (payload: any) => {
  const blocks = payload?.output?.flatMap(
    (entry: any) => entry?.content ?? []
  );
  const text = blocks
    ?.filter((block: any) => block.type === "output_text")
    .map((block: any) => block.text)
    .join("")
    .trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse receipt response", error);
    return null;
  }
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "Upload a photo or PDF of the receipt" },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const client = getOpenAIClient();

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: EXTRACT_PROMPT },
            {
              type: "input_image",
              image_base64: buffer.toString("base64"),
              media_type: file.type || "image/jpeg",
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: receiptSchema,
      },
    });

    const parsed = getJSONFromResponse(response);

    if (!parsed) {
      return NextResponse.json(
        { error: "Could not parse items from the receipt." },
        { status: 422 }
      );
    }

    return NextResponse.json({ receipt: parsed });
  } catch (error) {
    console.error("scan-receipt error", error);
    return NextResponse.json(
      { error: "Unable to process receipt. Try again." },
      { status: 500 }
    );
  }
}

