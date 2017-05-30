# webstormの基本


## 初期設定


### ホワイトスペースの可視化

prefferencesメニュー > Editor > General > Appearanceの項目にある「Show whitespaces」にチェックを入れる。

これで可視化が有効になるのですがデフォルトでは色が見えづらいことがあるので、prefferencesメニュー > Editor > Color & Fonts > General > Text > Whitespaceに好きな色を指定します。



## ツール関連


### FTPの接続

設定
: 環境設定 (cmd + ,) / build / deployment

パネルを開く
: Tools / Deployment / Browse Remote Host





## Git関連

[意外と知らないIntelliJ IDEAのGit管理機能いろいろ（´-`）](http://qiita.com/yoppe/items/fd03607d4d4f191d32dd)



## できんかったやつ

### フォントウェイトの変更

デフォルトだとフォントファミリーに対して、ひとつのフォントウェイトしか表示されませんでした。(MacOS環境)

少し軽いウェイトにしたかったのですが、これがややこしいです。

1. ターミナルで`java -version`を実行、なければインストールを促すアラートが出る
2. Java(JDK)を[ここから](http://www.oracle.com/technetwork/java/javase/downloads/index.html)「Accept License Agreement」にチェックを入れてインストール
3. ターミナルで`/usr/libexec/java_home`を実行して、吐き出したパスをコピー
4. ターミナルでコピーしたパスのディレクトリに移動
5. ターミナルで `open .`を実行してカレントディレクトリをFinderで開く
