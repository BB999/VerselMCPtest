export default async function handler(req, res) {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // POSTリクエストの場合
    if (req.method === 'POST') {
      const { method, params } = req.body || {};
      
      // tools/list リクエスト
      if (method === 'tools/list') {
        return res.json({
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
        });
      }
      
      // tools/call リクエスト  
      if (method === 'tools/call') {
        const { name, arguments: args } = params || {};
        
        if (name === 'say_hello') {
          const userName = args?.name || '';
          const greeting = userName 
            ? `こんにちは、${userName}さん！` 
            : 'こんにちは！';
          
          return res.json({
            content: [
              {
                type: 'text',
                text: greeting
              }
            ]
          });
        }
        
        return res.status(400).json({ error: `Unknown tool: ${name}` });
      }
    }

    // GETリクエスト - サーバー情報を返す
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