# jQueryなしのJavascript


## 主なリソース

* [You Don't Need jQuery](https://qiita.com/tatesuke/items/b9548dd484b01b139b74#fn1)



## DOMの取得



### jQueryライクなセレクター


#### vanilla

```

const Selector = class {

  constructor(selector) {

    this.selector = selector;
    return this._getEl();

  }

  _getEl() {

    const matches = {
      '#': 'getElementById',
      '.': 'getElementsByClassName',
      '*': 'querySelectorAll'
    }[this.selector[0]];

    const el = document[matches](this.selector.slice(1));

    return !el.length ? el : [...el];
    
  }

};


const _$ = (target) => {

  return new Selector(target);

};


console.log(_$('#el'));

console.log(_$('.el'));
console.log(_$('*[data-el]'));
console.log(_$('*p'));

console.log(_$('*#el2 p'));

```

#### jQuery

```

$('.el').on('click', () => {
  
  console.log('click');
  
});

```


### 要素の有無のチェック

#### vanilla

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




### ウインドウのスクロール位置のセット


#### vanilla

```

let target = document.getElementById('target'),
    pos = target.offsetTop;

document.body.scrollTop = pos;
document.documentElement.scrollTop = pos;

```

#### jQuery

```

let pos = $('#target').offset().top;
$('html, body').scrollTop(pos);

```





## bookmarks

* [You Might Not Need jQuery](http://youmightnotneedjquery.com/)
* [You Don't Need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery)
* 





## 速さを調べる

* [jsperf.com](https://jsperf.com/)
