# TypeScript basic

TypeScript の初学者向けの型の文法をまとめます。

## basic types

単純なデータを処理するための基本の型です。

### Boolean

Boolean 型は `true` または `false` の値をとります。

```ts

const ruffy: boolean = true

```

### Number

Number 型は JavaScript と同じように不動小数点値で、 16 / 10 / 2 / 8 進数をサポートします。

```ts

const ruffy: number = 19

```

### String

String 型は　`””` `’’` `\`\`` で囲います。

```ts

const ruffy: string = ‘monkey’

```

### Array

Array 型は2つ記述する方法があります。

```ts

const ruffy: string[] = [‘monkey’, ‘gomugomu’]
const ruffy: Array<string> = [‘monkey’, ‘gomugomu’]

```

### Tuple

tuple 型を使うと、固定数の要素の型がわかっている配列の複数の型を表現できます。

```ts

const ruffy: [string, number] = [‘monkey’, 19] // ok
const ruffy: [string, number] = [19, ‘monkey’] // error

```

### Any

any 型は型が不明な変数の型チェックを無効にし、コンパイルさせるために利用できます。any を許容すると TypeScript の恩恵を受けることができなくなりバグの温床になることが多いので、できるだけ any 型を使わないようにします。既存プロジェクトの TypeScript 移行など、リファクタリングを前提としている場合に利用するといいです。

```ts

let ruffy: any = ‘monkey’
ruffy = 0
ruffy = null

```

### Unknown

unknown 型は型安全な any として利用します。値の代入は自由にできますが、一度代入した値を利用するときに型チェックして、間違ったメソッドが実行されていないかなどを調べることができます。

```ts

const ruffy: any = ‘monkey’
ruffy.push(‘D’) // ok

const ruffy: unknown = ‘monkey’
ruffy.push(‘D’) // error

```

### Void

void 型は any 型の反対の概念で、型がないことを表現します。値を返さない関数の戻り値として利用します。ちなみに void 型の変数には `null` か `undefined` しか代入できません。

```ts

const ruffyAttack = (name: string): void => {
  console.log(`gomugomu no ${name}`)
}

```

### Never

never 型は発生し得ない値を表現できます。関数内部で例外を投げるときや、無限ループをする場合など、戻り値が得られないときに使います。void 型と違いundefinedも受け付けません。

```ts

const day2 = (log: string): never => {
  throw new Error(log)
}

// error
const ruffyAttack = (name: string): never => {
  console.log(`gomugomu no ${name}`)
}

```

### Null / Undefined

null 型と undefined 型はすべての型のサブタイプになっていて、どこにでも代入できます。ただ、 `—strickNullChecks` のオプションが `true` になっていると、`void` 型もしくはそれぞれ自身にしか代入することができなくなるので、より厳格になり、エラーチェックに有用です。

```ts

let ruffy: undefined = undefined

let ruffy: null = null

```

### Object

object 型は、プリミティブではない値を表す型です。

```ts

let ruffy: object = {}
ruffy = ‘monkey’ // error

```

## next step  types

### Intersection types

intersection types を使うと、宣言した複数の型を `&` でマージできます。

```ts

type A = {
  name: string
}
type B = {
  age: number
}

type AB = A & B

```

### Union types

union types は、複数の型のうち `|`　で区切ったいずれかの型が、当てはまることを表現します。

```ts

const ruffy: (string | number)[] = [‘monkey’, 19]

```

これを利用すると初期化時に `null` を許容するようなコード（nullable 型）を書けます。

```ts

let ruffy: string | null = null
ruffy = ‘monkey’

```

### Literal types

literal types は文字列と数値に利用できます。

String literal types を利用すると決められた文字列しか許容しない変数を宣言できます。

```ts

let name: ‘ruffy’ | ‘nami’
name = ‘ruffy’
Name = ‘nami’

name = ‘sanji’ // error

```

numelic literal types を利用すると決められた数値しか許容しない変数を宣言できます。

```ts

let year = 1989 | 1
year = 1
year = 1989

year = 2 // error

```

## typeof / keyof keywords

### typeof

`typeof` キーワードを使うと、宣言済みの変数の型を取得して、違う変数に適用できます。明示的に型を指定していない場合も、型推論から抽出して、別の変数に与えることができます。

```ts

const ruffy = 17
let nami: typeof ruffy

nami = ’17’

```

### keyof

`keyof` キーワードを使うと、オブジェクト key を String literal union types として取得できます。`typeof` と組み合わせて使うと便利です。

```ts

const ruffy = {
  name: ‘monkey’,
  age: 19,
}

let type: keyof typeof ruffy
for (type in ruffy) {
  console.log(type)
}

```

## Assertion

TypeScript の強力な型推論ではなく、実装者が型の詳細を指定したい場合、アサーションを使います。ダウンキャストができる場合に明示的に型を宣言することができ、TypeScript に型チェックを行ったことを伝えます。記法は2つあります。

```ts

const el = document.querySelector<HTMLDivElement>(‘#el’)
const canvas = document.querySelector(‘#canvas’) as HTMLCanvasElement

```

## Class

ES2015 以降の JavaScript では Class を利用できますが、TypeScript ではさらに強力な Class 構文を扱うことができます。クラスメンバーに修飾子を与えることができ、参照・実行の公開範囲を指定できます。

public
:  どのコンテキストでも ok

protected
:  継承したサブクラスまで ok

private
: 宣言したクラス内のみ ok

```ts

class Ruffy {
  protected first: string
  private d: string
  public last: string

  constructor(first: string, d: string, last: string) {
    this.first = first
    this.d = d
    this.last = last
  }
}

const ruffy = new Ruffy(‘Monkey’, ‘D.’, ‘Ruffy’)

```

おわります。
