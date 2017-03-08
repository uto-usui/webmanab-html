# Ajax通信でWordPress関数を動かして何かするときに必要なこと -『WordPress』

WordPressを実装したサイトで、「ボタンをクリックしたときにデータベースにアクセスして何かとってくる」など、Ajax通信して`function.php`に定義した関数を実行する方法です。








## 簡単なスクリプト

ボタンにしかけたカスタムデータ属性をJavaScriptで取得し、ajaxでphpに渡して、返ってきた値をコンソールに表示してみます。





### 呼び出すPHP関数の作成

JavaScriptからAjaxで呼び出したいphp関数をfunction.phpに定義します。

#### functions.php

```

function my_ajax_func() {
  $text = $_POST['text'];
  echo $text . 'ajax!!';
}

add_action('wp_ajax_action_name', 'my_ajax_func');  // ログインユーザ
add_action('wp_ajax_nopriv_action_name', 'my_ajax_func');　未ログインユーザ

```

`action_name`は任意の名前です。

`wp_ajax_[action name]` でAjaxで扱う独自のアクションフックを登録しますが、`wp_ajax_[action name]` はログインユーザー、`wp_ajax_nopriv_[action]`はログインしてないユーザ用のフィルタです。





### JavaScripとテンプレート(htmlの記述)の用意

例として、`single.php`に記述する感じです。


#### single.php (テンプレート)

```

<a class="js-btn" href="" data-text="click">click :)</a>

```

jQueryの`$.ajax`メソッドを利用して簡単に記述します。


#### javascript


```

$('.js-btn').on('click', function(e) {

  e.preventDefault();
  var ajaxUrl = window.location.protocol + '//' + window.location.host + '/wp-admin/admin-ajax.php',
      text = $(this).attr('data-text');

  $.ajax({
    type: 'POST',
    url: ajaxUrl,
    data: {
      'action' : 'action_name', // [action name] を渡す
      'text' : text
    },
    success: function (res) {
      console.log(res);
    }

  });

});

```

`admin-ajax.php`へのパスを取得します。

```

var ajaxUrl = window.location.protocol + '//' + window.location.host + '/wp-admin/admin-ajax.php'

```

`action`にアクションフック名を渡します。

```

'action' : 'action_name',

```

上と同じく`data`に任意の名前でパラメータを渡します。

```

'text' : text

```







おわります。