# LightHouse でパフォーマンスを計測
LightHouse はフロントエンドパフォーマンス計測のデファクトになっています。いくつか導入方法があるので、まとめます。

* [Lighthouse によるウェブアプリの監査  |  Tools for Web Developers  |  Google Developers](https://developers.google.com/web/tools/lighthouse?hl=ja)

## Measure
Web.dev の Measure を利用すると URL を入力するだけで、計測結果を確認でき、レポートも出力してくれます。

* [Measure](https://web.dev/measure/)

ただし Measure で計測すると

> All tests are run using a simulated mobile device, throttled to a fast 3G network & 4x CPU slowdown.

というように、3G network 回線での結果になるので、辛めの結果が返ってくることになります。このあたりのオプションを渡したりすることはできないので、Measure では簡易なチェックと考えておくとよいです。

## lighthouse CLI
lighthouse を コマンドラインから実行するために CLI が用意されています。これを使うと自動で結果を溜めたり、いろんな言語でいい感じに動かしてやることも可能です。

* [GitHub - GoogleChrome/lighthouse: Automated auditing, performance metrics, and best practices for the web.](https://github.com/GoogleChrome/lighthouse)

Node.js をローカルにインストールしているのが前提で lighthouse をインストールします。

```bath

npm install -g lighthouse

```

シンプルにコマンドラインから実行します。throttling を無効化すると次のように、`https://google.com` の部分が任意の URL です。

```bath

lighthouse https://google.com —quiet —throttling.cpuSlowdownMultiplier=1 —throttling-method=provided

```

実行すると Chrome が立ち上がって計測が始まり、html でレポートを吐き出してくれます。lighthouse CLI は色々とオプションが用意されていて計測をカスタマイズできます。たとえば実用的なところでいうと field data を調査するためのプラグインがあったり。

* [GitHub - treosh/lighthouse-plugin-field-performance: Add “field” performance data to your Lighthouse report](https://github.com/treosh/lighthouse-plugin-field-performance)

## Chrome 拡張機能
Lighthouse は Chrome 拡張機能で実行することもできます。

* [Lighthouse - Chrome ウェブストア](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)

おわります。
