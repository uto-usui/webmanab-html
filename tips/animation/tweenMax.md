# TweenMaxをつかう

TweenMaxは、GreenSock社が開発したDOMアニメーションに特化したJavaScriptライブラリです。requestAnimationFrameを使用していて動作が高速なのが特徴でwebGLを動かすのにも有用です。


#### cdn

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
```

ざっくりとしたチートシートがここにまとまっているので参考になります。


* [GreenSock-Cheatsheet](https://ihatetomatoes.net/wp-content/uploads/2016/07/GreenSock-Cheatsheet-4.pdf)








## TweenMaxの基本的な使い方

記述は簡単で覚えやすいです。基本のアニメーションの設定は以下のように記述します。


#### javascript

```

TweenMax.method(element, time, { prop: value }, (delay));
TweenMax.to('#anim', .5, { x: 200 });

```

method
: 実行するメソッド

element
: セレクタ

time(duration)
: アニメーション継続時間

prop: value
: 様々なプロパティ

delay
: stagger実行時の配列の要素ごとの遅延時間



### オブジェクトに動きをつけるためのメソッド

オブジェクトにアニメーションを設定する主要なメソッドは以下のものを使い分けます。

set
: アニメーションせずにプロパティの値を設定する

to
: 初期値から、設定した値にアニメーションする

from
: 設定した値から、初期値にアニメーションする

fromTo
: 初期値を再設定して、設定した値から初期値にアニメーションする

stagger (From / To / FromTo)
: 配列で渡したオブジェクトを、順番にアニメーションする


#### javascript

```

let $animItem = $('.js-stagger');

TweenMax.staggerFrom(
  $animItem, // セレクタ
  1.45, // アニメーション継続時間
  {
    x: 400,  // translateX
  },
  .15 // 配列の次の要素のアニメーションの遅延時間
);

```




### アニメーションしたいオブジェクト指定するセレクタ

アニメーションしたいオブジェクトを指定する方法は、`id`や`class`や、jQueryオブジェクトで指定できます。また、配列(jQueryオブジェクト集合)を渡すことで、複数のオブジェクトを同時にアニメーションすることができます。


```

TweenMax.to('#anim', .5, { x: 200 });
TweenMax.to('.anim', .5, { x: 200 });
TweenMax.to($anim, .5, { x: 200 });

```



### アニメーションの継続させる時間

アニメーション継続時間(duration)は秒指定します。ミリ秒でないところに少し注意です。









## アニメーションの詳細を設定するプロパティ

スタイルに関してはCSSのプロパティ名と少し異なる名前が付いているプロパティもありますが、直感的にわかりやすい名前に変更されているのですぐ理解できます。ハイフン付きのCSSプロパティはキャメルケースで記述します。

値には数値、単位付きの文字列、関数を指定することができます。


#### javascript

```

let $animItem = $('.js-anim');

TweenMax.staggerFrom(
  $animItem,
  1,
  {
    rotation: 180,  // 回転
    x: 400,  // translateX
    y: 400,  // translateY
    z: 400,  // translateZ
    backgroundColor: 'hsla(180,50,50,1)',  // 背景色
    color: function() {
      return 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + '1)'
    },
    alpha: 0,  // 透明度
    //autoAlpha: 0  // 透明度が0になったとき、visivillity: hiddenを適用
  }
);

```




### 便利なキーワードや指定方法

スタイルの値を変化させるのに便利なキーワードや指定方法があります。


#### javascript

```

let $animItem = $('.js-anim');

TweenMax.to(
  $animItem,
  1,
  {
    xPercent: = 100,  // オブジェクト基準の比率で移動 widthの100%方向に移動する
    rotationX: '+=180'  // 現在の値と加算した値を渡す
  }
);

```





### アニメーションの挙動を制御するオプション

アニメーションの挙動を制御する詳細なオプションもここで渡しておくことができます。


#### javascript

```

let $animItem = $('.js-anim');

TweenMax.staggerFrom(
  $animItem,
  1,
  {
    repeat: -1,  // 無限リピート
    repeatDelay: 1,  // リピート間隔
    delay: .5,  // リピート開始時の遅延
    paused: true // アニメを停止状態にする
    yoyo: true  // 偶数回のアニメーションをリバース再生
  }
);

```





### アニメーションのイージング

アニメーションの変化の仕方を設定します。ジェネレーターが用意されているので、自分好みのイージングを簡単に作成できます。

* [GreenSock | Docs - HTML5 GSAP Easing](https://greensock.com/docs/#/HTML5/GSAP/Easing/)

用意されているものにもステップ進行やランダムなものやスローモーションになったような印象を与えるものなど、かなりおもしろいものがありますし、ゴリゴリにカスタマイズして記述することもできます。変化量を`Power`というキーワードでわかりやすく表現しているところが特長です。


#### javascript

```

let $animItem = $('.js-anim');

TweenMax.to(
  $animItem,
  1,
  {
    x: '+=100'
    ease: SlowMo.ease.config(0.4, 0.8, false)  // カスタムイージング
  }
);

```





### アニメーションの進行状況に合わせて実行するコールバック関数

アニメーションの進行状況に応じたコールバック関数をオプションとして渡します。コールバック関数の中では`this.target`にオブジェクトが格納されています。

```

let $animItem = $('.js-anim');

const finish = (a, b, obj) => {
  console.log(b + ' ' + a + ' ' + $(obj.target).css('transform'));
};

TweenMax.to(
  $animItem,
  1,
  {
    x: '+=100'
    onComplete: finish,  // 終了時のコールバック関数
    onCompleteParams:['ok', 'repeatAnim', '{self}']  // コールバック関数に渡す引数 {self}はthis
    onStart function() {
      console.log('start'); アニメーション開始時
    },
    onUpdate: function() {
      console.log('update'); // アニメーション実行中随時
    },
    onRepeat: function() {
      console.log('repeat'); // アニメーションリピート時
    },
    onReverse: function() {
      console.log('reverse'); // アニメーション反復時
    },
    onReverseComplete: function() {
      console.log('reverse finish'); // アニメーション反復終了時
    }
  }
);

```





### アニメーションをコントロールする

TweenMaxオブジェクトを作成して、状態をコントロールできるようにします。


#### javascript


```

let $animItem = $('.js-anim'),
    $play = $('#js-play-btn'),
    $pause = $('#js-pause-btn'),
    $restart = $('#js-restart-btn'),
    $reverse = $('#js-reverse-btn'),
    $timeScale = $('#js-timeScale-btn');

const anime = TweenMax.to($animItem, 1, { x: '+=100' });

$play.on('click', function(e) {
  anime.play(2);  // 指定した秒数からスタート (省略すると0から)
});

$pause.on('click', function(e) {
  anime.pause();  // 一時停止
});

$restart.on('click', function(e) {
  anime.restart();  // 再スタート
});

$reverse.on('click', function(e) {
  anime.reverse();  // 反復
});

$timeScale.on('click', function(e) {
  anime.timeScale(2);  // スピードの変更(乗算)
});


```


上記は再生や停止などだけをまとめていますが、他にもたくさんのメソッドが用意されています。
`

seek()
: 特定の時間にジャンプ

totalDuration()
: 反復を含むトゥイーンの時間を取得/設定





















