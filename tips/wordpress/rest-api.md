# REST API

WordPress REST API でカスタム投稿タイプの取得するためのTipsです。



## ひととおり取得

`_embed` をクエリに付加すると、付随する情報を取得できます。

```

http://example.com/wp-json/wp/v2/POST_TYPE?_embed

```



## 検索して取得

`filter[]` にパラメータを渡します。
`filter[]` は `WP QUERY` と同じように利用できます。

```

http://example.com/wp-json/wp/v2/POST_TYPE?filter[s]=vue
http://example.com/wp-json/wp/v2/POST_TYPE?filter[tag]=javascript

```