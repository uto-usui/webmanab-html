# ES6のアロー関数でjQueryのイベント内のthisがundefinedになるのに対処する -『javascript』

ES6のアロー関数を使って関数を定義しているときjQueryのイベント内で`this`を参照すると`undefined`になる現象を回避するtipsです。




## ES6のアロー関数でjQueryのイベント内のthisがundefinedになるのに対処する

ES6の記法では`function`を省略したアロー関数を使うことができます。記述が簡潔になって見通しが良くなるので、これは多用しますよね。


#### javascript

```

var test = () => { // var test = function() { ...
  console.log('ok');
}
test(); // ok

```




### アロー関数でjQueryのイベント内のthisがundefinedになった

しかし、jQueryを利用しているとき、イベント内(`.on`とか`.each`とか)の`this`が`undefined`になってしまい、思ったような挙動を得ることができません。


#### javascript

```

var click = () => {
  $('#js-click').on('click', () => {
    $(this).addClass('is-active');
    console.log(this);
  });
}
click();
// can not grant is-active. // undefined

```


これをざざっとまとめてしまうと、通常`.on`関数内の`this`はその要素を指しますが、アロー関数内の`this`は`window`オブジェクトを指します。そしてES6からES5へのコンパイルでbabelを通すことで`use strict`モードが適用され、`this === window`に対して`undefined`と評価しています。

* `.on`内のアロー関数の`this`は`window`を指す
* babelのコンパイルで`use strict`が適用
* `this === window`がundefinedと評価される

このような流れでjQueryのイベント内の`this`が`undefined`になっています。


### アロー関数でjQueryのイベント内のthisを本来のthisとして取り出す

これに対処する方法は簡単で、第一引数のプロパティから取り出します。`e.currentTarget`に本来利用したかった`this`がいます。


#### javascript

```

var click = () => {
  $('#js-click').on('click', (e) => {
    e.preventDefault();
    $(e.currentTarget).addClass('is-active');
  });
}
click();

```

そもそもアロー関数使わなかったらいいのでは？とかいう案も展開されたりしたのですが、それだと元も子もないような気がしたので、ぼくはこの方法を採用しています。









おわります。
