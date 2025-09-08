#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const serverInfo = {
  name: "vercel-hello-mcp",
  version: "1.0.0"
};

const tools = [
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
];

function handleMessage(message) {
  const request = JSON.parse(message);
  
  switch (request.method) {
    case 'initialize':
      return {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {}
          },
          serverInfo: serverInfo
        }
      };
      
    case 'tools/list':
      return {
        jsonrpc: "2.0",
        id: request.id,
        result: {
          tools: tools
        }
      };
      
    case 'tools/call':
      const toolName = request.params?.name;
      const args = request.params?.arguments || {};
      
      if (toolName === "say_hello_vercel") {
        const name = args.name || "Vercel";
        return {
          jsonrpc: "2.0",
          id: request.id,
          result: {
            content: [
              {
                type: "text",
                text: `こんにちは${name}`
              }
            ]
          }
        };
      }
      break;
      
    default:
      return {
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: -32601,
          message: "Method not found"
        }
      };
  }
}

rl.on('line', (input) => {
  try {
    const response = handleMessage(input);
    if (response) {
      console.log(JSON.stringify(response));
    }
  } catch (error) {
    console.log(JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32700,
        message: "Parse error"
      }
    }));
  }
});

process.on('SIGINT', () => {
  process.exit(0);
});