# かわいく、かっこよく。素敵なアニメーションを実装するためのライブラリのまとめ -『animation』

単純なアニメーションならCSSの`@keyframes`で実装できますが、複雑なアニメーションやサクッといいものを描くときにはアニメーションライブラリを使うと、くわしい知識や経験がなくても簡単に実装できます。また、アニメーションを実装する際の勉強や研究にもなるので、目を通しておきたいライブラリをまとめます。






## アニメーションを実装するためのライブラリまとめ (CSS)





### Tuesday

0.3秒くらいの短時間で終了するように作られた要素の表示／非表示に使える、シンプルなCSSアニメーションライブラリ。用意された`class`を付与するだけで簡単にアニメーションが実装できます。

* [Tuesday](http://shakrmedia.github.io/tuesday/)
* [Tuesday github](https://github.com/ShakrMedia/tuesday)

```
<div class="animated tdDropInLeft">animate_</div>
```

ソースはLessで記述されています。




### csshake

ガクガクブルブル震わせるCSSライブラリ。派手楽しいですが、とてもおしゃれ。用意されている`class`を付与します。SCSSで記述されていて、カスタマイズ用の`mixin`が用意されています。

* [csshake](http://elrumordelaluz.github.io/csshake/)
* [csshake github](https://github.com/elrumordelaluz/csshake/)

```

.my-shake {
  @include do-shake('my-shake', 40, 40, 20, 100ms); // name x y r time
}

```



### animate.css

`class`属性を付与して様々なアニメーションを実装します。有名で人気のあるCSSアニメーションライブラリ。

* [animate.css](https://daneden.github.io/animate.css/)
* [animate.css github](https://github.com/daneden/animate.css)

```
<div class="animated infinite bounce">animation_</div>
```

SCSSでMixinが用意されている「animate.scss」もあります。実務でカスタマイズの必要があるときはこっちを利用する方が、必要なものだけを必要な値で呼び出すことができるので自由度が高く便利です。

* [animate.scss](https://github.com/geoffgraham/animate.scss)






### voxel.css

JavaScriptで四角い立方体を並べて、3D空間をCSSのプロパティで実現するライブラリ。光源の概念があるのがすごい。マウスイベントが簡単に実装できて箱の増減や回転のインタラクションをつけることができる。

* [voxel.css](http://www.voxelcss.com/)
* [voxel.css demo](http://voxelcss.com/demo)

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

スクロールをトリガーに発生するアニメーション。`data-*`属性を使ってパラメータを渡します。豊富なイージングが用意されています。どれくらい可視範囲に入ってきてからどれくらいの時間で、というように細かい内容を直感的に記述できるところが魅力です。

* [aos](http://michalsnik.github.io/aos/)
* [aos github](https://github.com/michalsnik/aos)

#### html

```
<div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-delay="100" data-aos-easing="ease-in-sine" data-aos-duration="600" data-aos-anchor=".selector">
```

`data-aos-anchor`に値を渡すと、自分ではない他の要素をトリガーにアニメーションを発生させることができます。

初期値の設定は`init()`にオプションで値を渡します。レスポンシブデザインで、モバイル端末で指定を解除したいときは、`disable`に`ture`を渡すように式を記述します。

####  javascript

```

AOS.init({
  offset: 200,
  duration: 600,
  easing: 'ease-in-sine',
  delay: 100,
  disable: $(window).height() < 980
});

```





### animatable

CSSプロパティ別に実装した例のまとめ。

* [animatable](http://leaverou.github.io/animatable/)


### cssanimate

キーフレームをタイムラインで調整しながら、プロパティの値を確認します。

* [cssanimate](http://cssanimate.com/)


### motion UI

* [motion-ui](http://zurb.com/playground/motion-ui)


### Magic Animations CSS3

* [magic_animations](https://www.minimamente.com/example/magic_animations/)


### bouncejs

少し激しめなトリッキーな動き。

* [bouncejs](http://bouncejs.com/)


### animsition

* [animsition](http://git.blivesta.com/animsition/)


### Morf.js

細かいイージングを探索できます。

* [Morf.js](http://www.joelambert.co.uk/morf/)

### anime-js

* [anime.js](http://anime-js.com/)
    関数で値をもたせてあげることができるので、ランダム値の生成に便利です。`svg`のアニメーションやオブジェクトの値をアニメーションさせたり変化させることもできます。

#### demo

* [ItemRevealer](http://tympanus.net/Development/ItemRevealer/)
* [LetterEffects](http://tympanus.net/Development/LetterEffects/)


### tweenmax

Googleが推奨する最強のアニメーションライブラリ。

* [tweenmax](https://greensock.com/tweenmax)


### velocityjs

* [velocityjs](http://velocityjs.org/)


### turnbox.js

あらゆるものを箱型にするスクリプト。

* [turnbox](http://noht.co.jp/turnbox)





## svgアニメーション


### DrawSVG

* [jquery-drawsvg](http://leocs.me/jquery-drawsvg/)


### Lazy Line Painter

* [lazylinepainter](http://lazylinepainter.info/)


### vivus

* [vivus](https://maxwellito.github.io/vivus/)


### Walkway

* [walkway](https://connoratherton.com/walkway)


### waitanimate

* [CSSのkeyframesアニメーションで待機時間を指定したものを吐き出す WAIT! Animate](https://webmanab-html.com/tip/wait-animate/)


### mo.js

* [mo.js](http://mojs.io/)




## 素敵すぎるチュートリアル

* [BlockRevealers](https://tympanus.net/Development/BlockRevealers/)
* [MirrorEffect](https://tympanus.net/Development/MirrorEffect/)
* [ElasticCircleSlideshow](https://tympanus.net/Development/ElasticCircleSlideshow/)
* [Bubble Layout](http://codepen.io/sol0mka/pen/yNOage)














おわります。
