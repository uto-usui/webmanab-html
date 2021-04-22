# 《Nuxt.js》https://localhost:3000 でサーバを起動する方法。

Nuxt を create-nuxt-app で次のような流れでシンプルに始めたとき、`http://localhost:3000` にアクセスして開発を進めることになります。

または create-nuxt-app でプロジェクトをはじめます。

```terminal.bash

npx create-nuxt-app your-title

cd ./your-title

yarn run dev

```

ただこれだと、たとえば web カメラを起動するための API は、 https 環境でしか動かすことができないので、それに対応できるようローカル環境を整えてやる必要があります。

ちょっとひと手間は必要ですが、簡単に実装できます＊

## サーバーを起動するためのスクリプト

この話は Nuxt の issue で言及されていて、 [localhost https · Issue #146 · nuxt/nuxt.js · GitHub](https://github.com/nuxt/nuxt.js/issues/146#issuecomment-341893997) にあるコードを拝借しましょう。

仮に server というフォルダに index.js を作成してみます。

```server/indexjs

const {Nuxt, Builder} = require('nuxt');

const https = require('https');
const fs = require('fs');
const isProd = (process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3000;

const config = require('../nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
else {
  listen();
}

function listen() {

  const options = {
    key: fs.readFileSync('./server/cert.pem'),
    cert: fs.readFileSync('./server/cert.pem'),
  };

  https
    .createServer(options, nuxt.render)
    .listen(port);
  console.log('Server listening on `localhost:' + port + '`.');
}

```

## 自己署名証明書を作成する

https サーバを構築するのに、`https.createServer(options, nuxt.render)` の部分にあるように、署名済み公開鍵と秘密鍵をオプションで設定する必要があります。

署名済み公開鍵と秘密鍵の両方を含む pem ファイルを作成します。
先ほど作成した server フォルダに移動して、次のコマンドを入力します。

```bash
openssl req -days 365 -new -nodes -newkey rsa:4096 -x509 -keyout cert.pem -out cert.pem
```

## package.json にコマンドをかく

コマンドを実行すできるようにするため、次のように package.json に記述します。

```package.json

"scripts": {
  "devHttps": "node server/index.js",
},

```

あとはコマンドを叩くだけですね。

```bath
yarn run devHttps
```

これで `https://localhost:3000` にアクセスすることができるようになりました 🍟

### おまけ

次のように `PORT=8000` というように指定してあげると、 `https://localhost:8000` というようにポート番号を変更してアクセスできるようになります。

```package.json

"scripts": {
  "devHttps": "PORT=8000 node server/index.js",
},

```

おわります。
