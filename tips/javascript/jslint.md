# きれいなJSを書きたい。JavaScriptのスタイルを管理するためのES6に対応したESLintの使い方 -『javascript』

ESLintは、JavaScriptをより綺麗で一貫性のあるルールとスタイルで書くための構文チェックツールです。構文チェックツールを使用することで、どうすれば美しいコードが実現するのか、考えるきっかけや勉強になるので、JavaScript初学者の次のステップには導入しておきたいツールだとおもいます。

JavaScriptの構文チェックツールは他に、「JSHint」「JSLint」「JSCS」などがあり、ESLintの特徴としては、項目が豊富に用意されていて、それをルールとして自由に選択できるようになっています。そしてルールごとにアラートの強さを設定することができ、プロジェクトに合わせたルールを作りやすくなっています。





## ES6に対応したESLintをgulpで扱う環境をつくる

タスクランナーのgulp.jsで、ES6で記述されているスクリプトをbabelでコンパイルする前にESLintを実行する環境を構築します。

gulp環境の構築はこちらを参照してください。

* <a href="https://webmanab-html.com/tip/macos-gulp-init/" target="_blank">デザイナーがMacOSでgulpを動かせるようになるまでと、タスクとテンプレートファイルβ版の配布 -『gulp』</a>




### 必要なパッケージをインストール

プロジェクトのルートに「gulp-eslint」をインストールします。


#### terminal

```
npm i -D gulp-eslint
```

babelを扱うのでパーサーとして「babel-eslint」が必要になるので、これもインストールします。


#### terminal

```
npm i -D babel-eslint
```

gulpfile.jsには以下のように記述します。


#### gulpfile.js

```

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

var eslint = require('gulp-eslint');

gulp.task('js', function(){
  gulp.src(scriptPath)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(rename(function (path) {
       var cutLength = path.basename.length - 6;
       path.basename = path.basename.slice(0, cutLength);
    }))
    .pipe(gulp.dest(jsPath + '/babel/'));
});

```

エラーを出力するのに「gulp-notify」、スクリプトを常に実行するために「gulp-plumber」、babelを実行するのに「gulp-babel」、コンパイル後にファイル名を変更するのに「gulp-rename」を使用しています。`gulp js`とターミナルでコマンドを入力するとタスクが実行され、コンパイルされます。


* [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
* [babel-eslint](https://github.com/babel/babel-eslint)
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
* [gulp-notify](https://www.npmjs.com/package/gulp-notify)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)




### 設定ファイル.eslintrcをつくる

ESLintの特徴はチェックする内容を柔軟にカスタマイズできることですが、その設定ファイル「.eslintrc」を作成しプロジェクトルートに設置します。ここに記述されたJSONの内容で、環境やルールの追加・変更などができるようになります。

具体的なルールや項目についてはここに詳細に解説されています。

* <a href="http://eslint.org/docs/rules/" target="_blank">List of available rules - ESLint</a>


#### .eslintrc

```

{
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
    "es6": true
  },
  "rules": {
    "strict": 2,
    "no-console": 1,
    "quotes": ["error", "single"],
    "array-bracket-spacing": [2, "never"],
    "block-spacing": 2,
    "brace-style": 2,
    "camelcase": 2,
    "comma-spacing": [2, {"before": false, "after": true}],
    "computed-property-spacing": [2, "never"],
    "eol-last": 2,
    "func-style": [2, "expression"],
    "indent": [2, 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    "key-spacing": ["error", { "mode": "strict" }],
    "lines-around-comment": 2,
    "no-multiple-empty-lines": [2, {max: 2}],
    "no-spaced-func": 2,
    "no-trailing-spaces": 2,
    "object-curly-spacing": [2, "never"],
    "padded-blocks": [2, "always"],
    "require-jsdoc": 2,
    "semi-spacing": [2, {"before": false, "after": true}],
    "keyword-spacing": [2, {"before": true}],
    "space-before-blocks": 2,
    "space-before-function-paren": [2, "never"],
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": 2,
    "arrow-spacing": 2,
    "no-var": 2
  }
}

```

### 設定ファイル.eslintrcの解説

```
"extends": "eslint:recommended"
```

とすることで、ESLintのオススメの設定を呼び出しています。設定内容は <a href="http://eslint.org/docs/rules/" target="_blank">List of available rules - ESLint</a>に記載されているチェックがついた項目になっています。ESLintは初期状態だと何もチェックしないので、ひとまずこれで最低限のルールをチェックできるようになります。これ基準にルールをカスタマイズしていきます。

* [推奨設定の日本語訳](https://gist.github.com/mysticatea/df40f5e3cdbf0e9ae618)


```
"parser": "babel-eslint",
```

「babel-eslint」をparserに指定しています。これでbabelでコンパイルすることを前提にスクリプトを記述できます。

```

"env": {
  "browser": true,
  "node": true,
  "jquery": true,
  "es6": true
}

```

`env`に記述している内容は、環境設定のようなものです。上記ではES6の記法でjQueryを使用するような環境を想定しています。ESLintは様々な環境下での使用に対応していて、特定の環境下やライブラリが読み込まれていることが前提でチェックを行うように指定しておきます。

* [Configuring ESLint - ESLint - Pluggable JavaScript linter](http://eslint.org/docs/user-guide/configuring#specifying-environments)


`rules`にルールを渡します。今回記述した内容だけになりますが、解説しておきます。


#### アラートの強さ

0
: チェックしない

1
: warning (警告)

2
: error (アラート)


#### パラメータ

array-bracket-spacing
: 配列のカッコ内の間隔

block-spacing
: 単一行ブロックの内側のスペースを強制

camelcase
: キャメルケース記法(先頭と末尾のアンダースコア、定数のような大文字とアンダースコアは許容)

comma-spacing
: カンマの前後の間隔

computed-property-spacing
: 計算されたプロパティの内側のパディング

eol-last
: 複数の空白行で、ファイルの最後に改行

func-style
: 関数宣言の方法

id-length
: 識別子の長さ

index
: タブとスペース幅

key-spacing
: オブジェクトのキーと値の間の間隔とスタイル

lines-around-comment
: コメントの上の行を空行にする

no-mixed-spaces-and-tabs
: タブとスペースを混合しない

no-multiple-empty-lines
: 最大改行数

no-spaced-func
: 関数と（）の間にスペースを禁止

no-trailing-spaces
: 行末の空白を禁止

object-curly-spacing
: オブジェクトの中括弧内のパディング

padded-blocks
: ブロック内のパディング

require-jsdoc
: Docスタイルのコメント

semi-spacing
: セミコロン前後のスペース

keyword-spacing
: キーワードの後のスペース

space-before-blocks
: ブロック前のスペース

space-before-function-paren
: 関数の括弧の前のスペース

space-in-parens
: カッコ内のスペース

space-infix-ops
: 演算子の前後のスペース

space-return-throw-case
: `return` `throw` `case`のスペース

space-unary-ops
: 単項演算子前後のスペース

arrow-spacing
: アロー関数の矢印の前後にスペース

no-var
: `var`の禁止

ESLintは設定項目が多く、把握しきれないと思うので、「.eslintrc」ファイルはジェネレーターで簡単に作ってしまうのがいいかもしれません。


#### .eslintrcのジェネレーター

* <a href="https://pirosikick.github.io/eslintrc-editor/" target="_blank">eslintrc-editor</a>

そうして「.eslintrc」ファイルを設置するとターミナルで`gulp js`を入力すれば、タスクが動くようになります。実行してエラーが出ると以下のように、行やエラー内容、そのパラメータ名がターミナルに明示されるので、場所やその内容が把握しやすくなっています。

```
3:1   error  There must be a space inside this paren  space-in-parens
```





## こんなときどうする

トラブルシューティング的なことをまとめておきます。




### グローバルの変数を宣言したいとき

別ファイルのプラグインにオプションを渡したいときなど`var`や`let`なしでグローバルの変数にアクセスしたいときがありますが、この場合エラーが出てしまいます。

対処法としては、「.eslintrc」にあらかじめ任意のグローバル変数の文字列を記述しておくことでエラーをスルーしてくれます。

```

"globals": {
  "paceOptions": true,
  "Pace": true
}

```






### ESLintでうつくしいコード

構文チェックツールESLintを使うと、一貫したルールやスタイルを共有することができ、そのルールを考える過程でどんなコードが読みやすいのか、美しいのか、と考えるきっかけになることもすごく重要だとおもいます。設定ファイルは簡単に共有・アップデートできるので、積極的にプロジェクトやリソースに合わせて検討を重ねてベターな環境をつくるといいかとおもいます。










おわります。





