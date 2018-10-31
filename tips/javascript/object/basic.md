# 基本データを扱うオブジェクト

JavaScript標準のデータ型を扱う、String / Number / symbol / Mathオブジェクトについてまとめます。





## 文字列を操作する String

Stringオブジェクトは、文字列型の値を扱うためのラッパーオブジェクトです。文字列の抽出 / 加工 / 検索などを行う機能を提供します。Stringの主なメンバーをあげます。


#### 検索(真偽値)

indexOf(str, start)
: 文字列前方(start + 1)から部分文字列strを検索

lastIndexOf(str, start)
: 文字列後方(start + 1)から部分文字列strを検索

starsWith(str, start) 《ES2015》
: startからの文字列が部分文字列strで始まるか

endsWith(str, start) 《ES2015》
: startからの文字列が部分文字列strで終わるか

includes(str, start) 《ES2015》
: startからの文字列が部分文字列strを含むか


#### 部分文字列の抽出

charAt(n)
: n +1番目の文字を抽出

slice(start, end)
: 文字列からstart + 1文字目からend文字目を抽出

substring(start, end)
: 文字列からstart + 1文字目からend文字目を抽出

substr(start, count)
: 文字列からstart + 1文字目からcount文字を抽出

split(str, limit)
: 文字列をstrで分割して(limitが分割数であまりは切り捨て)、結果を配列で取得


#### 正規表現

match(reg)
: 正規表現regで文字列を検索、マッチした文字列を取得

replace(reg, str)
: 正規表現regで文字列を検索、マッチした文字列をstrで置換

search(reg)
: 正規表現regで文字列を検索、マッチした最初の文字位置を取得


#### 大文字 小文字

toLowerCase()
: 小文字に変換

toUpperCase()
: 大文字に変換


#### other

concat(str)
: 文字列の後方にstrを連結

repeat(num)
: 文字列をnum回繰り返したものを主時

trim()
: 文字列の前後かわ空白を削除

length
: 文字列の長さを取得





### 部分文字列の抽出

Stringメソッドでは、文字列からの部分文字列を抽出するメソッドに、`substring` `slice` `substr`の３つがあります。


#### 文字列を抽出するメソッド

substring / slice
: 開始位置から終了位置の範囲指定

substr
: 開始位置からの文字数指定

上記のように「`substring` / `slice`」と「`substr`」の違いは簡単です。`substring`と`slice`はもう少し細かい挙動の違いになっています。


#### start > end

```

let word = '海賊王におれはなる！';
console.log(word.substring(8,3)); // 王におれは
console.log(word.slice(8,3)); // 空文字列

```

`substring`メソッドは引数のstartとendとの関係を入れ替えて、end+1文字目からstart文字目までを抽出する挙動になり、`slice`メソッドは空文字列を返します。


#### endが負の数

```

let word = '海賊王におれはなる！';
console.log(word.substring(7,-3)); // 海賊王におれは
console.log(word.slice(2,-4)); // 王におれ

```

endに負の値が与えられている場合、`substring`は無条件に値が0の挙動になり、`slice`は文字列末尾からの文字数とカウントします。





### サロゲートペア文字の長さ

**`length`プロパティでは、マルチバイト文字を1文字としてカウントしますが、サロゲートペア文字は２文字としてカウント**します。サロゲートペア文字とは、2バイトで表現できない4バイトで表現される文字のことです。


#### サロゲートぺア文字を1文字としてカウント

```

let text= '𩸽の煮物';
let len = text.length;
let num = text.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g).length - 1;
console.log(text.length - num);

```

上記のコードで、サロゲートペア文字を1文字としてカウントすることが可能になります。









## 数値を操作する Number

Numberオブジェクトは、数値型の値を扱うためのラッパーオブジェクトで、数値を整形するための機能や特別な値を取り出すための専用のプロパティがあります。











































