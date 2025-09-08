#!/usr/bin/env node

// テストクライアント - MCP サーバーをテストするためのスクリプト

const serverUrl = process.env.MCP_SERVER_URL || 'http://localhost:3000/api/server';

async function testMCPServer() {
  console.log('🚀 MCP サーバーテストを開始します...');
  console.log(`サーバーURL: ${serverUrl}\n`);

  try {
    // 1. サーバー情報を取得（GET リクエスト）
    console.log('1. サーバー情報を取得中...');
    const infoResponse = await fetch(serverUrl);
    const serverInfo = await infoResponse.json();
    console.log('サーバー情報:', JSON.stringify(serverInfo, null, 2));

    // 2. 利用可能なツール一覧を取得
    console.log('\n2. 利用可能なツール一覧を取得中...');
    const toolsResponse = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'tools/list'
      })
    });
    const toolsList = await toolsResponse.json();
    console.log('利用可能なツール:', JSON.stringify(toolsList, null, 2));

    // 3. say_hello ツールを名前なしで呼び出し
    console.log('\n3. say_hello ツールを名前なしで呼び出し中...');
    const helloResponse1 = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'tools/call',
        params: {
          name: 'say_hello',
          arguments: {}
        }
      })
    });
    const helloResult1 = await helloResponse1.json();
    console.log('結果:', JSON.stringify(helloResult1, null, 2));

    // 4. say_hello ツールを名前付きで呼び出し
    console.log('\n4. say_hello ツールを名前付きで呼び出し中...');
    const helloResponse2 = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'tools/call',
        params: {
          name: 'say_hello',
          arguments: {
            name: 'フリーレン'
          }
        }
      })
    });
    const helloResult2 = await helloResponse2.json();
    console.log('結果:', JSON.stringify(helloResult2, null, 2));

    console.log('\n✅ すべてのテストが完了しました！');

  } catch (error) {
    console.error('❌ テスト中にエラーが発生しました:', error.message);
    
    if (error.cause) {
      console.error('詳細:', error.cause);
    }
    
    // ローカル開発サーバーが起動していない可能性がある場合の案内
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
      console.log('\n💡 ローカルでテストする場合は、以下のコマンドを実行してください:');
      console.log('   npm run dev');
      console.log('   その後、別のターミナルで: npm test');
    }
  }
}

// メイン実行
testMCPServer();