# 制御構文




## try catch finally --例外処理

スクリプトがエラー(例外)により停止しないように例外処理を行うには`try` `catch` `finally`命令を使います。

```

let n = 1;

try {
  // 例外処理を判定したい処理
  n = n + m;
} catch (e) {
  // 例外がおきたときの処理
  console.log(e.message);
} finally {
  // 例外の有無どちらでも最終的に実行する処理
  console.log('fin.');
}

```

`try`ブロックの中には例外処理の判定にかけたい内容を記述します。`catch`ブロックには例外がおきた場合の処理を記述し、`Error`オブジェクトとして例外情報が渡されます。`finally`ブロックは例外の有無にかかわらず最終的に実行する処理を記述し、必要なければ省略します。





### throw

例外処理はプログラムで発生したエラーを回避するだけでなく、自分で発生させることもできます。例外を発生させるのは`throw`命令です。

```

let n = 1;

try {
  if (m === undefined) { throw new Error('「m」がないです。') }
  n = n + m;
} catch (e) {
  console.log(e.message);
} finally {
  console.log('fin.');
}

```

