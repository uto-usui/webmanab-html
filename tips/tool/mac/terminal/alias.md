# ターミナルのコマンドエイリアス(ショートカットコマンド)を設定すると便利。

ターミナルで色々なツールを使うのにコマンドを叩きますが、よく使うコマンドはエイリアス(ショートカット)として登録しておくことで冗長になるオプションを省略しておいたり、覚えにくいものを自分でわかりやすいように定義しておくととても便利です。



## エイリアスを設定する

 ホームディレクトリにターミナルで移動し、.bashrc を開きます。ここにエイリアスを定義します。

#### .bashrc

```bath

alias name='command'

```

という形式で列挙します。

.bash_profileを開き、以下の記述をします。

#### .bash_profile

```bath

source ~/.bashrc

```

保存後、下記コマンドを実行して変更を反映します。再ログインすることでも変更が反映されます。

```bath

source .bash_profile

```

これで定義したエイリアスを使用できるようになりました。



## 引数付きのエイリアス
コマンドに引数を渡したい場合は `$n` と記述します。

```bath

alias name='something command $1 $2'

```



### 関数を定義する
文字列と変数を連結するようなコマンドの場合は、関数として定義する必要があります。

```bath

function cmd() {
  command cmd -i something$1
}

```


## Nodebrewを使っているとき
Nodebrew で node.js の管理をしている場合は、.bashrc ではなく .bash_profile にコマンドを記述することになります。

* [nodebrewでnode.jsのバージョン管理をする -『front-end』 – webmanab.html／ウェブまなぶ](https://webmanab-html.com/tip/nodebrew-manage-nodejs/)



おわります。
