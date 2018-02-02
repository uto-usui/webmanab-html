# Vue.jsのコンポーネント
 

## 再利用可能なコンポーネントの作成

依存性の少ないコンポーネントを作ります。Vue.jsでは、プロパティ、イベント、スロットの3つがコンポーネントを構成します。

プロパティ
: 外部環境がコンポーネントにデータを渡す

イベント
: コンポーネントが外部環境の副作用をトリガーする

スロット
: 外部によって追加されるコンテンツとともにコンポーネントを構成する
 
 
 
## コンテンツの挿入 (フォールバック) slot
 
コンポーネントにコンテンツを与える場所を明示するのに `<slot>` 要素を使います。また、 `<slot>` タグ内に記述したものは、フォールバックのコンテンツと見なされます。子スコープでコンパイルされ、要素が空でコンテンツがない場合にのみ、フォールバックとして表示されます。


#### nami-component

```

<div>
  <h2>Nami</h2>
  <slot>
    <p>I am Nami.</p>
  </slot>
</div>


```

このコンポーネントを呼び出します。

```

<div>
  <h1>Straw Hat Pirates</h1>
  <nami-component>
    <p>Pay 100 million belly.</p>
  </nami-component>
</div>

```

描画すると

```

<div>
  <h1>Straw Hat Pirates</h1>
  <div>
    <h2>Nami</h2>
    <slot>
      <p>Pay 100 million belly.</p>
    </slot>
  </div>
</div>

```

と、なります。



### 複数の名前付きスロット

`<slot>` 要素は 異なる `name` 属性与えると、複数のスロットを作成できます。` namr` 付きスロットは、対応する 親の `slot` 属性を持つ要素にマッチします。


#### nami-component

```

<div>
  <h2>Nami</h2>
  <slot name="linesA">
    <p>I am Nami.</p>
  </slot>
  <slot name="linesB">
    <p>I am Nami.</p>
  </slot>
</div>

```

このコンポーネントを呼び出します。

```
<div>
  <h1>Straw Hat Pirates</h1>
  <nami-component>
    <h2>Nami</h2>
    <slot slot="linesA">
      <p>I am Nami.</p>
    </slot>
    <slot slot="linesB">
      <p>I am Nami.</p>
    </slot>
  </nami-component>
</div>

```

描画すると

```
<div>
  <h1>Straw Hat Pirates</h1>
  <div>
    <h2>Nami</h2>
    <slot slot="linesA">
      <p>I am Nami.</p>
    </slot>
    <slot slot="linesB">
      <p>I am Nami.</p>
    </slot>
  </div>
</div>

```

となります。
