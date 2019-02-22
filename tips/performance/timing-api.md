# ページロードの速度を左右するネットワーク処理

Web ページを構成する各種サブリソースに対するネットワーク処理と、それに関連するブラウザの挙動についてのはなしです。

## ページロード時間の理想は 1 秒以内

ページロード時間の理想は 1 秒以内と言われますが、 それは十分な時間ではなく、ネットワークやレンダリングには大量の処理が発生します。HTML を取得するための最初のリクエストだけでもそれ以上が消費されることもあるので、すべての処理を 1 秒以内に収めることは難しいです。

## ネットワーク処理の速度に影響を与える要素

ページロードスピードにおいて、HTTP プロトコルでやりとりされるネットワーク上の処理がもっとも大きなウェイトを占めています。

### リソースの大きさ

ファイル（ペイロード）サイズが大きければ、そのデータを転送するために多くの時間がかかります。テキストデータや画像データを圧縮することでリソースの大きさを最小限に抑えます。

### HTTP リクエストの数

ブラウザはページロードを完了するまで、HTML ドキュメントをロードするだけでなく、それに紐付くアセットをロードするために連続的に HTTP リクエストします。リクエストの数が多くなれば、通信距離のオーバーヘッドや転送量は増加しやすくなります。ブラウザがキャッシュを利用することでムダな HTTP リクエストを抑えます。

### ネットワークの通信距離

データがサーバとクライアントの間を往復するために有線または無線による通信網を通過する時間や、ルータでリレー処理が行われる時間は、ネットワーク処理上のオーバーヘッドになります。

## ネットワーク処理の流れ

HTTP リクエストの流れは

1. DNS でホスト名の名前解決
2. TCP 接続の確立
3. サーバへのリクエスト
4. サーバからのレスポンス

ここにかかる時間もネットワーク処理の遅延につながります。

### ホスト名の名前解決

ブラウザでは HTTP リクエストの前に、URL のドメインに対応する IP アドレスを DNS を通じて探します。これを **DNS ルックアップ**と言います。

### TCP 接続の確立

HTTP は TCP の上位レイヤのプロトコルなので、その前提として TCP 接続を確立します。

1. クライアントからサーバへの接続要求（SYN）
2. サーバによる接続要求に対する応答（SYN-ACK）
3. クライアントによる接続開始応答（ACK）

という 3 段階のパケットのやりとりを必要とします。これを **TCP 3 ウェイハンドシェイク**と言います。

HTTPS では、SSL/TLS のハンドシェイクが行われます。通信の暗号化に必要な鍵、セッション ID、乱数などをクライアントとサーバ間でやりとりします。

### HTTP リクエストとレスポンス

TCP 接続が確立すると、クライアントは HTTP リクエストが可能になり、サーバはリクエストに応じてレスポンスを送信します。

サーバがクライアントにデータを送信するとき、転送効率が低下しないように小さいデータサイズで送信を始めて徐々に転送速度を上げていきます。これを TCP スロースタートと言います。

## HTTP/2 によるネットワーク処理の効率化

HTTP/1 では、1 つの TCP コネクションにつき 1 組のリクエストとレスポンスしか同時に扱うことができませんでした。HTTP/2 からは、1 つの TCP コネクション内に複数の独立したストリームを生成して多重化し、HTTP リクエストとレスポンスを並列で実行できるようになりました

### 通信の多重化と並行リクエスト。

HTTP/1 では単一のドメインに対する TCP の同時接続数が、大抵のブラウザで最大 6 に制限されていたので、複数の TCP コネクションを持つ（異なるドメインにリクエストする）ことで並行性を確保していました。HTTP/2 では 1 つの TCP コネクション内で作れるストリームが無制限で、同時接続数という概念はなくなり、HTTP/1 より高い並列性を持って実行できます。

HTTP/2 が 1 つの TCP コネクションで**複数のストリームを生成できることによって、HTTP/1 で同時接続数を増やすために行っていた配信ドメインの分散（ドメインシャーディング）も不要**になりました。ドメインシャーディングは TCP コネクションや DNS ルックアップなどの処理をドメインごとに発生させてしまうぶん、不要なオーバーヘッドを発生させていました。

### HPACK によるヘッダ圧縮

HTTP/1 のリクエストヘッダとレスポンスヘッダはテキスト形式で、リクエストが多いほどそのオーバーヘッドの影響は大きくなります。

HTTP/2 では、リクエストやレスポンスのヘッダを HPACK というアルゴリズムで圧縮してヘッダのサイズを小さくしています。 同一ドメインの静的なリソースなど、**共通のヘッダが多いほど効率的に圧縮される**ことになり、ヘッダが小さくなります。

### 取得リソースの優先度制御

HTTP/2 ではクライアントの定義する優先度に応じて配信を制御します。優先度はリソースどうしの依存関係と重みによって定義されます。ページの構成に必須の HTML、CSS、JavaScript などのリソースはブラウザによって優先度が高く設定され、いち早く配信されるようになっています。表示上クリティカルにならない画像や非同期にロードされる JavaScript などは優先度が低く扱われます。
](

## ブラウザのさまざまな処理時間を計測する Timing API

ブラウザ上ではユーザーのページ処理時間を得るために Timing API を利用します。Timing API はユーザーがページを開いてから発生したさまざまな実測値を取得します。ロードやリソース取得の時間などがあり、実際のユーザー側でページの処理時間をモニタリングできます。合成モニタリングや、リアルユーザモニタリングで計測に使用されています。

### 任意のタイミングを計測する User Timing

User Timing は任意のタイミングの処理時間を計測する API です。スクリプト処理中に performance.mark()メソッドを呼び出すことで、そのタイミングに名前を付けて後から参照できるようにします。また performance.measure()メソッドを使えば、記録した mark()からの差分を算出し保存できます。

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

- https://www.w3.org/TR/navigation-timing/#processing-model

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

Resource Timing はサブリソース取得時の詳細な情報を取得します。CSS、JavaScript、画像ファイルのような静的リソースや非同期通信も含まれます。Resource Timing では、performance.getEntriesByType()メソッドに resource を渡して呼び出すことで、サブリソースに関するネットワーク処理結果を取得できます。

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

### First Paint

First Paint はページのレンダリングが始まった、真っ白な画面からなにかが表示された、ページロード直後のタイミングを指します。

### First Contentful PaintFirst

First Contentful PaintFirst はコンテンツのレンダリングが始まった、テキストや画像が初めて表示されたタイミングを指します。

## Server Timing - サーバ内で発生した処理時間

Server Timing は、サーバ内部の処理にかかった時間をレスポンスヘッダのフィールドに含めることで、ブラウザ側の API を介してクライアントサイドで取得します。データベースアクセスやデータのキャッシュ、レスポンスの成形処理といったそれぞれの処理時間を計測しておいて、レスポンスヘッダに含めることで、ブラウザに蓄積されて API からアクセスできます。)
