# 特定の文字列が含むかどうかをチェックする -『javascript』

特定の文字列が含まれるかどうかで処理を行ったり、分岐させるためのスクリプトです。





## 特定の文字列が含むかどうかをチェックする




### match()をつかう

`match()`で文字列が含まれれば配列、文字列が含まれなければnullが返ることを利用します。

```

var text = 'this is text'
if ( text.match(/text/)) {
  console.log('match!!');
}

```



### indexOfを使う

`indexOf()`で文字列があれば文字列がある場所(1以上の値)、文字列がなければ-1が返ることを利用します。


```

var text = 'this is text'
if ( text.indexOf(/text/) != -1) {
  console.log('match!!');
}

```









おわります。
