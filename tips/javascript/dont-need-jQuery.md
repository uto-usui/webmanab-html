# jQueryなしのJavascript


## 主なリソース

* [You Don't Need jQuery](https://qiita.com/tatesuke/items/b9548dd484b01b139b74#fn1)



## DOMの取得



### 要素の有無のチェック

```
const check = () => {

  let el = document.getElementById('el');

  if (el != null) {
    alert(el)
  } else {
    alert('nothing')
  }

};
check();

```


### jQueryライクなセレクター

```
const _$ = (target) => {

  if (target.match(/#/)) {

    return document.getElementById(target.replace('#',''));

  } else {

    return [...document.getElementsByClassName(target.replace('.',''))];

  }

};

_$('.el');

```
