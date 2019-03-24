# webstorm の基本

## 初期設定

### ホワイトスペースの可視化

prefferences > Editor > General > Appearance の項目にある「Show whitespaces」にチェックを入れる。

これで可視化が有効になるのですがデフォルトでは色が見えづらいことがあるので、prefferences メニュー > Editor > Color & Fonts > General > Text > Whitespace に好きな色を指定します。

### ファイルツリーから該当ディレクトリ(ファイル)を除外

webstorm の内部的な検索から、ディレクトリやファイルを除外したい時、これを設定します。具体的には、コンパイルファイルを除外することで、関数やクラスの検索から除外するために使ったりします。

prefferences > directories > 任意のファイルを選択

- [Directories](https://www.jetbrains.com/help/webstorm/directories.html)

## ツール関連

### FTP の接続

設定
: 環境設定 (cmd + ,) / build / deployment

パネルを開く
: Tools / Deployment / Browse Remote Host

## 便利な機能

## Git 関連

[意外と知らない IntelliJ IDEA の Git 管理機能いろいろ](http://qiita.com/yoppe/items/fd03607d4d4f191d32dd)

## できんかったやつ

### フォントウェイトの変更

デフォルトだとフォントファミリーに対して、ひとつのフォントウェイトしか表示されませんでした。(MacOS 環境)

少し軽いウェイトにしたかったのですが、これがややこしいです。

1. ターミナルで`java -version`を実行、なければインストールを促すアラートが出る
2. Java(JDK)を[ここから](http://www.oracle.com/technetwork/java/javase/downloads/index.html)「Accept License Agreement」にチェックを入れてインストール
3. ターミナルで`/usr/libexec/java_home`を実行して、吐き出したパスをコピー
4. ターミナルでコピーしたパスのディレクトリに移動
5. ターミナルで `open .`を実行してカレントディレクトリを Finder で開く
