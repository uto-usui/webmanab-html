# 数秒後に処理を実行するsetTimeout()とJQueryのqueue()の扱い方 -『javascript』


アニメーションなど何かの処理を遅らせて実行したいときや、前後関係をもたせたいときにJavaScriptの`setTimeout()`で実装する場合とJQueryの`delay()`と`queue()`で実装するときのtipsです。











## 数秒後に処理を実行するsetTimeout()とJQueryのqueue()の扱い方







### setTimeout()を使って処理を遅らせる

JavaScriptの`setTimeout()`を使うことで処理を遅らせることができます。`setTimeout()`は関数と時間を指定して、指定した時間が経過したとき、指定した関数を実行するメソッドです。



```

//setTImeout(myfunc, time);

setTimeout(function() {
  $('.js-late').addClass('active').text('One second later');
  },
1000)

```


### JQueryのqueue()を使って処理を遅らせる


アニメーションの遅延は`delay()`で処理できますが、そのあとの処理が`addClass()`などだと実行することができません。さらに`queue()`を使うことで遅延処理を実行することができます。

```

$('.js-late’).delay(1000).queue(function() {
  $(this).addClass('active').text('One second later');
});

```
