# async / await





## async / await のいいところ

async/awaitがどんな場面で有用か、のはなしです。



### Promiseの結果を再利用する

Promiseチェインは各処理の段階がthen()のスコープで区切られます。なので、処理の結果を後のチェインで再度使いたい場合にスコープが異なるので、外側のスコープにあらかじめ変数を宣言しておく必要があります。

この方法だと煩雑な印象ですが、async/await を利用すれば、非同期処理が同一のスコープに収められます。


```

const func = async () => {
  
  const num = await getNum();
  const myNum = await myNum(num);
  return compareNum(num, myNum);
  
}

```

### if文の条件分岐

Promiseチェインが入れ子構造になってしまうところが隠蔽されるので、if文のブロックのみの入れ子で記述できます。



### ループ

非同期処理はそのままループさせると、すべての処理が並行して行われます。


```

const wait = (s) => {
  
  return new Promise(func => setTimeout(func, s));
  
}

const delay = async (numbers) => {

  for (const munber of numbers) {
  
    await wait(1000);
    console.log(number);
    
  }
  
};

```






