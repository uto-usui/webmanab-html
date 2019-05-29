# できるだけ早く簡単に instagram のフィードを API で取得する -『API』

自分の instagram アカウントの投稿のみを API を使って取得したいときの駆け足の tips です。
とにかく簡単に JavaScript のみで実装したい時に参考にしてください。

## API 取得用のクライアントの作成

1. ブラウザで instagram に[ログイン](https://www.instagram.com/)
2. フッターのナビゲーション「API」
3. メインビジュアルのボタン「Register Your Application」
4. デヴェロッパー登録
5. メインビジュアルのボタン「Register Your Application」
6. 上部のボタン「Register a new Client 」
7. Details タブの Application Name / Description / Website URL / Valid redirect URIs (基本 Website URL と同じで ok) を入力
8. Secyrity タブの「Disable implicit OAuth」のチェックをはずす
9. 「Resister」ボタン
10. CLIENT ID をコピーしてメモしておく

## USER ID の取得

1. [find instagram user id](https://smashballoon.com/instagram-feed/find-instagram-user-id/)で id を取得
2. Username を入力
3. User ID をコピーしてメモしておく

## アクセストークンの取得

1. https://instagram.com/oauth/authorize/?client_id=CLIENT_ID&redirect_uri=REDIRECT_URL&response_type=tokenに「CLIENT_ID」と「REDIRECT_URL」を先ほど作成した内容に置き換えてアクセス
2. 「Authorize」ボタン
3. 「REDIRECT_URL」のページへ遷移
4. URL の末尾に「#access_token=\*」の形式で「access_token」が返っているのでコピーしてメモ

## プラグイン Instafeed.js で表示

取得と描画は「Instafeed.js」を利用すると、簡単に出力することができます。

- [Instafeed.js](http://instafeedjs.com/)

#### html

```

<div class="instagram" id="instafeed"></div>
<script src="/assets/js/instafeed.min.js"></script>


```

#### javascript

```

var myfeed = new Instafeed({

    clientId: '[your client id]',
    get: 'user',
    userId: '[your user id]',
    accessToken:'[your token]',
    links: true ,
    limit: 4, // 件数
    resolution:'standard_resolution',  // 解像度
    template: '<li class="instagram_item"><a class="instagram_target" href="{{link}}" target="_blank" style="background-image: url({{image}});"><span>♡{{likes}}</span></a></li>', // {{image}} {{link}} {{caption}} {{likes}} {{comments}}

    success: function(){
      // コールバック
    }

  });
myfeed.run();

```

他にもいろいろなオプションを渡すことで、ソートしたり、好みやデザインに合わせることができます。コールバック関数で、ローダーを管理したりすることもできますね。

#### javascript

```

var loadButton = document.getElementById('load-more');
  var feed = new Instafeed({
    // every time we load more, run this function
    after: function() {
      // disable button if no more results to load
      if (!this.hasNext()) {
        loadButton.setAttribute('disabled', 'disabled');
      }
    },
});

loadButton.addEventListener('click', function() {
  feed.next();
});

feed.run();

```

上記のように、公式では「Load more」ボタンを設置するサンプルが用意されています。

- [Instafeed.js](http://instafeedjs.com/)

ただ、このスクリプトを利用すると、アクセストークンなどが丸見えになってしまいます。悪用などされると厄介なので、その辺りはケースに応じて対応したいですね。

おわります。
