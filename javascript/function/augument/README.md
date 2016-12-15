# 引数の記法

引数の記法について。






## 引数の数

JavaScriptでは関数を実行する際に、与える引数の数が関数側で要求しているものと異なっていても、**引数の差異をチェックせずに実行**します。引数が足りない場合でも、余分な場合でも関数は実行されます。

```

var member = function(a) {
  console.log(a);
}
member('nami'); // nami
member(); // undefined
member('zoro','nami'); // zoro

```

このとき、余分だった引数は破棄せずに、JavaScriptは`arguments`オブジェクトとして管理します。`arguments`オブジェクトには、すべての引数の値が保存されていて、その関数の配下のみで扱うことができます。




















