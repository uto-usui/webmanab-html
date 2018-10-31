# Promise

`Promise`はコールバックの欠点を補うために考案されました。`Promise`はコールバックを不要にしてくれる、というわけではく、`Promise`を使うことによってコールバックが定型的にパターン化して処理されることで、分かりやすいコードを実現します。





## Promiseとは

`Promise`は非同期処理をラップします。
非同期処理の関数を呼び出すと、`Promise`オブジェクトのインスタンスを返します。この返された`Promise`は非同期処理をラップしています。

`Promise`の状態は`fulfilled`(成功)と`rejected`(失敗)のどちらかです。`Promise`ではどちらかの状態になっていることが保証されています。その状態を利用して、`onfulfilled`(成功の処理)と`onRejected`(失敗の処理)に分けて別々に記述します。

成功してから失敗することも、失敗してから成功することもなく、どちらかの状態になると`Promise`は`settled`(確定)されたとみなされます。確定していない場合は、`pending`(保留)の状態です。





## Promiseを使う

```

const asyncFunc = () => {

  return new Promise ((onFulfilled, onRejected) => {

    // some async function

    // 成功状態の処理 パラメーターを呼び出し元に与える
    onFulfilled(pOnFulfilled);

    // 失敗状態の処理　パラメーターを呼び出し元に与える
    onRejected(pOnRejecteded);

  });

};


asyncFunc().then((pOnFulfilled) => {

  // 成功したとき

}).catch((pOnRejecteded) => {

  // 失敗したとき

});

```

* 非同期処理の関数(asyncFunc)を定義
* `Promise`を`new`して`return`する
* `Promice`内の関数は`onFulfilled`と`onRejected`の引数を取る
* 非同期処理が成功したら`onFulfilled()`を呼び、`then()`の第一引数の関数を実行する
* 失敗したら`onRejected()`を呼び、`catch()`か`then()`の第二引数の処理を実行する




## Promiseのチェイン

`Promise`の特徴として、ある`Promise`が成功したら、次の`Promise`を返す関数を実行できるcaining(チェイン)があります。

```

const asyncFunc = (count) => {

  return new Promise ((onFulfilled, onRejected) => {

    // 成功状態の処理 パラメーターを呼び出し元に与える
    onFulfilled(count);

  });

};


asyncFunc(1).then((count) => {

  console.log(count);
  count = count + 1;
  return asyncFunc(count);

}).then((count) => {

  console.log(count);
  return asyncFunc(++count);

});

```

