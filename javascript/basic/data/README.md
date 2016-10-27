# データ型


## データ型


データ型とは、データの種類のことです。  
文字列・数値、論理値など様々なデータ型を意識することなく扱うことができます。ただし厳密な塩酸や比較を行う際はデータ型を念頭において処理を行います。







### JacaScriptのデータ型

JavaScriptのデータ型は大きく分けて２つの分類に分けることができます。この２つの違いは値を変数に格納する方法です。



#### 基本形

値そのものが直接格納されているものが基本形の変数です。

* 数値型
* 文字列型
* シンボル型 《ES2015》
* 特殊型 (値が空、未定義)



#### 参照型

参照型の変数は、その値を実際に格納しているメモリ上のアドレスを格納します。

* 配列
* オブジェクト
* 関数







## リテラル

**リテラル**は、データ型に格納できる値そのもの、また、値の表現方法のことです。



### 数値リテラル / number

数値リテラルは、整数リテラルと浮動小数点リテラルに分類します。


#### 整数リテラル

10進数リテラル
: 1, 40

16進数リテラル
: 0xffffff

8進数リテラル
: 0o002

2進数リテラル
: 0b11

リテラルの接頭語大文字でも記述可能ですが0との区別がつきにくいので小文字での表記が慣例とされています。


#### 浮動小数点リテラル

浮動小数点リテラルは、小数点数と指数表現で記述できます。`13e5`は13の5乗、`13e-5`は13の5べき乗を表します。




### 文字列リテラル

文字列リテラルはシングルクォート、またはダブルクォートで囲みます。

```
var test = 'test test';
var test = "test test";
```

文字列リテラルでは特別な意味を持つ文字**エスケープシーケンス**をバックスラッシュを使って**エスケープ**する必要があります。


#### エスケープシーケンス

\b
: バックスペース

\n
: 改行

\t
: タブ


```
var test = "test \n test";
```



### テンプレート文字列 《ES2015》

テンプレート文字列を利用することで、文字列リテラルの表現を拡張することができます。**文字列への変数の埋め込み**と**改行を文字列に含める**ことができます。この機能を利用することで記述を簡潔にすることができます。

```
var test = 'test test';
var text = \`This is ${test}\`;
```



### 配列リテラル

配列はデータの集合です。  
変数には一つの値を格納していましたが、配列には複数の値を格納することができます。格納された値を**要素**と呼びます。

配列リテラルには、インデックス番号をキーとしてアクセスします。配列には順番に番号が割り当てられます。

```
let mugiwaraTeam = ['Luffy', 'Nami', 'Zoro'];
let piratesKing = mugiwaraTeam[0];
```



### オブジェクトリテラル

オブジェクトとは名前をキーにアクセスできる配列です。連想配列とも呼ばれたりしています。通常の配列はインデックス番号でしか呼び出せないのに対して、名前で呼び出せるので視認性が高いところが特徴です。

配列では値を要素と呼んでいましたが、オブジェクトは**プロパティ**と呼びます。プロパティの中に関数が含まれている時は特別に**メソッド**と呼ばれます。

```
var age = {
  Luffy: 19;
  Nami: 20;
  Zoro: 21;
}

var captainAge = age.Luffy;
var navigatorAge = age['Nami'];
```

`{}`でくくってキーと値を`,`区切りで記述します。呼び出しかたは、ドット演算子を利用する方法と、ブラケット構文があります。




### 関数リテラル

関数は、定義しておいた処理に入力値の**引数**を与えて結果の*戻り値*を返す仕組みです。




### 未定義値 (undefined)

未定義値は、ある変数の値が定義されていないことを表す値です。

* 宣言されているが、値がない
* 未定義のプロパティを参照した
* 関数で値が返されなかった

上記のようなケースに当てはまります。




### null (ヌル)

undefinedは**定義されていない値**を表していて、nullは**空という状態**を表しています。















