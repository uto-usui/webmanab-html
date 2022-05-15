# replace wordpress x netlify x nuxt

xserver で管理していた wordpress サイトを 、wordpress REST API x nuxt generate で生成した静的アセットを netlify でホスティングする構成にリプレイスした時のtipsです。

### Netlify へのドメインの登録

Netlify の Domains で取得したドメインを登録します。SSLの設定も同時にしていきます。Netlify はこの辺りのフローがとてもわかりやすくていいですね。UI がモダンで扱いやすく必要なものにたどり着きやすい印象です。

### ドメインのネームサーバを Netlify に向ける

Netlify DNSを使用するために、次のようにドメインのネームサーバーでDNSゾーンを変更します。

* dns1.p03.nsone.net
* dns2.p03.nsone.net
* dns3.p03.nsone.net
* dns4.p03.nsone.net

☝🏻これは Netlify の DNS settings から確認できます。

### wordpress をサブドメインに設置

xserver でサブドメイン(wp)を作成し、wordpress 本体をその階層にコピーして、wp-config に wordpress URL の変更を記述。

#### wp-config

```php
define(‘WP_HOME’,’http://wp.webmanab-html.com’);
define(‘WP_SITEURL’,’http://wp.webmanab-html.com’);
```

Netlify の DNS records 設定で、サブドメインが server に向くように指定する。

Name : wp.example.com TTL : 3600 seconds Type : A Value : 183.90.242.42

## メール

Netlify ではメールの送受信の機能はないので DNS records 設定でMXレコードを設定します。wordpress を設置している xserver を利用します。

Name : example.com TTL : 3600 secondsType : MX Priority :10 Value : sv2141.xserver.jp

[メールソフトの設定 | レンタルサーバー【エックスサーバー】](https://www.xserver.ne.jp/manual/man_mail_setting.php)

# web/coding/wordpress
