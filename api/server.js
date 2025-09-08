import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import cors from 'cors';

export default async function handler(req, res) {
  // CORSを有効にする
  await cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // MCPサーバーを作成
    const server = new Server(
      {
        name: 'hello-mcp-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    // 「こんにちは」ツールを定義
    server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'say_hello',
            description: 'こんにちはと挨拶を返します',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: '名前（オプション）'
                }
              }
            }
          }
        ]
      };
    });

    // ツール実行ハンドラー
    server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      if (name === 'say_hello') {
        const userName = args?.name || '';
        const greeting = userName 
          ? `こんにちは、${userName}さん！` 
          : 'こんにちは！';
        
        return {
          content: [
            {
              type: 'text',
              text: greeting
            }
          ]
        };
      }
      
      throw new Error(`Unknown tool: ${name}`);
    });

    // HTTPリクエストの場合はJSON形式で応答
    if (req.method === 'POST' && req.body) {
      const { method, params } = req.body;
      
      if (method === 'tools/list') {
        const result = await server.requestHandlers.get('tools/list')();
        return res.json(result);
      } else if (method === 'tools/call') {
        const result = await server.requestHandlers.get('tools/call')({ params });
        return res.json(result);
      }
    }

    // デフォルトレスポンス（サーバー情報）
    res.json({
      name: 'hello-mcp-server',
      version: '1.0.0',
      description: 'こんにちはと返すMCPサーバー',
      tools: ['say_hello'],
      usage: {
        list_tools: 'POST /api/server with {"method": "tools/list"}',
        call_tool: 'POST /api/server with {"method": "tools/call", "params": {"name": "say_hello", "arguments": {"name": "太郎"}}}'
      }
    });

  } catch (error) {
    console.error('MCP Server Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message 
    });
  }
}