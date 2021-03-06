# $(this)のはなし






## すこしややこしい$(this)のはなし

`$(this)`を使っているとうまくいかないことがあるのでなんとなく理解できるように解説しておきます。




### $(this)をわかりやすくとらえる

`$(this)`ってなに？を考えるときわかりやすくするために、`this`と`$()`に分解してみます。`$()`は**jQuery関数の呼び出し**なので`this`だけにフォーカスをあてます。

`this`の使いどころとして、例えばクリックされた要素に対してだけ何か行いたいとき、セレクタで要素指定すると同じセレクタの要素にも処理が適用されてしまうということがあるのですが、それを防ぐために`this`を利用することがあります。

```
$('.ex').on('click', function() {
  $(this).addClass('clicked);
});
```

上記のように記述することで、`ex`というクラス属性をすべてjQueryオブジェクトとして選択して、それにクリックイベントを登録し、クリックした要素にだけ `clicked`というクラス属性を追加する、という処理を実現しています。


### $(this)はオブジェクトを参照している

しかし次のコードは　意図した通りに動きません。クリックした要素にクラスを追加、2秒後にそのクラスを削除するという処理がゴールです。


```
$('.ex').on('click', function(){
  $(this).addClass('clicked');
  setTimeout( function(){
    $(this).removeClass('clicked');
  }, 2000 );
});
```

このとき`setTimeout()`の中の`this`には`window`が入っています。これは`this`が常にそのメソッドのオブジェクトを参照しているからです。つまり`setTimeout()`のオブジェクトが`window`なので、そこからクラスを削除しようとしている処理になっています。

これを正しく動作させるには`this`を変数にコピーしておくことで解決します。


```
$('.ex').on('click', function(){
  var target = $(this);
  target.addClass('clicked');
  setTimeout( function(){
    target.removeClass('clicked');
  }, 2000 );
});
```
