# コンパイル時にランダム値を更新する、静的なランダムなグラデーションカラーを生成する。 -『Sass/SCSS』

Sassの記述のみでランダムなカラーを抽出します。







## random()関数でランダム値を得る

ランダムカラーといっても動的に変更できるわけではないですが、`random()`関数を使うことでSCSSからCSSにコンパイルするときにランダム値を返すことを利用します。

`random()`関数には引数に最大値を与えることできるので、0から最大値までの値をランダムで返してくれます。

```

random(100)
// コンパイル時に0から100までの値をランダムに返す

```

これを利用してランダムカラーを出力します。


#### scss

```
@mixin bg-gradient($color: hsla(180, 65, 75, 1), $degrees: 180deg, $angle: 60deg, $start: 15%, $stop: 90%) {
  background-image: linear-gradient($angle, $color $start, adjust-hue($color, $degrees) $stop);
}

$baseHue: 180;
$swingWidth: 100;
$randHue: $baseHue - random($swingWidth) + random($swingWidth);
$randHsla: hsla($randHue, 65, 75, 1);

body {
  width: 100%;
  min-height: 100vh;
  @include bg-gradient($randHsla, 100deg, 90deg, 0%, 100%);
}
```

グラデーションの背景を出力する`mixin`もあわせて用意しました。









## コードをゆっくり解説






### hsla()関数でカラーをコントロール

最終的にhsla()関数で値をCSSの`color`や`background`に渡すようにします。
理由としては、rgba()関数よりhsla()関数の方が、値を渡したときに変化をコントロールしやすいからです。


#### scss

```
hsla(180, 50, 50, 1)
// hsla(色相環の角度, 彩度, 明度, 透明度)
```

色相環の角度、彩度、明度、透明度それぞれをランダムにしたり固定したりすることで、ばらつき加減をコントロールしやすいです。





### ランダム値をある程度コントロール

今回はこの色相環の角度にランダム値を渡すことでランダムカラーを実現しています。

色相環はこれです。

<img src="https://lh3.googleusercontent.com/iwfhMiPniSkp6l8uEzbYS6RZ9_KZof1tlpXYQiQDeRcjbH1UCQ8kac-dveMSHE0YphUSPoMopE2s_ofdccj_VQvxE8of4FElTBo6Qv9fHYKk_wuwZwHluy3sxS5hPWJUUCwDWibp5nBm3xJzz9pDxkaB0ND1EoyjTUHRZ0Zugk5CInzqQyR23AccXX7fwvit907C3aHNedBkbnG5vEbqqkmCN1U82Kt0jP7kLcVtEoFLFfmFITrCnnPnAK5S7w6oiStLbGwc5WQZjbNAJLSrX4rumeaK6HK1Pa6j0vQZVVrXU_4hRoV_6k8NYDL3v5nF6Ma4LBL6noHZIxPF3yr2waK3xTFpR2OTlv0YnVLiYwyPspTRDCavFdx86VEggHv5cGeLGKB2u1w_MZ_bpo1_5BfhNHMDDRGgEYIGLEZjlWxpdATTT09-oyxNr2AOuvRmYXIw6Dx-Z8tyzB6Q8lw-rmNTEgsTjrlGHV713KevXqlRUeJ6bKEB8Ir_noj_cQ_ate79uiVyHc4_0W_wQ0-EGTFJAZDtngBz-n7fjQJ07-QJf5Xrf4m6TnYKRIOM8j36lKMVKfuhO_M5vBtuprDv_YC70TmqwM02jJ4nkxWaVsnfPgp0YG13HKMliNgsyS1rZqOP2USZLDogn_4yZ8p4oWqRWXOnQ6AyDpdcNdQsAok=s649-no" width=320px>

この色相環の色を抽出する角度に変化をつけてあげます。

ただ単純にランダムカラーを生成するのではおもしろみに欠けるので、基準となる色からのランダム値の振れ幅を指定できるように記述しました。


#### scss

```

$baseHue: 180; // ベースとなる色相環の角度
$swingWidth: 100; // ランダム値の振れ幅
$randHue: $baseHue - random($swingWidth) + random($swingWidth);  // 180から前後100のランダム値を計算
$randHsla: hsla($randHue, 65, 75, 1);  // ランダムカラー 彩度、明度、透明度を固定

```

完全にランダムな値を取り出したい場合は、以下のように記述します。


#### scss

```
$randHsla: hsla(random(360), random(100), random(360), random(1));
```

これを背景色にするとランダムな背景の実現します。


#### scss

```

body {
  background-color: $randHsla;
}

```




### ランダム値をグラデーションを生成するmixinに渡していい感じに

この生成したランダムカラーをグラデーションの`mixin`に渡すことでいい感じにします。

[WebクリエイターボックスのManaさんのコード](http://www.webcreatorbox.com/tech/sass-colours/)からインスピレーションを得た感じの`mixin`になりました。


#### scss

```

@mixin bg-gradient($color: hsla(180, 65, 75, 1), $degrees: 180deg, $angle: 60deg, $start: 15%, $stop: 90%) {
  background-image: linear-gradient($angle, $color $start, adjust-hue($color, $degrees) $stop);
}

```

ランダム値をSassの`aduiust-hue()`関数で指定した角度分ずらして、ランダムカラーからそこに向かってグラデーションさせています。一応`mixin`にデフォルト値を与えていて、変更したくなるところをいろいろ設定できるようにしました。


#### scss

```

body {
  width: 100%;
  min-height: 100vh;
  @include bg-gradient($randHsla, 100deg, 90deg, 0%, 100%);
  // @include bg-gradient($randHsla, グラデーションの変化色を示す角度, グラデーションの方向を示す角度, グラデーションを始めるポジション, グラデーションを終えるポジション);
}

```











おわります。


















