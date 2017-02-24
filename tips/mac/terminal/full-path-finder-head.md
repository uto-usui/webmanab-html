# MacOSを便利に。Finderのタイトルバーにファイルのフルパスを表示する。 -『Mac』

MacOSのFinderの画面の最上部のタイトルバー部分に、現在表示しているファイルのフルパスを表示する方法です。





## Finderのタイトルバーにフォルダのフルパスを表示

通常Finderのウインドウの最上部に現在表示しているフォルダの名前が表示されます。フォルダのフルパスを表示できた方が、階層がわかってファイルの位置が把握しやすく便利なので、ターミナルから設定します。

#### terminal

```
defaults write com.apple.finder _FXShowPosixPathInTitle -boolean true
```

のあと、Finderを再起動します。

```
killall Finder
```

もとの仕様に戻したいときは、

```
defaults delete com.apple.finder _FXShowPosixPathInTitle
```

のあと、Finderを再起動します。

```
killall Finder
```






























おわります。