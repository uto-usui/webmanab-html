# git操作で基本的で普段使うコマンドのまとめ

- - -




## git操作で基本的で普段使うコマンドのまとめ(使う順)

gitのコマンドや基本操作のコマンドや知識についてまとめておきます。  
知識深まればどんどん追記します。環境はmacOSです。  
`[]`の中は任意のものを記述します。




### 最初に必要なこと

例えばGItHubとやりとりしたい場合は、SSH接続なのでSSH keyを作っていれば、その存在確認をしてコピーして、GitHubのプロフィールにペーストします。
SSH keyなければ作成してからコピペです。


#### SSH keyの存在確認

`ls -al ~/.ssh`

ここでSSH keyがあればGitHubのAdd SSHkeyでSSHをペーストします。


#### SSHの新規作成

`ssh-keygen -t rsa -C [my-email-address@mail.com]`

そのあと Enter押す / 自分のシステムのpass / 自分のシステムのpass


#### SSHをクリップボードにコピー

`pbcopy &lt; ~/.ssh/id_rsa.pub`


#### 登録できたかテスト

`ssh -T [git@githab.com]`




### 基本操作

いつも使う基本的な操作。これは覚えとかなきゃいけないよねというものです。


#### クローン

`git clone [url]`

任意のディレクトリに移動して、ローカルにリモートリポジトリをクローンします。


#### ローカルリポジトリを作成する

`git init`

クローンしない場合は任意のディレクトリでローカルリポジトリを作成。

#### Backlogにリモートリポジトリを作成する

`git remote add [master] [HTTPS-url]`

Backlogでgit設定して、HTTPSのurlをコピーして持ってきます。


#### 変更されたファイルの表示

`git status`

変更されたファイルだけを確認します。


#### ファイルやディレクトリをインデックスに登録

`git add [filepattern]`

ファイルパターンの指定はワイルドカードとかディレクトリ指定とか色々できます。  
全てのファイルおwインデックスに登録する場合は、

`git add .`


#### ファイルをコミットする

`git commit -m "[message]"`

インデックスに登録したファイルをメッセージをつけてコミットします。


#### 履歴の確認

`git log`


#### push 変更した内容をリモートリポジトリに反映

`git push [repository] [branchname]`


#### pull リモートリポジトリから最新の状態を取得

`git pull [repository] [branchname]`


#### ファイルの削除

`git rm [file]`




### リモート操作のこと


#### リモートリポジトリの複製

`git clone [url]`


#### リモートリポジトリの追加

`git remote add [repository] [url]`




### gitの設定


#### ユーザ名の変更

`git config --global user.name [username]`


#### メールアドレスの変更

`git config --global user.email [mailaddress]`










