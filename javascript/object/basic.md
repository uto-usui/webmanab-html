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

Stringメソッドでは、文字列からの部分文字列の抽出のメソッドに、`substring` `slice` `substr`があります。



































