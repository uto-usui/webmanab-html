# 今日から始めたい。スタイルガイドジェネレーター「FrontNote」のgulpでの書き方使い方 - 『front-end』

Node.js製の**スタイルガイドジェネレータ「FrontNote」**のガイドです。FrontNoteの特徴としてはスタイル全体の概要の記述、カラーパレットの作成、スタイルに任意のラベル付与などがあり、すごくここが有能で嬉しいポイントです。後はマテリアルデザインなところが個人的にテンションが上がりました○

FrontNoteにはgulp用のプラグインが配布されているのでそれを利用します。gulpでSCSSの更新時をウォッチして、FrontNoteに反映するようにして動かしたりすると素敵です。






## スタイルガイドジェネレーター「FrontNote」を利用する環境をつくる

使い方は簡単です。今回はgulpのプラグインを使用することを前提として、まずは導入してみます。





### gulpプラグインでFrontNoteをつかう

gulp用のFrontnoteのプラグインをインストールします。

* [StyleGuide Generator for Gulp](https://www.npmjs.com/package/gulp-frontnote)


#### インストール

```
npm install frontnote --save-dev
```

### gulpfile.jsへタスクを記述する

gulpfile.jsに記述していきます。いくつかオプションがありますが、出力したファイルを置くディレクトリと、スタイル全体の概要を記述するマークダウンファイルのディレクトリをオプションに渡しておきます。

任意のディレクトリのSCSSファイルのスタイルガイドを生成するタスクを記述します。

#### gulpfile.js

```

var frontNote = require('gulp-frontnote');
var srcPath = my/dir/src //任意のディレクトリ

gulp.task('note', function() {
  gulp.src(srcPath + '/**/*.scss')
   .pipe(frontNote({
      out: srcPath + './src',
      overview: srcPath + '/frontnote.md',
   }));
});

```





## スタイルガイドジェネレーター「FrontNote」の記述方法

作業しているCSSやSCSSファイルにコメントアウトでスタイルガイドを記述していきます。SCSSで管理している場合はファイルをコンポーネントとかレイアウトごとに仕分けして管理していくことになると思いますが、そのファイルごとにページが作成されます。わかりやすいようにファイルの上部にコメントとして記述するといいでしょう。




### スタイルガイドのページタイトルと概要

スタイルガイドの各ページのタイトルと概要を記述します。これはページ(ファイル)につき１セクションしか記述することができません。

```

/*
#overview
このスタイルガイドのページタイトルです

このスタイルガイドのページ概要です。
*/

```



### 通常の記述

```

/*
#styleguide
見出しのスタイル＊ タイトルをここに書く。

これはサイト全体に適用される見出しのスタイルです＊ コメントをここに書く。

@非推奨

```
<h1 class="h1">title01</h1>
<h2 class="h2">title02</h2>
<h3 class="h3">title03</h3>
```
*/

```




### ラベルをつける

注釈としてのラベルをつけることができます。古い情報や重要項目、策定中とかパッと見でわかりやすくできるので必要なところには使っておくと便利です。

```

/*
#styleguide
古い見出し

これは昔の見出しです。

@todo
@非推奨

```
<h1 class="h1-old">title01</h1>
```

```



### カラーパレット

カラーコードとその色味がわかる、カラーパレットを出力することができます。

```

/*
#colors

@primary #33ccaa
@secondary #aa55cc
@primary-text #cccccc
*/

```




### FrontNoteはいろいろカスタマイズができる

詳しい使い方のドキュメントはgithubを参照します。オプションなどいろいろ用意されているのがわかります。ejsの知識があればテンプレートをカスタマイズすることも容易です。

* [FrontNote github](https://github.com/frontainer/frontnote)
* [FrontNote Template github](https://github.com/frontainer/frontnote-template)

もともとのスタイルや見栄えはマテリアルデザインで余計な飾りがなく清潔で素敵ですが、CSSとJavaScriptはオプションでカスタムすることができるので、そのあたりも必要に応じて考えてあげるといいかなと思います。

FrontNoteを使うことによって、コメントをSCSS各ファイルに分散させておくことができるので見通しが良いなーと個人的には思うのですが、１ファイルにまとめておきたいというプロジェクトもあるので、この運用については要相談ですね。





### gulpでSassをコンパイル時にFrontNoteをつかう

今回紹介したタスクは、単純に任意のディレクトリにあるSCSSファイルからFrontNoteを出力するコードになっていました。ぼくが普段扱っているタスクはもう少し複雑なものになっているので、掲載しておきます。


#### gulpfile.babel.js

```

gulp.task('sass', () => {
  gulp.src(srcPath.sassPath + '/**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(frontnote({ out: srcPath.cssPath }))
    .pipe(sass({
      config_file: 'config.rb',
      sass: srcPath.sassPath,
      css: srcPath.cssPath,
      image: srcPath.imgPath
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4.4'],
      cascade: false
    }))
    .pipe(csscomb())
    .pipe(gulp.dest(distPath.cssPath + '/'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(distPath.cssPath + '/'))
    .pipe(browser.reload({ stream: true }))
    .pipe(notify('css task finished'));
});

```

* Sass(SCSS)をCSSに変換(compass)
* スタイルガイドを生成(frontnote)
* autoprefixerを実行
* CSSプロパティの並び順を整形
* 一時保存して、圧縮して名前を変更して、再保存
* ブラウザを再起動

というようなタスクを実行することでCSSにまつわるタスクを一括で行っています。
















おわります。