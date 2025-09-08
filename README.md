# Vercel MCP Hello Server

「こんにちは」と挨拶を返すシンプルなMCP（Model Context Protocol）サーバーです。

## 🚀 機能

- `say_hello` ツール：「こんにちは」の挨拶を返します
- 名前を指定して個人向けの挨拶も可能
- Vercel Functions で動作

## 📁 プロジェクト構造

```
.
├── api/
│   └── server.js          # MCPサーバーのメイン実装
├── scripts/
│   └── test-client.mjs    # テストクライアント
├── package.json
├── vercel.json           # Vercel設定
└── README.md
```

## 🛠️ ローカル開発

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

### 3. テストの実行
```bash
npm test
```

## 🌐 デプロイ

### Vercelにデプロイ
```bash
vercel --prod
```

## 📝 API 使用方法

### エンドポイント
- 本番: `https://your-deployment.vercel.app/api/server`
- 開発: `http://localhost:3000/api/server`

### 1. サーバー情報の取得
```bash
curl https://your-deployment.vercel.app/api/server
```

### 2. 利用可能ツールの一覧
```bash
curl -X POST https://your-deployment.vercel.app/api/server \\
  -H "Content-Type: application/json" \\
  -d '{"method": "tools/list"}'
```

### 3. say_hello ツールの実行

#### 名前なしの挨拶
```bash
curl -X POST https://your-deployment.vercel.app/api/server \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "tools/call",
    "params": {
      "name": "say_hello",
      "arguments": {}
    }
  }'
```

#### 名前付きの挨拶
```bash
curl -X POST https://your-deployment.vercel.app/api/server \\
  -H "Content-Type: application/json" \\
  -d '{
    "method": "tools/call",
    "params": {
      "name": "say_hello",
      "arguments": {
        "name": "太郎"
      }
    }
  }'
```

## 🔧 技術仕様

- **Runtime**: Node.js 20.x
- **Framework**: Vercel Functions
- **Protocol**: MCP (Model Context Protocol)
- **CORS**: 有効（全オリジン許可）

## 📱 レスポンス例

### サーバー情報
```json
{
  "name": "hello-mcp-server",
  "version": "1.0.0",
  "description": "こんにちはと返すMCPサーバー",
  "tools": ["say_hello"]
}
```

### say_hello ツール実行結果
```json
{
  "content": [
    {
      "type": "text",
      "text": "こんにちは、太郎さん！"
    }
  ]
}
```

## ⚡ パフォーマンス

- 最大実行時間: 30秒
- Node.js 20.x での実行
- CORSヘッダー付きで全オリジンアクセス可能