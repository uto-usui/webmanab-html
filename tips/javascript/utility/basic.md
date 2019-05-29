# JavaScript で使うさまざまな処理

JavaScript の開発で頻出するさまざまな処理のまとめです。

## 配列で要素の存在確認

`includes` を利用して特定の要素が存在するかどうかを調べます。

```js
var arr = ["a", "b", "c"];

if (arr.includes("a")) {
  // 存在する
}

if (arr.includes("a")) {
  // 存在しない
}
```

## 連想配列を列挙する

連想配列の key と value を取得します。

こんなオブジェクトとします。

```js
let obj = {
  ruffy: {
    age: 19,
    from: east
  },
  nami: {
    age: 20,
    from: east
  },
  sanji: {
    age: 21,
    from: north
  }
};
```

### Object.entries

`Object.entries()` メソッドは、引数に与えたオブジェクトが所有する、列挙可能な `[key, value]` からなる配列を返します。

- [Object.entries() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

```js
for (let [key, value] of Object.entries(obj)) {
  console.log(`key: ${key} value: ${value}`);
}
```

### Object.keys() と for-of

`Object.keys()` 配列内のオブジェクト自身のキーのみを返します。それを for-of することで、値を取得します。

```js
for (const key of Object.keys(obj)) {
  console.log(key, obj[key]);
}
```

### Object.keys(obj).forEach

- [Object.keys() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [TypedArray.prototype.forEach() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach)

```js
Object.keys(obj).forEach(key => console.log(`key: ${key} value: ${obj[key]}`));
```

### for-in

`for-in` ループではプロトタイプチェーン内のプロパティも列挙されます。

- [for...in - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...in)

```js
for (let key in obj) {
  console.log(`key: ${key} value: ${obj[key]}`);
}
```
