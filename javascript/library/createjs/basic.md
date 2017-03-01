# いろいろな形のシェイプをCreateJSで描画するまで -『CreateJS基礎』

CreateJSではステージに表示オブジェクトを追加することでコンテンツを作っていきます。

## シェイプを描画する

### Stageオブジェクトの作成

```

var stage = new createjs.Stage("ex-canvas");

```

### シェイプ(表示オブジェクト)の作成

```

var obj = new createjs.Shape();

```

### ステージにオブジェクトを配置

`addChild`でステージにオブジェクトを配置します。

```

stage.addChild(obj);

```

### 座標

`x`と`y`で原点からの距離をX軸とY軸に対して指定します。

```

obj.x = 100;
obj.y = 100;

```

### 角度

`rotation`で角度を単位なしの数値で指定します。

```

obj.rotation = 45;

```

### 透明度

`alpha`で透明度を指定します。
1が透明でない状態、0が完全に透明な状態です。

```

obj.alpha = 0.5;

```

### 表示非表示

`visible`をtrueで表示、falseで非表示の可視状態を指定できます。

```

obj.visible = false;

```

### スケール

`scaleX`、`scaleY`で大きさを相対的に変化させます。

```

obj.scaleX = 1.2; // 1.2倍の幅に
obj.scaleY = 0.5; // 半分の高さに

```

### 塗り

`beginFill()`で塗りの色を指定して、作成した図形の領域を塗ります。

```

obj.graphics.beginFill('#2299cc');

```

### 色の値

色の値は、「色の名前」「HEX(16進数)」「RGB」「HSL」で指定できます。

### 線

`setStrokeStyle()`で線の太さ、`beginStroke()`で線の色を指定します。
線は作成した図形の境界線の部分にあたります。

```

obj.graphics.setStrokeStyle(2);
obj.graphics.beginStroke('#2299cc');

```

## 円を描く

円は`drawCircle()`で簡単に描くことができます。
引数に(中心のX座標, 中心のY座標, 半径)を指定します。

```

shape.graphics.drawCircle(0, 0, 100);

```

### 円を描くまとめ


```

window.addEventListener("load", init);

function init() {
  // Stageオブジェクトを作成
  var stage = new createjs.Stage("exCanvas");
  // シェイプを作成
  var shape = new createjs.Shape();
  // 色
  shape.graphics.beginFill("#77bbee");
  // 線の色
  shape.graphics.beginStroke("#0055bb");
  // 線の幅
  shape.graphics.setStrokeStyle(6);
  //半径 50px の円を描画
  shape.graphics.drawCircle(0, 0, 50);
  // X座標 100px
  shape.x = 100;
  // Y座標 100px
  shape.y = 100;
  // 透明度
  shape.alpha = 0.65;
  // 表示リストに追加
  stage.addChild(shape);
  // Stage更新
  stage.update();
}

```

## 四角形を描く

四角形は`drawRect()`の引数に(X座標, Y座標, 横幅, 高さ)を指定します。

```

shape.graphics.drawRect(0, 0, 100, 100);

```

### 四角形を描くまとめ

```

window.addEventListener("load", init);

function init() {
  // Stageオブジェクトを作成
  var stage = new createjs.Stage("exCanvas");
  // シェイプを作成
  var shape = new createjs.Shape();
  // 色
  shape.graphics.beginFill("#77bbee");
  // 線の色
  shape.graphics.beginStroke("#0055bb");
  // 線の幅
  shape.graphics.setStrokeStyle(6);
  // 100pxの正方形を描画
  shape.graphics.drawRect(0, 0, 100, 100);
  // X座標 100px
  shape.x = 100;
  // Y座標 100px
  shape.y = 100;
  // 透明度
  shape.alpha = 0.65;
  // 表示リストに追加
  stage.addChild(shape);
  // Stage更新
  stage.update();
}

```

## 角丸四角形を描く

角丸四角形を描くには`drawRoundRect`の引数に(X座標, Y座標, 横幅, 高さ, 角丸の幅, 角丸の高さ)を指定します。

```

shape.graphics.drawRoundRect(0, 0, 50, 50, 5, 5);

```

## 多角形を描く

多角形を描くには`drawPolyStar`の引数に(x座標, y座標, 半径, 頂点数, 谷の深さ, 起点角)を指定します。
第5引数の谷の深さは0以上1未満の数値を記述し、デフォルト値の0だと谷はなくなり、正多角形になります。
第6引数は起点となる頂点からの角度で、デフォルト値0ではx軸の正方向を起点(3時の方向)に描かれます。

```

poly.graphics.drawPolyStar(0, 0, 75, 12, 0.1, -90);

```

### 多角形を描く

```

window.addEventListener("load", init04);

function init04() {
  // Stageオブジェクトを作成
  var stage = new createjs.Stage("exCanvas04");
  // シェイプを作成
  var shape = new createjs.Shape();
  // 色
  shape.graphics.beginFill("#77bbee");
  // 線の色
  shape.graphics.beginStroke("#0055bb");
  // 線の幅
  shape.graphics.setStrokeStyle(6);
  // バッジみたいな12角形
  shape.graphics.drawPolyStar(0, 0, 50, 12, 0.1, -90);
  // X座標 100px
  shape.x = 100;
  // Y座標 100px
  shape.y = 100;
  // 透明度
  shape.alpha = 0.65;
  // 表示リストに追加
  stage.addChild(shape);
  // Stage更新
  stage.update();
}

```

## 自由に図形を描く

`moveTo()`で現在の描画位置を移動します。
`lineTo()`では現在の描画位置から次の描画位置まで、現在の線のスタイルを使用して線を描画します。
`moveTo()`と`lineTo()`で、自由に頂点を指定して描くことができます。

```

shape.graphics.moveTo(0, 0);
shape.graphics.lineTo(0, 50);
shape.graphics.lineTo(50, 120);
shape.graphics.lineTo(50, 20);
shape.graphics.lineTo(0, 0);

```












おわります。