# 《Vue.js》VuePress と GitLab CI を使って自動ビルド & デプロイされるドキュメント管理環境をサクッと作る方法。
VuePress と GitLab CI を使って自動ビルド & デプロイされる環境を作ることで、マークダウンをレポジトリにコミットしたら、ドキュメントページに反映されるシステムを構築します。

すごく、かんたんです 🍟


## VuePress って
つい先日  [VuePress](https://vuepress.vuejs.org) (0.3.1) がリリースされました 🎉

VuePress はドキュメント作成に特化した静的サイトジェネレーターです。くわしくはこちら => [VuePress をお試ししてみた - Qiita](https://qiita.com/dojineko/items/aae7e6d13479e08d49fd) でわかりやすく解説されているので割愛します。


### Nuxt でやってたことが VuePress でできそう
いろいろ期待してしまうのは、名前もそうだし、Todo Features に 「Blogging support」が挙げられていることだと思います。さいきん Nuxt.js でいい感じにブログシステムを構築したばかりなのですが、、、😇 
う、嬉しいことですね、はい◎



## 最小構成の準備
先ほど紹介した => [VuePress をお試ししてみた - Qiita](https://qiita.com/dojineko/items/aae7e6d13479e08d49fd) を参考に環境を用意します。たぶん最小構成はこんな感じです。


### ファイルツリー

```file-tree.bath

.
├── .gitlab-ci.yml
├── docs
│   ├── .vuepress
│   │   └── config.js
│   ├── README.md
│   └── about
│       └── README.md
└── package.json

```


### package.json

```package.json

{
  "name": "vue-press-test",
  "description": "vue-press-test 1.0",
  "version": "0.1.0",
  "author": {
    "name": "uto-usui",
    "email": "me@uto-usui.com"
  },
  "devDependencies": {
    "vuepress": "^0.3.1"
  },
  "scripts": {
    "docs:build": "vuepress build docs",
    "docs:dev": "vuepress dev docs"
  }
}

```


### docs/README.md

```README.md

---
home: true
heroImage: /logo.svg
actionText: _about
actionLink: /about/
features:
- title: VuePress
  details: It is made with VuePress
- title: Gitlab CI
  details: Automatic deployment with Gitlab CI.
- title: Anyone can edit
  details: Any member can write this by committing to the master branch of the repository.
footer: © grandstar,inc.
---

### overview

社内共有のドキュメントなどをまとめています。

::: tip
**VuePressのお試し 🙏**
:::

```


### about/README.md

これはサンプルとして用意した内容です。なんでも大丈夫です。

```README.md
---
sidebar: auto
---
# About

ただのサンプルです。

## News

* 2018-04-17 リリース

```


### config.js

```config.js

// https://vuepress.vuejs.org/config/

module.exports = {
  base: '/name/', // プロジェクトのベースUrl
  title: 'my document',
  description: 'documents library',
  themeConfig: {
    repo: 'https://gitlab.com/id/name/',
    docsDir: 'docs',
    nav: [
      {
        text: 'about',
        link: '/about/',
      }
    ]
  }
};

```



## 自動ビルドとデプロイ
公式のドキュメント => [VuePress | Deploying](https://vuepress.vuejs.org/guide/deploy.html) に、デプロイ方法がありますが、ぼくはよく GitLab にプロジェクトを展開しているので、 GitLab CI で自動ビルドからのデプロイされる環境を作ってみました。

GitLab CI の取り扱いはとてもかんたんで、`.gitlab-ci.yml` を設置すると自動で認識してくれます。
今回は master ブランチに push したときに動くようにしました。



### どこかのサーバーにデプロイ
任意のサーバーにデプロイしたい場合は、次のように `.gitlab-ci.yml` をつくります。
 `DEPLOYDIR` 以外の変数は任意のものを記述します。

```.gitlab-ci.yml

variables:
  HOST: "your-host"
  USERNAME: "your-name"
  PASSWORD: "your-pass"
  SERVER: "./domain/public_html/dir"
  DEPLOYDIR: "docs/.vuepress/dist"

image: node:latest
deploy:
  stage: deploy
  before_script:
    - 'yarn config set cache-folder .yarn'
    - 'yarn install'
  script:
    - 'yarn docs:build'
    - apt-get update -qq && apt-get install -y -qq lftp
    - lftp -c "set ftp:ssl-allow no; open -u $USERNAME,$PASSWORD $HOST; mirror -R $DEPLOYDIR $SERVER --parallel=100"
  only:
    - master

```


### GitLad Pages にデプロイ
今回 GitLad を利用しているので、もっとかんたんに GitLad Pages にデプロイしてみます。

```.gitlab-ci.yml

image: node:latest
deploy:
  stage: deploy
  before_script:
    - 'yarn config set cache-folder .yarn'
    - 'yarn install'
  script:
    - 'yarn docs:build'
    - 'cp -pr docs/.vuepress/dist public'
  artifacts:
    paths:
      - public
  only:
    - master

```



## できた
というわけで、master に push すると自動ビルド & デプロイする環境が構築できました 👏
デフォルトテーマだと、次のような画面になります。

[image:F82B5FEE-6968-4CC1-96E8-FA14B83DA196-5547-0000434D25EBF623/screencapture-localhost-8080-2018-04-17-22_02_10.png]



## まとめ
というわけで、かんたんにドキュメントページの自動更新システムを構築することができました。

ただマークダウンをコミットしていくだけで、いい感じのドキュメントが作れるって素敵すぎです。。執筆のモチベーションも上がりました！

まだまだこれから VuePress の機能が提供されていくことも考えると、いい感じにブログを作ることもかんたんに出来そうですね。
これから楽しみです...

というわけで、VuePress の素敵さを多くの方に知ってもらえればと思いますー、ぜひぜひお試しください＊
