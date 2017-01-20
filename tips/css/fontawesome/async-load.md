# サイトを高速化。かんたんなスクリプトでfonttawesomeを非同期読み込みする -『font』

豊富で使い勝手のいいアイコンを提供してくれる「fontawesome」を非同期に読み込んで実行することでサイトを高速化するtipsです。





## かんたんなスクリプトでfonttawesomeを非同期読み込みする



```

var loadFontawesome = function (url)  {
  
  var fontawesome = url;
  var createLink = function (href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
  if (raf) {
    raf(function (){
      createLink(fontawesome);
    });
  } else {
    window.addEventListener('load', function(){
      createLink(fontawesome);
    });
  }
}

loadFontawesome("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");

```

最終行のurlを変更すると、違うバージョンを読み込んだり、googleFontsなどの他のスタイルシートを非同期に読み込むことも可能です。


```
loadFontawesome("url");
```




おわります。


























