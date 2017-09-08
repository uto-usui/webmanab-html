# CSSだけでアンカースクロールを実装する方法

Chrome61がリリースされ、CSSの `scroll-behavior` プロパティを利用すると、JavaScriptなしのピュアCSSでアンカースクロールが実装できるようになりました。





## scroll-behavior

スクロールするボックスを作って、 `scroll-behavior` に `smooth` を与えると、アンカースクロールをクリック時にスムーススクロールします。

```

.wrap {
  height: 100vh;
  overflow: scroll;
  scroll-behavior: smooth;
}


```

* [demo](https://jsfiddle.net/yutousui/xj19zwLn/)

<iframe width="100%" height="450" src="//jsfiddle.net/yutousui/xj19zwLn/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>





## 対応状況

* Chroee 61+
* Firefox 36+





## 参考

* [Smooth Scrolling: The scroll-behavior Property](https://drafts.csswg.org/cssom-view/#smooth-scrolling)
* [scroll-behavior - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/scroll-behavior)





おわります。