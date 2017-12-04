
# 《CSS》デザイナーでも簡単便利、Gridの神な実践機能を少しだけ伝えたい。

Gridは実は簡単というはなし。

[CSS grid starter kit - JSFiddle](https://jsfiddle.net/yutousui/398mmt4o/)


## はじめに

CSS Grid Layoutはレイアウトをとても簡単にしてくれます。
ただ、機能が豊富だったり考え方が少し複雑なところもあるので、[このような素敵な記事](https://qiita.com/kura07/items/e633b35e33e43240d363)もあるんですが、ちょっと億劫だったりするデザイナーさんもいるかもしれません。

なので、今回は簡単で実用的なコピペコードとデモを通じて、Gridの素晴らしさを伝えたいと思います🍟

[image:735D815F-3F4C-4481-A06B-E11E38507AC3-17967-00004898B7E4718B/ss_pad.jpg]

これを作ってみます。

デモはこれです。=> [CSS grid starter kit - JSFiddle](https://jsfiddle.net/yutousui/398mmt4o/)
もしかしたらこれを触ってみるだけで大体理解できるかもしれません。


## 明示的に名前をつけてグリッドを作れる

Gridの素敵で分かりやすいポイントのひとつとしてあげておきたいのがこれです。

一般的なレイアウトのHTMLを用意します。

```

<div class="wrap">
  <header class="header">Header</header>
  <sidebar class="sidebar">Sidebar</sidebar>
  <main class="main">Main</main>
  <footer class="footer">Footer</footer>
</div>

```

### グリッドコンテナの作成

`wrap` がそれぞれの親(グリッドコンテナ)に当たりますが、これに Grid の指定を記述していきます。 
ここで行うことは、

* グリッドの間隔
* グリッドエリアの高さ (row)
* グリッドエリアの幅 (colum)
* グリッドを分割(エリアを作る)

**グリッドを分割してコンテンツを配置するエリアを作り、そこに名前をつける、**というところが重要なポイントです。

```

.wrap {
  display: grid;
  grid-gap: 5px; // 間隔
  grid-template-columns: repeat(12, 1fr); // repeat(すべてのグリッド(grid-template-areasで12分割するから12), 利用可能な空間の割合) => 各グリッドを等幅に
  grid-template-rows: 10vh 70vh calc(20vh - 5px * 2); // row(行)の高さ => 画面に収まるように高さを調整
  grid-template-areas:
    "h h h h h h h h h h h h"
    "s s m m m m m m m m m m"
    "f f f f f f f f f f f f";
}

```

なん不思議な記述がありますよね！`grid-template-area` で必要なグリッドの数だけ、エリアの名前を明示します。列(column)ごとに`" "`で区切って視覚的に分かりやすく記述できるのが素敵ですよね。

`grid-template-columns` にある記述はちょっとややこしいので、[グリッドレイアウトの基本的な概念 - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout) を見てみると、`fr` の単位や、 `repeat()` 関数について理解が深まると思います。

### グリッドアイテムへの指定

グリッドコンテナ直下の子要素はすべてグリッドアイテム要素に変わります。
 `header` などのコンテンツに、表示したいエリアの名前を割り当てます。

```

.header {
  grid-area: h; // グリッドエリアの名前を割り当てる
}

.sidebar {
  grid-area: s;
}

.main {
  grid-area: m;
}

.footer {
  grid-area: f;
}

```

するとこのレイアウトの完成です！

[image:A688562C-0FFB-46E2-A373-BA35F01A71B7-17967-00004A85A67CA117/ss_pad.jpg]

#### 列(column) をまたがる指定
縦の列をまたがるようにレイアウトを指定するのも、視覚的に分かりやすく記述できるので簡単です。
例えばsidebarをHeaderに食い込ませてみます。

```
// さっきの記述は省略してます
grid-template-areas:
    "s s h h h h h h h h h h"
    "s s m m m m m m m m m m"
    "f f f f f f f f f f f f";

```

[image:823129BD-40F5-496F-AC61-70C422515BBE-17967-00004B153CC73853/ss_pad2.jpg]

### 実践的で柔軟なレスポンシブ化

レスポンシブなレイアウトを実現するように追記していきます。

```

.wrap {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 10vh 70vh calc(20vh - 5px * 2);
  grid-template-areas:
    "s s s s s s h h h h h h"
    "m m m m m m m m m m m m"
    "f f f f f f f f f f f f";

  @media screen and (min-width: 768px) {
    grid-template-areas:
      "h h h h h h h h h h h h"
      "s s m m m m m m m m m m"
      "f f f f f f f f f f f f";
  }

  @media screen and (min-width: 980px) {
    grid-template-areas:
      "h h h h h h h h h h h h"
      ". s m m m m m m m m m ."  // 関係ない文字列でスペースを表現する
      "f f f f f f f f f f f f";
  }
}


```

[image:F6A010AD-3561-4D87-A043-681A42AEC005-17967-00004AA1563F5F68/ss_sp.jpg]

[image:8174D3C1-0FA3-4898-A6C0-048FB55D859C-17967-00004AA394EB690B/ss_pad.jpg]

[image:AF3418E5-70D3-4DD2-A221-E2775399996E-17967-00004AA47AEA089D/ss_pc.jpg]

というようなレスポンシブなレイアウトを簡単に実装できました。


## おわり、そしてGridのはじまり

とりあえず簡単な深い知識がなくても実現できる、実践的なレイアウトのCSS Gridの説明でした。

もっとGridでできることは奥が深く多岐にわたるので、これで、「なんか便利そう！」と思った方は、

* [CSS Grid Layout を極める！（基礎編） - Qiita](https://qiita.com/kura07/items/e633b35e33e43240d363)
* [CSS Grid Layout を極める！（場面別編） - Qiita](https://qiita.com/kura07/items/486c19045aab8090d6d9)
* [CSS グリッドレイアウト - CSS | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)

とかを読んで、ともにGridの世界の理解を深めましょう！😇

CSS Grid はピクセルパーフェクトなデザインには少し向かないかもしれませんが、簡単なプロトタイプを組むときや、柔軟さが求められるダッシュボードや、インタラクティブなコンテンツを作る際に有用そうな印象を持っています。

また何か新しい知見や、おもしろいことを見つけたら投稿したいと思います。




おわります。

