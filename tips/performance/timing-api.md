# ページロードの速度を左右するネットワーク処理

Web ページを構成する各種サブリソースに対するネットワーク処理と、それに関連するブラウザの挙動についてのはなしです。

## ブラウザのさまざまな処理時間を計測する Timing API

ブラウザ上ではユーザーのページ処理時間を得るために Timing API を利用します。Timing API はユーザーがページを開いてから発生したさまざまな実測値を取得します。ロードやリソース取得の時間などがあり、実際のユーザー側でページの処理時間をモニタリングできます。合成モニタリングや、リアルユーザモニタリングで計測に使用されています。

### 任意のタイミングを計測する User Timing

User Timing は任意のタイミングの処理時間を計測する API です。スクリプト処理中に `performance.mark()` メソッドを呼び出すことで、そのタイミングに名前を付けて後から参照できるようにします。また、記録した `mark()` からの差分を算出し保存できます。

```js
(async () => {
  performance.mark("start");
  await axios.get(`https://exsample.com/api/`);
  performance.mark("end");
  performance.measure("time", "start", "end");
  console.log(performance.getEntriesByType("mark"));
  console.log(performance.getEntriesByType("measure"));
})();
```

### ブラウザのページロードにおける各段階にかかった時間を取得する Navigation Timing

Navigation Timing は、ページへのナビゲーション時に発生する、DNS ルックアップや TCP 接続、リクエストといった一連のそれぞれの詳細なメトリクスを得ることができます。

- <https://www.w3.org/TR/navigation-timing/#processing-model>

メトリクスからはそれぞれの処理の開始と終了が取得して、その差分からどれだけ時間がかかっているかを得ることができます。

```js
const timing = performance.timing;
const arr = [
  `Unload: ${timing.unloadEventEnd - timing.unloadEventStart}`,
  `Redirect: ${timing.redirectEnd - timing.redirectStart}`,
  `App Cache: ${timing.domainLookupStart - timing.fetchStart}`,
  `DNS: ${timing.domainLookupEnd - timing.domainLookupStart}`,
  `TCP: ${timing.connectEnd - timing.connectStart}`,
  `Request: ${timing.responseStart - timing.requestStart}`,
  `Response: ${timing.responseEnd - timing.responseStart}`,
  `Processing: ${timing.domComplete - timing.domLoading}`,
  `Onload: ${timing.loadEventEnd - timing.loadEventStart}`
];
console.log(arr);
```

### リソース取得に関する情報を取得する - Resource Timing

Resource Timing はサブリソース取得時の詳細な情報を取得します。CSS、JavaScript、画像ファイルのような静的リソースや非同期通信も含まれます。Resource Timing では、`performance.getEntriesByType()` メソッドに resource を渡して呼び出すことで、サブリソースに関するネットワーク処理結果を取得できます。

```js
const resources = performance.getEntriesByType("resource");

for (const res of resources) {
  const arr = [
    `Name: ${res.name}`,
    `Entry Type: ${res.entryType}`,
    `Start Time: ${res.startTime}`,
    `Duration: ${res.duration}`,
    `Redirect: ${res.redirectEnd - res.redirectStart}`,
    `DNS: ${res.domainLookupEnd - res.domainLookupStart}`,
    `TCP: ${res.connectEnd - res.connectStart}`,
    `Request: ${res.responseStart - res.requestStart}`,
    `Response: ${res.responseEnd - res.responseStart}`
  ];
  console.log(arr);
}
```

## Web ページのレンダリング状況に関する処理時間 - Paint Timing

ページのナビゲーション時に発生する処理や、サブリソースの取得状況は Navigation Timing や Resource Timing で取得できますが、実際レンダリングされたことをあらわす UX 指標として Paint Timing (First Paint / First Contentful PaintFirst)があります。

```js
 const paints = performance.getEntriesByType('paint');
 for (const paint of paints) {
   const arr = [
     `Name: ${paint.name}`,
     `Entry Type: ${paint.entryType}`,
     `Start Time: ${paint.startTime}`,
     `Duration: ${paint.duration}`
   ]
   console.log(arr);
 }
```

### First Paint

First Paint はページのレンダリングが始まった、真っ白な画面からなにかが表示された、ページロード直後のタイミングを指します。


```js
const servers = performance.getEntriesByType('server');
 for (const server of servers) {
   const arr = [
     `Name: ${server.name}`,
     `Entry Type: ${server.entryType}`,
     `Start Time: ${server.startTime}`,
     `Duration: ${server.duration}`,
     `Metric: ${server.metric}`,
     `Description: ${server.description}`
     ]
     console.log(arr);
 }
```
