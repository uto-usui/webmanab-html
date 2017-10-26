# Vue 基礎

ユーザーインターフェイスを構築するためのプログレッシブフレームワークです。Vue は初めから少しづつ適用していけるように設計されています。Vue.js を使い始めたり、他のライブラリや既存のプロジェクトに統合したりすることはとても簡単です。一方、モダンなツールやサポートライブラリと併せて利用することで、洗練されたシングルページアプリケーションを開発することも可能です。


## データを要素に表示する

Vue アプリケーション は、Vue コンストラクタ関数でルート Vue インスタンスを作成することによって起動されます。

```

const app = new Vue({
  el: '#app',
    data: {
      yourName: 'world'
    }
});

```

引数のオブジェクトのelプロパティは、アプリケーションとして扱うノードの要素のセレクタです。dataに与えたプロパティ(yourName)の値は、ノードから`{{}}`で参照できます。アプリケーションのデータを、テキストとして表示します。




## データと要素の値をバインディングする v-model

v-modelディレクティブを使うと、入力とアプリケーションの状態(プロパティ)を互いに結びつける(双方向バインディング)ことができます。

```

<div class="field">
  <label class="label">Hello "{{yourName}}"</label>
  <div class="control">
    <input class="input" v-model="yourName" type="text" placeholder="enter a name here" />
  </div>
</div>

```



## クラスをバインディングして動的に切り替える　v-bind

v-bindディレクティブは、プロパティや属性を動的に切り替えます。v-bind:classの構文では、class属性をバインディングさせます。


```

<label class="checkbox">
  <input type="checkbox" v-model="done">
  <span v-bind:class="{'done': done}"> "{{todo}}"</span>
</label>

```

```

const app = new Vue({
  el: '#app',
  data: {
    todo: '',
    done: false
  }
});

```

チェックボックスの`v-model`属性をトリガーに`done`の真偽値が切り替わることで、クラスがトグルします。




## 配列からデータを取り出す　v-for

`v-for`ディレクティブで配列からデータを取り出します。変数 in データ配列という形式で記述します。

```

<ul class="label">
  <li v-for="todo in todos">
    <label class="checkbox">
      <input type="checkbox" v-model="todo.done">
      <span v-bind:class="{'done': todo.done}"> "{{todo.text}}"</span>
    </label>
  </li>
</ul>
<div class="control">
  <input class="input" v-model="todos[0].text" placeholder="add a todo here" type="text" />
</div>

```

```

const app = new Vue({
  el: '#app',
  data: {
    todos: [
      {
        text: 'task A',
        done: true
      },
      {
        text: 'task B',
        done: false
      },
    ],
  }
});

```



## イベントの作成と実装 v-on

`v-on`ディレクティブは:引数のベントにリスナーを定めます。`v-on:click`ディレクティブで、クリックイベントを仕掛け、その内容を`methods`プロパティに記述します。

```

<ul>
  <li v-for="todo in todos">
    <label class="checkbox">
      <input type="checkbox" v-model="todo.done">
      <span v-bind:class="{'done': todo.done}"> "{{todo.text}}"</span>
    </label>
  </li>
</ul>

```

```

const app = new Vue({
  el: '#app',
  data: {
    todoText: '',
    todos: [
      {
        text: 'task A',
        done: true
      },
      {
        text: 'task B',
        done: false
      },
        ]
  },
  methods: {
    addTodo: function() {
      let newTodo = this.todoText.trim();
      if (!newTodo) {
        return;
      }

        this.todos.push(
          {
          text: newTodo,
          done: false
          }
        );
        this.todoText = '';
      }
    }
  });

```




## 算出プロパティで変更を検知して値を返す computed

`computed` に定義した算出プロパティは依存関係に基づきキャッシュされ、リアクティブ依存が変更されたときにだけ再算出します。

```

computed: {
  remaining: function() {
    let count = 0,
    todos = this.todos,
    length = todos.length;

    for (var i = 0; i < length; i++) {
      if (!todos[i].done) {
        count++;
      }
    }

      return count;
    }
  }

```

関数が与えられたプロパティ(remaining)はgetter関数として機能しています。関数で扱うデータが変更されたとき、戻り値を更新します。

算出プロパティの代わりに、メソッドとして定義することも可能です。しかし、算出プロパティは依存関係にもとづきキャッシュされるので、依存するものが更新されたときにだけ再評価されます。再評価をしない限りはキャッシュを即時に返します。





## 監視プロパティ watch
















