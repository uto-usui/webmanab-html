# 演算子

**演算子は、与えられた変数やリテラルに対して、あらかじめ用意された処理を行う**ための行うための記号です。演算子によって**処理される変数やリテラルをオペランド**と呼びます。










## 算術演算子

四則演算などのような、**数学でよく取り扱う演算を行ってくれるのが算術演算子**です。**代数演算子**とも呼びます。





### 加算演算子 +

加算演算子`+`は、オペランドのデータ型によって違います。オペランドの片方が文字列の場合は文字列連結演算子とみなされ、機能が変わってしまいます。


```

var test01 = 100+ 100; // 200
var test02 = '100' + 100 // 100100

```




### インクリメント演算子 ++ デクリメント演算子　--

インクリメント演算子`++`はオペランドに１を加え、デクリメント演算子`--`はオペランドから１を減算します。この　演算子の位置に注意します。オペランドの後に演算子がある場合(前置演算)は、変数に値を代入してから、変数をインクリメントします。オペランドの前に演算子がある場合(後置演算)は、変数に値を代入する前に、変数をインクリメントします。


```

var a = 0;
var b = 0;

a = num++ // 1
b = ++num // 0

```





#### 小数点を含む計算

JavaScriptでは内部的に数値を２進数で演算しているため、**小数点を含む計算で値が無循環小数となり誤差が出る**場合があります。小数点を含む演算をしたい場合は値を一旦整数にして、その結果を再度小数に戻す必要があります。

```

console.log(0.1 * 3); // 0.30000000000000004
console.log(0.1 * 10 * 3 / 10); // 0.3

```





## 代入演算子

**代入演算子は指定された変数に値を設定する**ための演算子です。算術演算子と合わさった機能を持つ**複合代入演算子は、変数に対する演算の結果をその変数に再代入する**ことができます。


=
: 変数などに値を代入する

+=
: 左辺の値に右辺の値を加算して代入

-=
: 左辺の値から右辺の値を減算して代入

*=
: 左辺の値に右辺の値を乗算して代入

/=
: 左辺の値を右辺で値を除算して代入

%=
: 左辺の値を右辺の値で除算してあまりを代入

&=
: 左辺の値を右辺の値で論理積演算して代入

|=
: 左辺の値を右辺の値で論理和演算して代入

^=
: 左辺の値を右辺の値で排他的論理和演算して代入


### 基本型と参照型のによる代入の性質の違い

基本型の場合、値は変数に直接格納されるので、それを別の変数にコピーした上でその値を変化させても影響は与えることはありません。参照型の場合は**値そのものではなく値を格納しているアドレス(場所)が格納される**ので、どちらかの値を変化させると同期するような挙動を見せます。

```
var x = 0;
var y = x;

x= 100; // y = 0

var listX = [1,2,3,4,5];
var listY = listX;

listX[4] = 100; listY = [1,2,3,4,100];

```

`listX`と`listY`はアドレスをコピーして**参照による代入**をしているので、同じ値を見ていることになります。`listX`を変更すると`listY`にも影響が及びます。


### 再代入できない定数のふるまい

定数は再代入することはできませんが、変更することはできます。

```

const YEAR = 2016;
YEAR = 2015; // error

const YEARS = [2015,2016];
YEARS = [2015,2016,2017] // error
YEARS[3] = 2017 // ok

```

参照型の場合は再代入はできませんが、元の配列はそのままで内容を書き換えることは可能です。


### 配列の分割代入 《ES2015》

**分割代入は、配列とオブジェクトを分解して、要素とプロパティ値をひとつひとつの変数に分解するための構文**です。元々の仕様では個々の要素にアクセスし変数に格納する必要がありましたが、分割代入では記述を簡潔にまとめることができます。

```

// 分割代入なし
// - - - - - - - -

var list = [10,20,30,40,50];

var item0 = list[0];
var item1 = list[1];
var item2 = list[2];
var item3 = list[3];
var item4 = list[4];

// 分割代入
// - - - - - - - -

let list = [10,20,30,40,50];
let [item0,item1,item2,item3,item4] = list;

```

代入先の変数を`[]`で配列のように囲って列挙して記述します。`...`演算子を使うと、個々の変数に割り当てられなかった残りの要素をまとめて配列として切り出すことが可能です。

```

let list = [10,20,30,40,50];
let [item0,item1,...other] = list;

alert(other); // [30,40,50]

```

分割代入を利用すると、変数の値を入れ替えることができます。

```

let x = 500;
let y = 1000;

[x,y] = [y,x];

```


### オブジェクトの分割代入 《ES2015》

配列で行った分割代入のように、オブジェクトのプロパティを変数に分解することもできます。

オブジェクトの場合は名前で個々の変数に分解します。変数の並び順はプロパティの定義順と違っていても、分解しないプロパティがあってもokで、対応するプロパティがない場合は無視されます。無視された場合のデフォルト値を左辺で指定することができます。

```

let nami = {
  name: 'Nami',
  age: 20,
  weapon: 'magic tact'
}
let {age, name, dream = 'making world map'} = nami;


```

`dream`にはプロパティが存在しなかったので、デフォルト値がセットされています。

入れ子になったオブジェクトは、オブジェクトとして変数に格納することも、`obj: {key}`という形で値を抽出することも可能です。

```

let nami = {
  name: 'Nami',
  age: 20,
  hair: {
    length: 'long',
    color: 'orange'
  }
}

let {hair, hair:{color}} = nami;

console.log(color); // orange

```


`key: newKey`と記述すると元のプロパティと異なる名前の変数に値を割り当てることが可能です。

```

let nami = {
  name: 'Nami',
  age: 20,
  weapon: 'magic tact'
}

let {age: namiAge, name: namiName} = nami;

console.log(namiName); // Nami


```





## 比較演算子

左辺と右辺の値を比較してその結果を真偽値`true``false`で返します。条件分岐やループ終了の処理の際に利用するのが一般的です。

==
: 等しい場合に`true`を返す

!=
: 等しくない場合に`true`を返す

===
: 値とデータ型が等しい場合に`true`を返す

!==
: 値かデータ型が等しくない場合に`true`を返す

<
: 右辺の方が小さい場合に`true`を返す

\>
: 右辺の方が大きい場合に`true`を返す

<=
: 左辺が右辺以下の場合に`true`を返す

\>=
: 左辺が右辺以上の場合に`true`を返す


### 等価演算子

等価演算子`==`は値が等しい場合に`true`を返しますが、オペランドのデータ型によって比較する基準が異なり、比較する**データ型が違っているとデータ型を変換して等しいと見なせないか努力するような挙動**を見せます。

文字列／数値／論理型
: 文字列／論理型は数値に変換されて判定される

オブジェクト
: 基本型に変換して判定


### 同値演算子

同値演算子` ===`はデータ型を変換せず、等しいかどうかを判定します。`==`ではデータ型を変換して判定してしまうので、実際の開発ではこちらの比較で処理していくことがのぞましいとされることが多いです。


### 条件演算子

条件演算子 `? :`は指定された条件式の真偽に応じて、対応する値を出力したい場合に使います。if文でも同じことができますが、シンプルな処理の時など、コードを簡潔に済ませたい時に重宝します。

```

var num = 9;
var test = (num > 5) ?  'OK' : 'NG'

```


### 論理演算子

複数の条件式や論理値を結合し、その結果を`true`／`false`として返します。比較演算子と組み合わせて利用して複雑な条件式を実現します。

&& (論理積演算子)
: 左右の式がともに`true`なら`true` (and)

|| (論理和演算子)
: 左右の式のどちらかが`true`なら`true` (or)

!
: 式が`false`のば場合`true`を返す (not)

####  falsyな値

JavaScriptでは暗黙的に`false`とみなされている値、**falsyな値**があります。論理演算子のオペランドが、常に論理型の`true`／`false`である必要はないということです。

* 空の文字列 `''`
* 数値の0
* NaN
* undefined
* null

#### ショートカット演算

論理積／論理和演算子を利用する場合、**左式だけが評価されて、右式が評価されない**パターンがあります。

`&&`の場合、左式が`false`と評価された段階で、条件式全体が`false`となるので、右式は実行されません。このことから、**論理演算子の先頭以外で、関数呼び出し・インクリメント・デクリメント・代入演算子などの値を操作するような式を含めない**、というのが一般的な認識です。





## その他の演算子

### delete演算子

`delete`演算子は、オペランドに指定した変数や配列、オブジェクトのプロパティを破棄します。削除できた場合には`true`、できなかった場合に`false`を
返します。

特徴としては

* 配列の要素を削除すると、該当の要素が削除されるだけで、他の要素に影響を与えず、順番はかわらない
* 明示的に宣言された変数を削除することはできない
* 組み込みオブジェクトのね家には、削除できないものがある


### typeof演算子

`typeof`演算子はオペランドに指定した変数やリテラルのデータ型を表す文字列を(`number`/`string`/`boolean`/`object`)として返します。配列とオブジェクトは同じ`object`と返されます。。どんな`object`か知りたい場合は`instanceof`演算子などを使います。


### 演算子の優先順位／結合則

複数の演算子が式にふくまれている場合、どのような順序で処理するかを決めるのが、優先順位と結合則です。

#### 優先順位

JavaScriptの演算子は優先順位を持っていて、優先順位の高い順に演算が実行されます。優先順位の高い順に記述します。

* `[]` `()`
* `++` `--` `~` `!`
* `*` `/` `%`
* `+` `-`
* `<<` `>>` `<<<`
* `==` `===` `!=` `!==`
* `&`
* `^`
* `|`
* `&&`
* `||`
* `?:`
* `=` `+=` `-=`
* `.`

この優先順位はかなり複雑なので、複雑な演算をするときは細かく`()`を使って区切ることで、わかりやすく演算の順序を指定することができます。

```

var x = ((2 * 3) + (5 * 2)) / 2

```

#### 結合則

結合則は、結合の方向を決めるルールです。

左から右
: `+` `-` ` *` `/`  `%`　`<` `<=` `>` `>=` `==` `===` `!=` `!==`　`&&` `||`　`<<` `>>` `>>>` `&` `^` `|`　`.` `[]` `()` `,` `instanseof` `in`

右から左
: `++` `--`　`=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `|=`　`!`　`~`　`?:`　`delete` `typeof` `void`






































