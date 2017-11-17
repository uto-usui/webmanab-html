# jQueryみたいなセレクターでDOMを取得するES6なクラス - 『JavaScript』

jQueryなしのプロジェクトで、`document.getElementById()` や `document.getElementsByClassName()` を省略するためのヘルパーはいろいろ知恵がありますが、自分でも使いやすいものを作ってみました。


class構文で書きます。




## DOMの取得をjQueryみたいにシンプルな記述にしたい

セレクタにシンボルを付与して、その文字列からメソッドを振り分けるようにしています。

毎回 `new` を記述するのをシンプルにするため、ラップして隠蔽できるようにしました。



#### javascript

```

/**
 * # / . / * を含むセレクタを受け取ってDOMを返す
 * # : getElementById
 * . : getElementsByClassName
 * * : querySelectorAll
 */
const Selector = class {

  /**
   *
   * @param selector
   * @returns {*[]}
   */
  constructor(selector) {

    this.selector = selector;
    return this._getEl();

  }

  /**
   * セレクタを判別してDOMを取得
   * @returns {[*]}
   * @private
   */
  _getEl() {

    const method = this._selectMethod();

    const el = document[method](this.selector.slice(1));

    return !el.length ? el : [...el];

  }

  _selectMethod() {

    const matches = {
      '#': 'getElementById',
      '.': 'getElementsByClassName',
      '*': 'querySelectorAll'
    }[this.selector[0]];

    return matches;

  }

};


/**
 * new を省略するためのラッパー
 * 好きな関数名を与える
 */
const _$ = target => new Selector(target);


/**
 * こんな感じで使う
 */
console.log(_$('#el'));

console.log(_$('.el'));
console.log(_$('*[data-el]'));
console.log(_$('*p'));

console.log(_$('*#el2 p'));

```

これで、 `_$('yourSelector')` でDOMを選択できるようになりました。




### forEachを使えるように

取得したDOMは、これも取り回しやすくするために、`[...el]` の部分で配列に展開して、`forEach()` にチェインできるようにしました。


#### javascript

```

_$('*p').forEach((el) => {

  el.style.color = '#22aacc';

});

```





## importできるように

このヘルパークラスを selector.js として main.js に `import` できるように手を加えてみます。


#### selector.js

```

const Selector = (() => {

  class Selector  {

    constructor(selector) {

      this.selector = selector;
      return this._getEl();

    }

    _getEl() {

      const method = this._selectMethod();

      const el = document[method](this.selector.slice(1));

      return !el.length ? el : [...el];

    }

    _selectMethod() {

      const matches = {
        '#': 'getElementById',
        '.': 'getElementsByClassName',
        '*': 'querySelectorAll'
      }[this.selector[0]];

      return matches;

    }

  }

  const omitNew = (target) => new Selector(target);

  return omitNew;

})();

export default Selector;

```


#### main.js

```

import _$ from './utility/selector';

console.log(_$('#main'));
console.log(_$('.main'));

```





## 参考

* [saltjs](https://github.com/james2doyle/saltjs)
