import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler((server) => {
  server.tool(
    "say_hello_vercel",
    "Vercelに挨拶する",
    { name: z.string().optional().default("Vercel") },
    async ({ name }) => {
      return {
        content: [{ type: "text", text: `こんにちは${name}` }],
      };
    }
  );
});

export const GET = handler;
export const POST = handler;