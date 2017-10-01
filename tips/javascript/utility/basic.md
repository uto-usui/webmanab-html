# JavaScript で使う様々な処理

JavaScriptの開発で頻出る様ざまな処理のまとめです。


## 配列

### 要素の存在確認

`indexOf` を利用して特定の要素が存在するかどうかを調べます。

```

var arr = ["a", "b", "c"];

if (arr.indexOf("a") >= 0){
  // 存在する
}

if (arr.indexOf("a") == -1){
  // 存在しない
}

```

