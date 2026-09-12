import { fal } from "@fal-ai/client";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    fal.config({
      credentials: process.env.FAL_KEY
    });

    const result = await fal.subscribe("fal-ai/veo3", {
      input: {
        prompt: prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    return Response.json({ videoUrl: result.data.video.url });
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  }
