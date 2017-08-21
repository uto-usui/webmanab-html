# terminalの使い方


## エイリアスの作成

ターミナルでよく使うコマンドを独自ショートカットのように登録します。「エイリアス」と呼びますが、エイリアスを設定することでコマンドの入力効率がよくなり、ターミナルの作業スピードがアップします。


### エイリアスの登録

ターミナルでホームディレクトリに移動し、

```

vi ~/.bash_profile

```

を入力します。

そうするとviエディタが起動します。ここでコマンドを登録していくのですが、少し操作が独特で慣れるまで大変です。[viエディタの使い方](http://net-newbie.com/linux/commands/vi.html)を参考にします。

```
alias エイリアス名１='コマンド１'

```

という形式で列挙していきます。今回は不可視ファイルの表示を切り替えるためのコマンドを作成してみます。

```

alias show = 'defaults write com.apple.finder AppleShowAllFiles TRUE'
alias hide = 'defaults write com.apple.finder AppleShowAllFiles FALSE'
alias kill = 'killall Finder'

```


### エイリアスの読み込み

保存したら`.bash_profile`を読み込み直すために


```

source .bash_profile

```

を入力します。

これで`show`と`kill`を実行すると不可視ファイルが表示され、`hide`と`kill`を実行すると非表示にすることができるようになります。
