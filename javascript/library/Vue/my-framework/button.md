# Vue.jsでコンポーネントをつくる 『ボタン編』

Vue.jsでボタンのコンポーネントを作りました。

ゆるりと、fav-frame という vue.js のコンポーネントをまとめたフレームワークを作っているので、新しいコンポーネントができたら掲載していきます🍟

コンポーネント本体、スタイルシート、呼び出し部分について書きます。


## コンポーネントの作成
`.vue` ファイルを作成しコンポーネントを作っていきます。

#### button.vue

```
<template>
  <button
          class="c-button"
          :class="[
              variation ? 'c-button--' + variation : '',
              size ? 'c-button--' + size : '',
              {
　　　　　　　　　 'c-button--outline': outline,
                'c-button--round': round,
                'c-button--full': full,
                'c-button--text': text,
                'is-disabled': disabled,
                'is-loading': loading,
              }]"

          :disabled="disabled"
          :type="buttonType"
          :autofocus="autofocus"

          @click="clickHandler"
  >
    <i
            :class="[
              'fa',
              'fa-' + icon,
            ]"
            v-if="icon"
    >
    </i>
    <slot></slot>
  </button>
</template>

<script>
  export default {

    props: {
      variation: {
        type: String,
        default: ''
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      buttonType: {
        type: String,
        default: 'button'
      },
      outline: Boolean,
      round: Boolean,
      full: Boolean,
      text: Boolean,
      loading: Boolean,
      disabled: Boolean,
      autofocus: Boolean,
    },

    methods: {

      /**
       * 親にクリックイベントを渡す
       * @param e {Object} event object
       */
      clickHandler: function(e) {

        if (this.disabled) {

          return;

        }
        this.$emit('click', e);

      }

    }
  };

</script>


```

他のコンポーネントからの再利用(フォームのアドオンとか)を考えると、処理が増えるかもしれませんが、ボタン単体でやりたいことをまとめると、これでいい感じかなあと思っています。

[Font Awesome Icons](http://fontawesome.io/icons/) を利用することを前提としていますが、`<i>` のところを少し編集すれば、他のアイコンフォントでも利用できます。


## コンポーネントのセット

#### webpack.config.js

`import` のパスを通しやすいように、と、`.vue` ファイルの拡張子の省略を解決するのに webpack.config.js で 定義します。

```

import path from 'path';

module.exports = {
	// .... 他の記述は割愛
  resolve: {
    // 拡張子の省略の許可
    extensions: [
      '.vue'
    ],
    // パスを定義しておく
    alias: {
      'Vue$': 'vue/dist/vue.common.js',
      'Component': path.resolve(__dirname, 'src/assets/js/component/'),
    },
  },
}

```


#### main.js

コンポーネントを main.js でセットします。

```

import Vue from 'Vue';
import favButton from 'Component/button';

new Vue({
  el: '#app',
  components: {
    favButton
  }
});

```


## コンポーネントのスタイル
`.scss` ファイルでスタイリングします。


#### variable.scss

変数を定義します。他のコンポーネントも存在することを意識して、グローバルに利用したい変数も定義しておきます。

```

// global
// - - - - - - - - - - - - - - - - - - - -
$_color-white: #fafafa;
$_color-black: #333333;

$_color-primary: #F55247;
$_color-secondary: #50C7C1;

$_color-success: #6084D0;
$_color-warning: #FFCB67;
$_color-danger: #ea1836;
$_color-info: #878d99;

$_color-text-primary: #333340;
$_color-text-secondary: mix($_color-white, $_color-text-primary, 30%);


$_border-width-base: 3px;
$_border-style-base: solid;
$_border-color-base: #d8dce6;
$_border-color-lighter: #e6ebf5;
$_border-default: $_border-width-base $_border-style-base $_border-color-base;
$_border-radius-base: 4px;
$_border-radius-small: 2px;
$_border-radius-circle: 100%;


// base
// - - - - - - - - - - - - - - - - - - - -
$_button-font-size: 16px;
$_button-font-weight: 400;
$_button-border-radius: 4px;
$_button-default-color: $_color-text-primary;
$_button-default-fill: $_color-white;
$_button-default-border: $_border-color-base;
$_button-padding-vertical: .75em;
$_button-padding-horizontal: 1.5em;


// size
// - - - - - - - - - - - - - - - - - - - -
$_button-large-font-size: 16px;
$_button-large-border-radius: $_button-border-radius;
$_button-large-padding-vertical: 1.25em;
$_button-large-padding-horizontal: 1.5em;

$_button-medium-font-size: 16px;
$_button-medium-border-radius: $_button-border-radius;
$_button-medium-padding-vertical: 1em;
$_button-medium-padding-horizontal: 1.5em;

$_button-small-font-size: 12px;
$_button-small-border-radius: $_button-border-radius;
$_button-small-padding-vertical: .5em;
$_button-small-padding-horizontal: 1em;


// modifier
// - - - - - - - - - - - - - - - - - - - -
$_button-border-primary: $_color-primary;
$_button-color-primary: $_color-white;
$_button-fill-primary: $_color-primary;

$_button-border-secondary: $_color-secondary;
$_button-color-secondary: $_color-white;
$_button-fill-secondary: $_color-secondary;

$_button-border-success: $_color-success;
$_button-color-success: $_color-white;
$_button-fill-success: $_color-success;

$_button-border-warning: $_color-warning;
$_button-color-warning: $_color-white;
$_button-fill-warning: $_color-warning;

$_button-border-danger: $_color-danger;
$_button-color-danger: $_color-white;
$_button-fill-danger: $_color-danger;

$_button-border-info: $_color-info;
$_button-color-info: $_color-white;
$_button-fill-info: $_color-info;


// disabled
// - - - - - - - - - - - - - - - - - - - -
$_button-disabled-color: $_color-text-secondary;
$_button-disabled-fill: $_color-white;
$_button-disabled-border: $_border-color-base;


// interaction
// - - - - - - - - - - - - - - - - - - - -
$_button-hover-percent: 20%;
$_button-active-percent: 10%;
$_button-transition: all .2s cubic-bezier(0.23, 1, 0.32, 1);

```

#### mixin.scss

見通しを良くするために`mixin` で関数を定義します。

```

@mixin button-outline($color) {
  color: $color;
  background: mix($_color-white, $color, 98%);
  border-color: mix($_color-white, $color, 60%);

  &:hover,
  &:focus {
    background: $color;
    border-color: $color;
    color: $_color-white;
  }

  &:active {
    background: mix($_color-black, $color, $_button-active-percent);
    border-color: mix($_color-black, $color, $_button-active-percent);
    color: $_color-white;
    outline: none;
  }

  &.is-disabled {
    &:hover,
    &:focus,
    &:active {
      color: mix($_color-white, $color, 40%);
      background-color: mix($_color-white, $color, 90%);
      border-color: mix($_color-white, $color, 80%);
    }
  }
}

@mixin button-modifier($color, $background-color, $border-color) {
  color: $color;
  background-color: $background-color;
  border-color: $border-color;

  &:hover,
  &:focus {
    background: mix($_color-white, $background-color, $_button-hover-percent);
    border-color: mix($_color-white, $border-color, $_button-hover-percent);
    color: $color;
  }

  &:active {
    background: mix($_color-black, $background-color, $_button-active-percent);
    border-color: mix($_color-black, $border-color, $_button-active-percent);
    color: $color;
    outline: none;
  }

  &.is-active {
    background: mix($_color-black, $background-color, $_button-active-percent);
    border-color: mix($_color-black, $border-color, $_button-active-percent);
    color: $color;
  }

  &.is-disabled {
    &,
    &:hover,
    &:focus,
    &:active {
      color: $_color-white;
      background-color: mix($background-color, $_color-white);
      border-color: mix($border-color, $_color-white);
    }
  }

  &.c-button--outline {
    @include button-outline($background-color);
  }

}

@mixin button-size($padding-vertical, $padding-horizontal, $font-size, $border-radius) {
  padding: $padding-vertical $padding-horizontal;
  font-size: $font-size;
  border-radius: $border-radius;
}

```

#### button.scss

そして、スタイルの本体部分です。

```

.c-button {
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  line-height: 1;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  color: $_button-default-color;
  font-family: inherit;
  font-weight: $_button-font-weight;
  @include button-size($_button-padding-vertical, $_button-padding-horizontal, $_button-font-size, $_button-border-radius);
  border: $_border-default;
  border-color: $_button-default-border;
  background: $_button-default-fill;
  appearance: none;
  outline: none;
  transition: $_button-transition;

  + .c-button {
    margin-left: 1rem;
  }

  &:hover,
  &:focus {
    color: $_color-primary;
    border-color: mix($_color-white, $_color-primary, 65%);
    background: mix($_color-white, $_color-primary, 95%);
  }

  &:active {
    color: mix($_color-black, $_color-primary, $_button-active-percent);
    border-color: mix($_color-black, $_color-primary, $_button-active-percent);
    outline: none;
  }

  // has icon
  // - - - - - - - - - - - - - - - - - - - -
  > .fa {
    margin-right: 5px;
  }

  // modifier
  // - - - - - - - - - - - - - - - - - - - -
  &.c-button--primary {
    @include button-modifier($_button-color-primary, $_button-fill-primary, $_button-border-primary);
  }
  &.c-button--secondary {
    @include button-modifier($_button-color-secondary, $_button-fill-secondary, $_button-border-secondary);
  }
  &.c-button--success {
    @include button-modifier($_button-color-success, $_button-fill-success, $_button-border-success);
  }
  &.c-button--warning {
    @include button-modifier($_button-color-warning, $_button-fill-warning, $_button-border-warning);
  }
  &.c-button--danger {
    @include button-modifier($_button-color-danger, $_button-fill-danger, $_button-border-danger);
  }
  &.c-button--info {
    @include button-modifier($_button-color-info, $_button-fill-info, $_button-border-info);
  }

  &.c-button--large {
    @include button-size($_button-large-padding-vertical, $_button-large-padding-horizontal, $_button-large-font-size, $_button-large-border-radius);
  }
  &.c-button--medium {
    @include button-size($_button-medium-padding-vertical, $_button-medium-padding-horizontal, $_button-medium-font-size, $_button-medium-border-radius);
  }
  &.c-button--small {
    @include button-size($_button-small-padding-vertical, $_button-small-padding-horizontal, $_button-small-font-size, $_button-small-border-radius);
  }

  &.c-button--full {
    width: 100%;
  }

  //
  &.c-button--text {
    padding-left: 0;
    padding-right: 0;
    color: $_color-primary;
    border: none;
    background: transparent;

    &:hover,
    &:focus {
      color: mix($_color-white, $_color-primary, $_button-hover-percent);
      border-color: transparent;
      background-color: transparent;
    }
    &:active {
      color: mix($_color-black, $_color-primary, $_button-active-percent);
      border-color: transparent;
      background-color: transparent;
    }
  }

  &.c-button--round {
    border-radius: 1.5em / 50%;
  }

  &.c-button--outline {
    &:hover,
    &:focus {
      background: $_color-white;
      border-color: $_color-primary;
      color: $_color-primary;
    }

    &:active {
      background: $_color-white;
      border-color: mix($_color-black, $_color-primary, $_button-active-percent);
      color: mix($_color-black, $_color-primary, $_button-active-percent);
      outline: none;
    }
  }

  // state
  // - - - - - - - - - - - - - - - - - - - -
  &.is-active {
    color: mix($_color-black, $_color-primary, $_button-active-percent);
    border-color: mix($_color-black, $_color-primary, $_button-active-percent);
  }

  &.is-disabled {
    &,
    &:hover,
    &:focus {
      color: $_button-disabled-color;
      cursor: not-allowed;
      background-image: none;
      background-color: $_button-disabled-fill;
      border-color: $_button-disabled-border;
    }

    &.c-button--text {
      background-color: transparent;
    }

    &.c-button--outline {
      &:hover,
      &:focus {
        background-color: $_color-white;
        border-color: $_button-disabled-border;
        color: $_button-disabled-color;
      }
    }
  }

  &.is-loading {
    position: relative;
    z-index: 1;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      z-index: 2;
      left: -2px;
      top: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: inherit;
      background-color: rgba($_color-black,.35);
      pointer-events: none;
    }

    &::after {
      content: "";
      position: absolute;
      z-index: 3;
      display: block;
      left: calc(50% - (1em / 2));
      top: calc(50% - (1em / 2));
      height: 1em;
      width: 1em;
      border: $_border-default;
      border-color: $_border-color-lighter;
      border-radius: 100%;
      border-right-color: transparent;
      border-top-color: transparent;
      animation: spin .48s infinite ease-in;
      pointer-events: none;
    }

  }

}

```


## コンポーネントを呼び出す
やっとコンポーネントを呼び出すところにやってきました。😇

#### index.html

``` 

  <div id="app">
      <p>
          <fav-button variation="" icon="">button</fav-button>
      </p>
      <p>
          <fav-button variation="primary" icon="twitter">button</fav-button>
          <fav-button variation="primary" size="small" icon="twitter">button</fav-button>
          <fav-button variation="primary" size="medium" icon="twitter">button</fav-button>
          <fav-button variation="primary" size="large" icon="twitter">button</fav-button>
      </p>
      <p>
          <fav-button variation="primary" icon="facebook">primary</fav-button>
          <fav-button variation="secondary" icon="twitter">secondary</fav-button>
          <fav-button variation="success" icon="coffee">success</fav-button>
          <fav-button variation="warning" icon="check">warning</fav-button>
          <fav-button variation="danger" icon="bolt">danger</fav-button>
          <fav-button variation="info" icon="info">info</fav-button>
      </p>
      <p>
          <fav-button variation="primary" outline icon="facebook">primary</fav-button>
          <fav-button variation="secondary" outline icon="twitter">secondary</fav-button>
          <fav-button variation="success" outline icon="coffee">success</fav-button>
          <fav-button variation="warning" outline icon="check">warning</fav-button>
          <fav-button variation="danger" outline icon="bolt">danger</fav-button>
          <fav-button variation="info" outline icon="info">info</fav-button>
      </p>
      <p>
          <fav-button variation="primary" loading icon="twitter">loading</fav-button>
          <fav-button variation="primary" disabled icon="twitter">disabled</fav-button>
          <fav-button round>round</fav-button>
      </p>
      <p>
          <fav-button variation="primary" full icon="twitter">fulll width</fav-button>
      </p>
　　　　<p>
          <fav-button text>plane text</fav-button>
       </p>
  </div>

```

すると、こんな感じに描画しました。

[image:953AD590-855E-4DD6-BFE6-E212091BDD86-7715-000019406998136F/s_.jpg]

できた！


##  コンポーネントのスタイルガイド
これについてはまだ実現していません。
普段は、[GitHub - frontainer/gulp-frontnote: スタイルガイドジェネレーターFrontNoteのGulpプラグイン](https://github.com/frontainer/gulp-frontnote) を使っているのですが、今回、何を使おうか悩んでいます🤔


## 参考
* [Bulma: a modern CSS framework based on Flexbox](https://bulma.io/)
* [Element](http://element.eleme.io/)
* [Bootstrap · The most popular HTML, CSS, and JS framework in the world.](https://v4-alpha.getbootstrap.com/)




おわります。



#web/coding/javascript/Vuejs