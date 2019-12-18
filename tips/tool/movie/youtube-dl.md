# youtube-dlでコマンドラインから動画をダウンロードする方法。

youtube-dl はコマンドラインで動く、Youtube等の動画サイトから動画をダウンロードするツールです。

豊富なオプションが用意されていて、スクレイビングして正規表現に当てはまるものまとめてダウンロードしたり、高度な使い方をすることができます。詳しくは公式の README.md にまとまっていますが、ここではよく使う基本的な機能を日本語でまとめておきます。

* [youtube-dl/README.md at master · rg3/youtube-dl · GitHub](https://github.com/rg3/youtube-dl/blob/master/README.md)


## インストールする
Mac 環境なので[Homebrew ](https://brew.sh/index_ja.html)を使ってインストールします。

```bash
brew install youtube-dl
```


## 動画をダウンロードする
ダウンロードするのは簡単で、その動画のURLを入力するだけです。

```bash
youtube-dl [url]
```


### プレイリストごとダウンロード

プレイリストごとをまとめてダウンロードできます。 `-i` というオプションで、ダウンロードエラーを無視してくれます。

```bash
youtube-dl -i [url]
```

### 一番品質のいい mp4 をダウンロード

まず、アップロードされているファイル形式を調べます。

```

youtube-dl -F PrqBrTd6pb0

```

取得した一覧のなかから品質の良い mp4 と m4a のフォーマットコードを組み合わせて DL します。

```

 youtube-dl -f 137+140 --merge-output-format mp4 xxxidxxx
 
```

## 音声のみダウンロードする
動画をダウンロードした後に、 ffmpeg で自動的に音声ファイルに変換します。`-x` で音声ファイルに抜き出し、`--audio-format` で形式を指定、`--audio-quality` でビットレートを指定します。

```bash
youtube-dl -x --audio-format mp3 --audio-quality 0 [url]
```



## その他のコマンド
その他のヘルパーのように使うコマンドです。

### ヘルプを表示
```bash
youtube-dl -h
```


### 対応サイトを表示する 

```bash
--list-extractors
```



おわります。

### エレクトロニカプレイリストの1から10をダウンロードする

```bash
youtube-dl -c -i -w --playlist-items 1-10 -x --audio-format mp3 --audio-quality 0  https://www.youtube.com/watch?v=qkMIXF2zbn4&list=PL2A4BB4733780252E
```

```
youtube-dl -c -i -w -x --audio-format mp3 --audio-quality 0  https://www.youtube.com/playlist?list=PLxva6IwDn1KycXaFjSa0Veb6tInNUQ0rB&pbjreload=10
```


8桁の数字の後の文字列を削除する

```bash
rename 's/(\d{8}).*/$1/' *
```


#web/coding/tool/
