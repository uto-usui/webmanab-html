# クロージャーとは

変数を実行時の環境(スコープ)ではなく、その変数自身が定義された環境（静的スコープ）において解決する関数です。わかりにくいようで、簡単です。クロージャークロージャーを利用すると、関数を実行するスコープから参照操作できない変数を操作できるようになります。

それはどういう利点があるかというと、**状態を保持する関数**を作ることができます。

* 関数のなかに宣言した無名関数をreturn

これを抑えていきます。


クロージャ、と言われれば関数のスコープを利用した仕組みの話です。


```

const greeting = () => {

  let n = 1;

  return () => {
  
    alert(n);
    n += 1
    
  };

};

const func = greeting();

func(); // 1
func(); // 2

```

`func()` を実行しているところから `n` は参照することができませんが、 `n` を返すことができました。そして2度目の `func()`を実行すると `n` の値がキャシュされていて、インクリメントすることになります。**状態を保持する関数**を作成できますた。


