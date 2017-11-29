# p5.jsでcanvasを任意の場所に配置する方法

p5.jsが出力する `canvas` は `</body>` のすぐ上に配置されるようになっています。このままだと取り回しがしにくいので、任意の場所に移動させます。

## HTMLに要素をつくる
html に `canvas` の親要素とするラッパーを任意の `id` を割り当てて記述します。

#### HTML

```

<div id="canvas"></div>

```


## setup() 関数で挿入箇所を指定
p5.jsの `setup()`  関数の中で、生成される `canvas` の親要素を変更します。

#### JavaScript

```

let canvas = createCanvas(300, 300);
canvas.parent('canvas');

```

`createCanvas()` の返り値のオブジェクトを格納して、 `parent()` メソッドを実行することで、 `canvas`を指定した `id` を親要素として挿入することが出来きました。


#web/coding/javascript/p5js/
