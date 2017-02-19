# setIntervalを利用して、スクロールが終わった時に何か処理をするスクリプト -『javascript』

`setInterval()`を利用して、スクロールが終わったときに何か処理するためのコードです。スクロールのイベントが発生したら真偽値を代入して、それを`setInterval()`でチェックします。


## setInterval()で、スクロール終了したときになにかする

下記のコードはjQueryを利用しています。

#### javascript

```

let didScroll;

$(window).on('scroll', function() {
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    didScroll = false;
    console.log('finish:)');
  }
}, 250);

```
