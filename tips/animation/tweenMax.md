# TweenMaxをつかう

TweenMaxは、GreenSock社が開発したDOMアニメーションに特化したJavaScriptライブラリです。requestAnimationFrameを使用していて動作が高速なのが特徴でwebGLを動かすのにも有用です。


#### cdn

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
```



* [GreenSock-Cheatsheet](https://ihatetomatoes.net/wp-content/uploads/2016/07/GreenSock-Cheatsheet-4.pdf)



## TweenMaxの基本的な使い方

記述は簡単で覚えやすいです。基本のアニメーションの設定は以下のように記述します。


#### javascript

```

TweenMax.method(element, time, { prop: value });
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
TweenMax.to(_anim, .5, { x: 200 });

```



### アニメーションの継続させる時間

アニメーション継続時間(duration)は秒指定します。ミリ秒でないところが少し注意です。





### アニメーションの詳細を設定するプロパティ

スタイルに関してはCSSのプロパティ名と少し異なる名前が付いているプロパティもありますが、直感的にわかりやすい名前に変更されているのですぐ理解できます。

アニメーションの挙動を制御するオプションもここで渡しておくことができます。

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
    alpha: 0,  // 透明度
    //autoAlpha: 0,  // 透明度が0になったとき、visivillity: hiddenを適用
    ease: SlowMo.ease.config(0.4, 0.8, false),  // カスタムイージング
    repeat: -1,  // 無限リピート
    repeatDelay: 1,  // リピート間隔
    yoyo: true  // 偶数回のアニメーションをリバース再生
    onComplete: finish,  // 終了時のコールバック関数
    onCompleteParams:['ok', 'repeatAnim']  // コールバック関数に渡す引数
  },
  .2  // 配列の次の要素のアニメーションの遅延時間
);

```

スタイルの値を変化させるのに便利なキーワードや指定方法があります。


#### javascript

```

let $animItem = $('.js-anim');

TweenMax.to(
  $animItem,
  1,
  {
    xPercent: = 100,  // オブジェクト基準の比率で移動
    rotationX: '+=180'  //
  }
);

```





### アニメーションのコントロール


































