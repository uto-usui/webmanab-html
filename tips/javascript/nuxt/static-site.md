# 《Nuxt.js》静的サイトをアトミックデザインで構築するための Tips

Nuxt.js は SS（サーバーサイドレンダリング）や SPA の Vue.js サイトを簡単に作成するためのフレームワークです。Nuxt は非同期データ、ミドルウェア、ルーティングなどを管理するために必要な環境を提供してくれます。Angular Universal、Next.js と同様の位置付けです。

## Nuxt のいいところ

Nuxt は Vue / Vue-Router / Vue-Meta / Vuex をインクルードしているので、SSR/SPA 開発をするために必要なものをインクルード/設定する手間を省けます。

というような感じで、巷では高度な SSR/SPA を簡単に実装できる、という特徴が語られますが、nuxt は静的なウェブサイト構築にもすごく有能です。generate コマンドでの静的 Web サイトの生成で、Jekyll などの静的サイト生成ツールの機能があり、アトミックデザインで語られるようなコンポーネント指向のディレクトリ構造になっているところが素敵です。また、コードの分割や CSS の HTML へのインライン展開など、高速化のプラクティスも実装できます。

- [Nuxt.js - ユニバーサル Vue.js アプリケーション](https://ja.nuxtjs.org/)

### Nuxt で静的なサイトを作る

上記ドキュメントを見れば、あらかたやりたいことが知れますが、ここでは「静的サイトを構築するための知識」ということを中心に、ぼくが必要だったことなどをまとめます 🍟

## Nuxt のかんたんな環境構築

Nuxt をかんたんに始めるため、create-nuxt-app を使ってテンプレートを利用します。

```/terminal.bath
npx create-nuxt-app your-title
```

### Nuxt のコマンド

開発するためにコマンドを叩きます。

```/terminal.bath

cd ./your-title
yarn run dev

```

`http://localhost:3000` にアクセスすると Nuxt のテンプレートページが表示されます。

開発ファイルから静的なファイルを生成するには

```/terminal.bath

yarn run generate

```

とコマンドを叩くと、 dist フォルダが生成されます。このフォルダをこのまま FTP でアップすると OK です。

## Nuxt のディレクトリ構造

Nuxt ではディレクトリ構造を把握しておく必要があります。

- [ディレクトリ構造 - Nuxt.js](https://ja.nuxtjs.org/guide/directory-structure)

この中でコンポーネントをアトミックデザインで開発する要素としてのディレクトリを紹介しておきます。

- sass variable -> atoms
- components/\*.vue -> molecules / organisms
- layouts -> template
- pages -> pages

### layouts/\*.vue -> template

ページのテンプレートになるレイアウトを layouts ディレクトリに置きます。ヘッダー／フッター／メインコンテンツなどのレイアウトをここで定義します。

どのレイアウトを使うか指定するのには、ページコンポーネント（pages ディレクトリの .vue ファイル）の `layout` プロパティに指定します。 `default.vue` ファイルが、デフォルトのテンプレートとして利用されるようになります。

```pages/blog/index.vue

<script>
export default {
  layout: 'blog', // layouts/blog.vue を読み込む
}
</script>

```

のように指定します。

ここがアトミックデザインの template に相当します。

### pages/\*.vue -> pages

Nuxt はこのディレクトリ内のすべての \*.vue ファイルを読み込み、vue-router の設定を生成します。 pages のツリー構造がサイトのディレクトリ構造に反映されます。pages ディレクトリ内のファイル変更は常に監視されていて、ページを追加したときなど、タスクの再起動は不要になっています。また、JSON などのデータを注入して動的にディレクトリを生成することもできます。

これがアトミックデザインの pages に相当します。

### components/\*.vue -> molecules / organisms

Vue のコンポーネントファイルを components ディレクトリに格納します。

ここが粒度によりアトミックデザインの molecules や organisms に相当します。

Nuxt での Atoms はコンポーネント共通の変数や mixin などで定義するイメージです。読み込み方は[後述](https://qiita.com/uto-usui/items/51b9bf35ebdad0e1ee4b#sass%E3%81%AE%E5%85%B1%E9%80%9A%E3%81%AE%E5%A4%89%E6%95%B0%E3%82%84mixin%E3%82%92%E8%AA%AD%E3%81%BF%E8%BE%BC%E3%82%80)しています。

## nuxt.config.js

nuxt.config.js は nuxt の設定ファイルです。ここにいろいろ記述するのが nuxt の関門な気がします。webpack.config.js の代わりにこれを触る感じですね。

### head への設定

`titleTemplate` オプションで、アプリケーションで使うタイトルのテンプレートを指定します。各ページやレイアウトで title オプションをセットすると、レンダリング前に`%s` がプレースホルダーとして機能し、タイトルが反映されます。

```nuxt.config.js
module.exports = {
  head: {
    titleTemplate: '%s >> uto-usui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
}
```

### Sass の共通の変数や mixin を読み込む

これについては以前まとめました。

- [《Nuxt.js》Sass の共通の変数や mixin を一括で各コンポーネントに読み込む方法。 - Qiita](https://qiita.com/uto-usui/items/6b745203fa6fad577877)

ここがアトミックデザインの atoms に相当します。

### CSS を外部化する

デフォルトでは CSS は JavaScript 内のアセットとしてインクルードされてしまいますが、静的な CSS としても出力可能です。

```nuxt.config.js

build: {
  extractCSS: true
}

```

### ルートディレクトリの設定

プロジェクトがドメインルート直下でない場合や、開発環境と本番環境に差異がある場合は、`router`にそのパスを指定します。nuxt のサイト内リンクはルート相対パスで張られるので、この設定が必要になります。

```nuxt.config.js

router: {
  base: process.env.NODE_ENV === 'dev' ? '/' : '/test/'
}

```

### autoprefixer の設定をカスタマイズ

これは以前まとめました。

- [《Nuxt.js》CSS のオートプレフィクスをカスタマイズする方法。Grid の IE 対応も！ - Qiita](https://qiita.com/uto-usui/items/d72b8fc44e1b10f99d6a)

### エイリアスを設定する

Nuxt ではルートへのエイリアスが用意されていて、 `~` or `@` でアクセスできます。

```pages/index.vue

<script>
import Button from '~/components/Button.vue'
</script>

```

これを拡張して、エイリアスを追加するには、

```nuxt.config.js

  build: {
    extend (config) {
      config.resolve.alias['Sass'] =  path.resolve(__dirname, './assets/sass/');
      config.resolve.alias['Js'] =  path.resolve(__dirname, './assets/js/');
      config.resolve.alias['Images'] =  path.resolve(__dirname, './assets/images/');
    },
  }

```

のようにします。
するとコンポーネントで `@import "~Sass/object/component/_item";` のようにアクセスできるようになります。

### 重複するインポートをまとめる

複数の pages コンポーネントでライブラリを import している場合、各ページごとにライブラリを読み込んだ状態でビルドされるので、build.vendor に指定して共通のファイルとしてまとめます。

```nuxt.config.js

  build: {
    vendor: [
      'gsap'
    ]
  }

```

ただしこれは v2 で改善され、不要になりました。

- [🚀 Nuxt 2 is coming! Oh yeah! – Nuxt.js – Medium](https://medium.com/nuxt/nuxt-2-is-coming-oh-yeah-212c1a9e1a67#a688)

### 動的なディレクトリ（ルート）を作る

Nuxt では JSON などのデータから、動的なディレクトリを生成できます。

次のような JSON を用意します。

```blog.json

[
  {
    "id": "01",
    "title": "Hi",
  },
  {
    "id": "02",
    "title": "HiHi",
  }
]

```

`nuxt.config.js` の `generate` で、生成するためのルートを定義します。

```nuxt.config.js

  generate: {
    routes(callback) {
      const blogData = require('./assets/json/blog.json')
      let routes = blogData.map(blog => `/blog/${blog.id}`)
      callback(null, routes)
    }
  }

```

これで、JSON の `id` を元に `/blog/01/index.html`、`/blog/02/index.html` が生成されます。

## 開発のためのお役立ちな tips

実開発に便利だったり必要だった設定など。

### https 環境でサーバを起動する

create-nuxt-app de プロジェクトを始めると `http://localhost:3000` にアクセスして開発を進めることになりますが、https 環境で開発を進めたいときもあるとおもいます。

これは別記事でまとめました。

- [《Nuxt.js》Vue CLI で始めたプロジェクトで https://localhost:3000 でサーバを起動する方法。 - Qiita](https://qiita.com/uto-usui/items/4c1c2970c81b8965021a)

### WebStorm のパスを解決

IDE の WebStorm で、`~` と `@` のパスがサジェストされるように、webpack.config.js を作成し、次のように記述します。

```webpack.config.js

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    root: path.resolve(__dirname),
    // for WebStorm
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname),
    }
  }
};

```

また、先に挙げたようにエイリアスを追加している場合もここに記述しておくと、サジェストしてくれるようになります。

### scrollToTop が効かない

Nuxt のページ遷移で、子ルートがあるときはスクロール位置をキープする、というデフォルトの挙動があります。子ルートをレンダリングするときスクロールポジションを初期化させたいときは page ごとに scrollToTop: true と設定しますが、これが効かない状況のときは、nuxt.config.js に次の内容を記述します。

```nuxt.config.js

  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {};
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position;
      }
    },
  },

```

### ビュー全体のレンダリングを待つ

これは Vue の知見でもありますが、page/\* のコンポーネントで、ページ遷移時に`window.onload` みたいな処理をしたいとき、次のようなコードを書きます。

```pages/sample.vue

<script>
export default {
  mounted() {
    // 子コンポーネントのロードを無視して実行
    this.$nextTick(() => {
      // ビュー全体がレンダリングされた後に実行
    })
  }
}
</script>

```

`mounted` のフックで実行すると、子コンポーネントを無視して実行してしまうので、すべてのレンダリングを待つときは、`this.$nextTick` を利用します。

### IE11 へのポリフィル

頭を悩ましたくない IE のやつですが、プロダクションではまだまだ当たり前ですよね … polyfill.io を使うと柔軟に対応できるかと思います。 `nuxt.config.js` から `head` 内に読み込ませます。

```nuxt.config.js
head: {
  script: [{ src: ‘https://cdn.polyfill.io/v2/polyfill.min.js?features=default’ }],
},
```

- [Polyfill service](https://cdn.polyfill.io/v2/docs/examples)

### gtag.js のトラッキング

GA トラッキングの gtag.js のモジュールが公開されていなかったので（たぶん）、plugins ディレクトリに gtag.js というスクリプトを作りました。

```plugins/gtag.js

export default ({app, store}) => {

  if (process.env.NODE_ENV !== 'production') return;

  (function (win, doc, script, url) {
    let a = doc.createElement(script);
    let m = doc.getElementsByTagName(script)[0];
    a.async = 1;z
    a.src = url;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=UA-xxxxxx-1');

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-xxxxxxx-1');

  app.router.afterEach((to, from) => {
    gtag('config', 'UA-xxxxxxx-1', {
      'page_path': router.history.base + to.fullPath,
      'page_title': store.state.title,
    });
  });

}
```

ここでは `store.state.title` で vuex の state にセットしている title にアクセスしています。省略しますが、page/\*.vue でタイトルを State に渡すメソッドを叩いて受け渡すような処理をしています。

nuxt.config.js で読み込みます。

```nuxt.config.js

  plugins: [
    { src: '~plugins/gtag.js', ssr: false }
  ]

```

`ssr: false` としているのは、`window` や `document` が `undefined` に、ならないようにするためです。

- [window または document が undefined - Nuxt.js](https://ja.nuxtjs.org/faq/window-document-undefined/)

と、自作してみたんですが

その後 [GitHub - nuxt-community/google-gtag: Enable google gtagjs for NuxtJs](https://github.com/nuxt-community/google-gtag) が作られていまして、これを利用するのがいいと思います 🎉

ただし、 router.base でルートディレクトリを変更している場合、送信先の path がずれてしまうので注意します（[pull request しました](https://github.com/nuxt-community/google-gtag/pull/4)）。

### port と host を変更する

アクセスする開発用サーバの port と host を変更します。
Host を設定すると、同一のネットワークのことなるデバイスからアクセスできるようになるので、 モバイルデバイスの実機デバッグや virtualbox 環境のデバッグなど効率よくはかどるので、設定しておくのがオススメです。

```package.json

"scrips": {
  "dev:development": PORT=8080 HOST=0.0.0.0 nuxt"
}

```

### Nuxt のビルドとデプロイを CI でやってみる

Nuxt を GitLab CI でビルドして GitLab Pages に自動デプロイするためのサンプルです。

プロジェクトルートに次のコードを設置して、master にコミットすると CI が動きます。

```.gitlab-ci.yml

image: node:latest
pages:
  stage: deploy
  only:
    - master
  before_script:
    - 'yarn config set cache-folder .yarn'
    - 'yarn install'
  script:
    - 'yarn generate'
    - 'cp -pr dist public'
  artifacts:
    paths:
      - public

```

#### ちょっと注意

なぜか、CI 上で `~` と `@` のエイリアスの解決ができなかったので、nuxt.config.js で再定義します。

```nuxt.config.js

  build: {
    extend() {
      config.resolve.alias['~'] =  path.resolve(__dirname);
      config.resolve.alias['@'] =  path.resolve(__dirname);
    }
  }

```

GitLab CI すごく便利です ○

## まとめ

というわけで、Nuxt で静的サイトを作るための小粒な知識のまとめでした。
Transition や Vuex などのことを省いてしまっていますが、強力なドキュメントがあるのでそちらを参考にすればよいかと思います＊

- [Vuex ストア - Nuxt.js](https://ja.nuxtjs.org/guide/vuex-store/)
- [API: transition プロパティ - Nuxt.js](https://ja.nuxtjs.org/api/pages-transition#transition-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3)

Nuxt を使うようになって、ほんとうに静的サイト構築が楽になったので、各地でオススメしています！

ぜひとも 😇

### Nuxt を深めるための資料

- [「結局 Nuxt.js って何がいいの？」に対する回答](https://slides.com/potato4d/vuejs_meetup7#/)
- [Web サイト制作にこそ Nuxt.js がベストマッチである理由 - SCOUTER 開発者ブログ](https://techblog.scouter.co.jp/entry/2018/03/19/115229)
- [note を Nuxt.js で再構築した話 - Speaker Deck](https://speakerdeck.com/fukuiretu/notewonuxt-dot-jsdezai-gou-zhu-sitahua)

### Nuxt 関連書籍

[Nuxt.js ビギナーズガイド―Vue.js ベースのフレームワークによるシングルページアプリケーション開発 | 花谷 拓磨 |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4863542569/)
[Vue.js 入門 基礎から実践アプリケーション開発まで | 川口 和也, 喜多 啓介, 野田 陽平, 手島 拓也, 片山 真也 |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4297100916/)
[基礎から学ぶ Vue.js | MIO | 工学 | Kindle ストア | Amazon](https://www.amazon.co.jp/dp/B07D9BYHMZ/)

## Firebase Hosting へデプロイ

Firebase CLI をインストールします。

```bath
npm install -g firebase-tools
```

```bath
firebase init
firebase deploy
```

おわります
