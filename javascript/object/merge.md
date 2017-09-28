# オブジェクトをマージする Object.assign() 《ES2015》


assignメソッドを使ってオブジェクトをマージします。

```

Object.assign(target, sources, ...)

```

`sources` で指定したオブジェクトのメンバを、`target`にコピーします。





## 同名のプロパティは後続するものに上書きされる

同名のプロパティが存在した場合は、後に続いているものが上書きされます。

```

let nami18 = {
favorite: 'orange',
bounty: 1600,
bloodType: 'x'
};

let nami20 = {
  favorite: 'orange',
  bounty: 6600,
  height: 170
};

let nami = Object.assign({}, nami18, nami20);

console.log(nami);

/*
let nami20 = {
  favorite: 'orange',
  bloodType: 'x',
  bounty: 6600,
  height: 170,
};
*/

```





## 入れ子のオブジェクトの中身は判定されない

入れ子になっているオブジェクトの中身は判断されず、そのオブジェクトごとマージされずに後続が上書きされます。


```

let nami18 = {
  favorite: 'orange',
  style: {
    W: 57,
    H: 86
  },
};

let nami20 = {
  favorite: 'orange',
  style: {
    B: 98,
    H: 88
  }
};

let nami = Object.assign({}, nami18, nami20);

console.log(nami);

/*
{
  favorite: 'orange',
  style: {
    B: 98,
    H: 88
  }
}
*/

```


おわります。
