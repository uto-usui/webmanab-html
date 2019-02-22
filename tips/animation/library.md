# かわいく、かっこよく。素敵なアニメーションを実装するためのライブラリのまとめ -『animation』

単純なアニメーションなら CSS の`@keyframes`や`transition`で実装できますが、複雑なアニメーションやサクッといいものを描くときにはアニメーションライブラリを使うと、くわしい知識や経験がなくても簡単に実装できたり、複雑なアニメーションを構築できます。また、アニメーションを実装する際の勉強や研究にもなるので、目を通しておきたいライブラリをまとめます。

## アニメーションを実装するためのライブラリまとめ (CSS)

### Motion CSS

ひととおりのの UI に必要なアニメーションを網羅したライブラリ。簡単に扱えて、共通のクラスと任意のアニメーションのクラスをつけると動作します。後発

- [motion CSS](http://pavlyukpetr.com/awesome/documentation.html)
- [motion-css github](https://github.com/pavlyukpetr/motion-css)

特徴としては、delay 用のクラスや無限ループ用のクラスが用意されているので、簡易的に順次アニメーションを実行したりすることもできます。

```html
<div class="animation fade-in-left">anim_</div>
<div class="animation fade-in-left delay-1-5s">anim_delay</div>
```

サイトには、jQuery で記述した、可視範囲に入ったらアニメーションを実行するスクリプトが用意されているので、それを使うとスクロールに連動したアニメーションを実行できます。

### Tuesday

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/tuesday.png" alt="tuesday">

0.3 秒くらいの短時間で終了するように作られた要素の表示／非表示に使える、シンプルな CSS アニメーションライブラリ。用意された`class`属性を付与するだけで簡単にアニメーションが実装できます。ソースは Less で記述されています。

- [Tuesday](http://shakrmedia.github.io/tuesday/)
- [Tuesday github](https://github.com/ShakrMedia/tuesday)

```html
<div class="animated tdDropInLeft">animate_</div>
```

### csshake

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/csshake.png" alt="csshake">

ガクガクブルブル震わせる CSS ライブラリ。派手楽しいですが、とてもおしゃれ。用意されている`class`属性を付与します。SCSS で記述されていて、カスタマイズ用の`mixin`が用意されています。

- [csshake](http://elrumordelaluz.github.io/csshake/)
- [csshake github](https://github.com/elrumordelaluz/csshake/)

```

.my-shake {
  @include do-shake('my-shake', 40, 40, 20, 100ms); // name x y r time
}

```

### animate.css

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/animate-css.png" alt="animate-css">

`class`属性を付与してさまざまなアニメーションを実装します。とても有名で人気のある CSS アニメーションライブラリ。

- [animate.css](https://daneden.github.io/animate.css/)
- [animate.css github](https://github.com/daneden/animate.css)

```
<div class="animated infinite bounce">animation_</div>
```

SCSS で Mixin が用意されている「animate.scss」もあります。実務でカスタマイズの必要があるときはこっちを利用すると、必要なアニメーションだけを必要なオプションを与えて呼び出すことができるので自由度が高く便利です。

- [animate.scss](https://github.com/geoffgraham/animax1te.scss)

### animatable

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/animatable.png" alt="animatable">

CSS のプロパティ別にアニメーションを実装した例のまとめ。オブジェクトをクリックするとプロパティを変化させている値の幅を見ることができます。

- [animatable](http://leaverou.github.io/animatable/)

### motion UI

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/zurb-playground-motion.png" alt="zurb-playground-motion">

豊富なアニメーションが Sass で用意されています。Mixin でいろいろな拡張ができるようになっていて、もともと用意されているアニメーションをミックスしたり、アニメーションに順序を与えることが簡単にできます。JavaScript で制御することができるようになっています。ドキュメントはちょっと難しめ。

- [motion-ui](http://zurb.com/playground/motion-ui)
- [motion-ui github](https://github.com/zurb/motion-ui)

### Magic Animations CSS3

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/magic_animations.png" alt="magic_animations">

クラスを付与することで、可愛い動きを実装できます。ユーザーがクリックした時など、UI のアクションに向いています。

- [magic_animations](https://www.minimamente.com/example/magic_animations/)
- [magic_animations github](https://github.com/miniMAC/magic)

`class`名もなんだかかわいいです。

#### javascript

```

$('.animate').on('click', function() {
  $(this).addClass('magictime puffIn');
});

```

#### html

```
<div class="animte">animate_</div>
```

## アニメーションを実装するためのライブラリまとめ 《JavaScript》

### bouncejs

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/bouncejs.png" alt="bouncejs">

少し激しめでトリッキーな動きが用意されています。デモページではプリセットされたアニメーションを直感的にエディット／プレビューしてカスタマイズできます。CSS のコードがエクスポートできるようになっていて、出力された`transform: matrix3d()`を利用した `@keyframes`アニメーションをコピペできます。

そのコードを生成しているライブラリ本体を利用することも可能で、使いやすいです。

- [bouncejs](http://bouncejs.com/)
- [bounce.js github](https://github.com/tictail/bounce.js)

#### javascript

```

var bounce = new Bounce();
bounce
  .translate({
    from: { x: -300, y: 0 },
    to: { x: 0, y: 0 },
    duration: 600,
    stiffness: 4
  })
  .scale({
    from: { x: 1, y: 1 },
    to: { x: 0.1, y: 2.3 },
    easing: "sway",
    duration: 800,
    delay: 65,
    stiffness: 2
  })
  .scale({
    from: { x: 1, y: 1},
    to: { x: 5, y: 1 },
    easing: "sway",
    duration: 300,
    delay: 30,
  })
  .applyTo(document.querySelectorAll('.anim_'));

```

### voxel.css

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/voxelcss.png" alt="voxelcss">

JavaScript で四角い立方体を並べて、3D 空間を CSS のプロパティで実現するライブラリ。光源の概念があるのすごい。マウスイベントが簡単に実装できて箱の増減や回転のインタラクションをつけることができる。

- [voxel.css](http://www.voxelcss.com/)
- [voxel.css demo](http://voxelcss.com/demo)

```

const init = (element) => {
  let PI          = Math.PI,
  scene       = new voxelcss.Scene(),
  lightSource = new voxelcss.LightSource(300, 300, 300, 750, 0.3, 1),
  world       = new voxelcss.World(scene),
  editor      = new voxelcss.Editor(world);

  scene.rotate(-PI / 8, PI / 4, 0);
  scene.attach(element);
  scene.addLightSource(lightSource);

  editor.add(new voxelcss.Voxel(0, 0, 0, 100, {
    mesh: voxelcss.Meshes.grass
  }));

}

init(document.body);

```

### aos

![aos](https://wp.webmanab-html.com/wp-content/uploads/2017/01/aos.jpg)

スクロールをトリガーに発生するアニメーション。`data-*`属性を使ってパラメータを渡します。豊富なイージングが用意されています。どれくらい可視範囲に入ってきてからどれくらいの時間で、というように細かい内容を直感的に記述できるところが魅力です。

- [aos](http://michalsnik.github.io/aos/)
- [aos github](https://github.com/michalsnik/aos)

```html
<div
  data-aos="fade-zoom-in"
  data-aos-offset="200"
  data-aos-delay="100"
  data-aos-easing="ease-in-sine"
  data-aos-duration="600"
  data-aos-anchor=".selector"
></div>
```

`data-aos-anchor`に値を渡すと、自分ではない他の要素をトリガーにアニメーションを発生させることができます。

初期値の設定は`init()`にオプションで値を渡します。レスポンシブデザインで、モバイル端末で指定を解除したいときは、`disable`に`true`を渡すように式を記述します。

#### javascript

```

AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
  disable: $(window).height() < 980
});

```

### animsition

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/animsition.png" alt="animsition">

画面遷移にアニメーションを与えることができます。オプションやコールバックが豊富なので、画面遷移をなめらかに表現して体感速度を高めたり、リッチな表現に向いています。

- [animsition](http://git.blivesta.com/animsition/)
- [animsition github](https://github.com/blivesta/animsition)

### Morf.js

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/joelambert.png" alt="joelambert">

豊富に用意されたイージングを探索できます。

- [Morf.js](http://www.joelambert.co.uk/morf/)

#### javascript

```

var elem = document.getElementById('elem');

var trans = Morf.transition(elem, {
  '-webkit-transform': 'translate3d(300px, 0, 0) rotate(90deg)',
  'background-color': '#FF0000'
}, {
  duration: '1500ms',
  timingFunction: 'bounce',
  callback: function (elem) {
    // some func
  }
});

```

### tweenmax

Google が推奨する最強のモーションを作るためのトゥイーンライブラリ。

- [tweenmax](https://greensock.com/tweenmax)

他のライブラリに比べて、実行速度が速く、パフォーマンスに優れています。多くのオブジェクトを動かしたいとき、webGL の重い動作を実装したいときなどに真価を発揮します。モジュールを分解して読み込むことが可能なので、小分けにすると容量を軽くすることもできます。

- [HTML5 Animation Speed Test](https://greensock.com/js/speed.html)

記述においては、CSS の`transform`プロパティにアクセスしやすいところが素敵です。

#### javascript

```

TweenMax.to('.animate_', // セレクタ
  1.0, // 時間
  {
    x: 100,
    repeat: -1,
    ease: Cubic.easeOut
  }
);

```

#### 参考

- [TweenMax の使い方メモ](http://qiita.com/ANTON072/items/a1302f4761bf0ffcf525)

### anime.js

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/anime-js.png" alt="anime-js">

「anime.js」にはランダム関数が用意されていたり、`svg`のパス上でのアニメーションや、オブジェクトの値を変化させることもできる表現力の高いライブラリ。オプションやイベントが豊富で、人気があります。

TweenMax よりはパフォーマンスが劣るので、重い webGL の処理などは得意ではありません。小さなアニメーションやインタラクションに実装します。

- [anime.js](http://anime-js.com/)
- [anime.js github](https://github.com/juliangarnier/anime)

`elasticity`というはずみ具合をコントロールできるおもしろいパラメータがあります。

#### javascript

```

anime({
  targets: '.amimation_', // セレクタ
  translateX: '5rem', // 現在地基準に移動
  scale: [.75, .9], // .75から.9へ変化
  delay: function(el, index) { // function(el, i){...}で複数の要素に処理
    return index * 80;
  },
  direction: 'alternate',
  loop: true,
  elasticity: 800
});

```

#### demo

- [ItemRevealer](http://tympanus.net/Development/ItemRevealer/)
- [LetterEffects](http://tympanus.net/Development/LetterEffects/)

#### 参考

- [軽量・簡単なのにいきいきしたアニメーションが付けられる！anime.js を触ってみた](https://liginc.co.jp/302886)
- [CSS ライクでデザイナーに優しい！anime.js は DOM アニメーションの新定番だ！](https://www.webprofessional.jp/animating-the-dom-with-anime-js/)
- [アニメーションライブラリ決定版か!?anime.js で軽量・軽快に実装！](http://qiita.com/kyota/items/c46f44340a384e059a5e)

### velocity.js

jQuery 版と JavaSCript 版が用意されています。javascript の`requestAnimationFrame`を利用してアニメーションを実行します。jQuery の`animate()`関数の煩雑になりがちなところを、同じような記述で補完するような使い方ができます。

- [velocityjs](http://velocityjs.org/)
- [velocityjs github](https://github.com/julianshapiro/velocity)

#### javascript

```

var element = document.querySelector('.animate_');

Velocity(element,
  {
    translateX: 1000,
    width: 200,
  }, {
    easing: 'easeInSine',
    duration: 1000,
    loop: true
  }
);

```

#### 参考

- [Velocity.js よみほぐし](http://qiita.com/mag4n/items/90f2897351f236a1067b)

### turnbox.js

あらゆるものを箱型にするスクリプト。

- [turnbox](http://noht.co.jp/turnbox)

### t-scroll

スクロールをトリガーにして、Animation.css に影響を受けたアニメーションを実行します。
オプションが豊富なので扱いやすい印象です。

- [t-scroll](http://t-scroll.com/)

## アニメーションを作成するためのツール

### cssanimate

<img src="https://webmanab-html.com/wp-content/uploads/2017/01/cssanimate.png" alt="cssanimate">

キーフレームをタイムラインで調整しながら、オブジェクトをドラッグや変形させたりして、プロパティの値を直感的に触りながらプレビューできます。

- [cssanimate](http://cssanimate.com/)

### waitanimate

CSS の`@keyframes`を待機時間を含めたコードを吐き出すジェネレーターです。プリセットに素敵なアニメーションが実装されています。用意された`mixin`を利用してオリジナルのアニメーションを作成するのも簡単です。

以前に紹介してました。

- [CSS の keyframes アニメーションで待機時間を指定したものを吐き出す WAIT! Animate](https://webmanab-html.com/tip/wait-animate/)

## svg アニメーション

### DrawSVG

- [jquery-drawsvg](http://leocs.me/jquery-drawsvg/)

### Lazy Line Painter

- [lazylinepainter](http://lazylinepainter.info/)

### vivus

- [vivus](https://maxwellito.github.io/vivus/)

### Walkway

- [walkway](https://connoratherton.com/walkway)

### mo.js

- [mo.js](http://mojs.io/)

## 素敵すぎるチュートリアル

- [BlockRevealers](https://tympanus.net/Development/BlockRevealers/)
- [MirrorEffect](https://tympanus.net/Development/MirrorEffect/)
- [ElasticCircleSlideshow](https://tympanus.net/Development/ElasticCircleSlideshow/)
- [Bubble Layout](http://codepen.io/sol0mka/pen/yNOage)

おわります。
