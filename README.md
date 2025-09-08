# Vercel Hello MCP Server

「こんにちはVercel」を返すシンプルなMCPサーバー

## デプロイ方法

```bash
# Vercelにデプロイ
npx vercel --prod
```

## Claude Desktop での設定

デプロイ後、`claude_desktop_config.json` の `your-deployment-url` を実際のVercel URLに置き換えてください。

### macOS の場合
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Windows の場合
```bash
%APPDATA%/Claude/claude_desktop_config.json
```

設定例：
```json
{
  "mcpServers": {
    "vercel-hello-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "--url",
        "https://your-actual-deployment-url.vercel.app/api/mcp"
      ],
      "env": {}
    }
  }
}
```

## 利用可能なツール

- `say_hello_vercel`: Vercelに挨拶する（名前はオプション）

## ローカル開発

```bash
npm run dev
```

API endpoint: `http://localhost:3000/api/mcp`