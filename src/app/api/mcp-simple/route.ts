export async function GET() {
  return Response.json({
    jsonrpc: "2.0",
    result: {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {}
      },
      serverInfo: {
        name: "vercel-hello-mcp",
        version: "1.0.0"
      }
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.method === "tools/list") {
      return Response.json({
        jsonrpc: "2.0",
        id: body.id,
        result: {
          tools: [
            {
              name: "say_hello_vercel",
              description: "Vercelに挨拶する",
              inputSchema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "挨拶する相手の名前",
                    default: "Vercel"
                  }
                }
              }
            }
          ]
        }
      });
    }
    
    if (body.method === "tools/call") {
      const toolName = body.params?.name;
      const args = body.params?.arguments || {};
      
      if (toolName === "say_hello_vercel") {
        const name = args.name || "Vercel";
        return Response.json({
          jsonrpc: "2.0",
          id: body.id,
          result: {
            content: [
              {
                type: "text",
                text: `こんにちは${name}`
              }
            ]
          }
        });
      }
    }
    
    return Response.json({
      jsonrpc: "2.0",
      id: body.id,
      error: {
        code: -32601,
        message: "Method not found"
      }
    });
    
  } catch (error) {
    return Response.json({
      jsonrpc: "2.0",
      error: {
        code: -32700,
        message: "Parse error"
      }
    });
  }
}