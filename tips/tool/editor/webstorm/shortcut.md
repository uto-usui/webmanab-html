# Webstorm で知っておきたいショートカットを集めました

WebStorm はモダンな JavaScript をスマートに開発するための IDE です。

ぼくのまわりでは、JavaScript を書くならデザイナーもエンジニアも WebStorm がおすすめ、という雰囲気があります。メインストリームな感じなのを受けて、布教用とは言えないですが、ショートカット集をつくってみました。

ショートカットを覚えておくと、WebStorm の機能を少しづつ知っていくことにもつながるので、よく使う機能をピックアップしています。

- [WebStorm: The Smartest JavaScript IDE by JetBrains](https://www.jetbrains.com/webstorm/)
- [Keyboard Shortcuts By Category](https://www.jetbrains.com/help/webstorm/2016.2/keyboard-shortcuts-by-category.html)

## 一般

webstorm のコマンドを検索
: cmd + shift + A

ファイルの絶対パスをコピー
: cmd + shift + C

クリップボードを開く
: cmd 　＋　 shift 　＋　 V

Bookmark する
: option + F3

Bookmark を確認する
: cmd + F3

環境設定を開く
: cmd + ,

開いているファイルの切り替え
: control + tab

開いているファイルのタブ前後移動
: cmd + shift + [ or ]

## JavaScript 関連

変数名・関数名・クラス名を検索
: comd + option + o

クラス名やメソッド名の宣言と呼び出し元を同時編集
: shift + F6

クラス、メソッド、関数の情報を表示
: cmd + カーソルを合わせる

宣言か呼び出し元に移動
: cmd + b

変数の利用箇所に移動
: cmd + option + f7

import 　しているモジュールの整理 (ソート/未使用のものを削除)
: control + option + o

選択したコードをメソッドとして抽出
: cmd + option + m

選択したコードを変数に
: cmd + option + v

アウトラインをポップアップ
: cmd + F12

クイックドキュメント (JSDoc コメントや、 メソッドの詳細) を表示
: F1

MDN のドキュメントを開く
: shift + F1

引数の情報を表示
: cmd + P

クラスのメソッド引数をメンバー引数へ展開
: option + enter => Create Field

Vue コンポーネントを切り出す
: option + enter => Extract Vue Component

getter/setter/constructor を生成
: class の中の文字列で control + enter

## 移動

エディタ内の上下移動
: fn + ↑ or ↓

選択行を上下に移動
: option + shift + ↑ or ↓

クラス名を指定して移動
: cmd + o

ブロックの先頭か末尾に移動
: option + cmd + [ or ]

前の編集地点に移動
: shift + cmd + delete

編集ポイントに移動
: control + option + ← or →

## 編集

現在と次の行を１行に
: control + shift + J

コードフォーマットの適用
: cmd + option + l

マルチカーソル(同じ項目にカーソルを増やす)
: ある文字列を文字列を選択 + control + G

マルチカーソル編集
: option + click

長さの異なる文字列の一括編集
: option + double click

指定したディレクトリ内を検索
: cmd + shift + F

指定したディレクトリ内を一括置換
: cmd + shift + R

開きタグから閉じタグまでを選択
: alt + ↑ or ↓

矩形選択
: alt + 選択

次の同じ単語を選択
: cmd + g

同じ単語を複数選択
: control + g

同じ単語を全て選択
: control + cmd + g

## ファイルの展開

いろいろ全検索
: double shift

ファイル名検索
: shift + cmd + O

ナビゲーションバーに移動
: cmd + ↑

最近使用したファイル
: cmd + shift + E

## Emmet

要素をラップする要素を作る
: option + cmd + j

要素を削除する
: shift + cmd + fn + delete

## git

add
: cmd + option + a

コミット
: cmd + K

プッシュ
: cmd + shift + K

おわります。
