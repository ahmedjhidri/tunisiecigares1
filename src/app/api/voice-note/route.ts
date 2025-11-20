import { NextResponse } from "next/server";
import { toFile } from "openai/uploads";
import { getOpenAIClient } from "@/lib/openai";
import { voiceSchema } from "@/lib/ai-schemas";

const SUMMARIZE_PROMPT = `Using the transcript, identify any expenses the user mentioned.
Estimate ambiguous amounts conservatively, infer sensible categories, and capture their tone.`;

const parseResponseJSON = (payload: any) => {
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
    console.error("voice-note parse error", error);
    return null;
  }
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const audio = formData.get("audio");

  if (!audio || !(audio instanceof File)) {
    return NextResponse.json(
      { error: "Attach an audio recording (webm, m4a, mp3)." },
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
    const buffer = Buffer.from(await audio.arrayBuffer());
    const client = getOpenAIClient();

    const toUpload = await toFile(
      buffer,
      audio.name || "voice-note.webm",
      audio.type ? { type: audio.type } : undefined
    );

    const transcription = await client.audio.transcriptions.create({
      file: toUpload,
      model: "gpt-4o-mini-transcribe",
    });

    const transcriptText = transcription.text?.trim();

    if (!transcriptText) {
      return NextResponse.json(
        { error: "Transcription returned empty text." },
        { status: 422 }
      );
    }

    const structured = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Transcript:\n${transcriptText}\n\n${SUMMARIZE_PROMPT}`,
            },
          ],
        },
      ],
      response_format: { type: "json_schema", json_schema: voiceSchema },
    });

    const parsed = parseResponseJSON(structured);

    return NextResponse.json({
      transcript: transcriptText,
      structured: parsed,
    });
  } catch (error) {
    console.error("voice-note error", error);
    return NextResponse.json(
      { error: "Unable to interpret your voice note. Try again." },
      { status: 500 }
    );
  }
}

