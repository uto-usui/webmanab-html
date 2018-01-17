# 動画処理ツールFFmpegで音声(mp4)を動画(mp3)に変換する方法
動画処理の中でも定番で強力なツール [FFmpeg](https://www.ffmpeg.org/) を使って、コマンドラインからmp4をmp3に変換するtipsです。

## インストール
実行するのは、[Homebrew](https://brew.sh/)  がインストールされているMacOS環境です。まずターミナルで ffmpeg をインストールします。

```bash
brew install ffmpeg --with-tools
```


## 変換
任意のディレクトリでコマンドを実行します。ディレクトリ以下の複数ファイルを一気に変換します。

```bash
cd [your directory]
```

```bash
find . -type f -name "*.mp4" -print0 | perl -pe 's/\.mp4\0/\0/g' | xargs -0 -I% ffmpeg -i %.mp4 -acodec libmp3lame -ab 256k %.mp3
```


### 参考
* [動画処理の定番ツール「FFmpeg」ことはじめ - Qiita](https://qiita.com/kitar/items/59f80bba2ca997e0f5e6)

今回は動画から音声を抜き出す動作を実行しましたが、FFmpeg では様々な動画のリソースに関する機能が用意されています。つかいこなしていきたいです。



おわります。


#web/coding/tool/