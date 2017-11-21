# 画像から取得したデータでCanvasにモザイクを描く方法 -『JavaScript』


`canvas` 要素に記述した独自データ属性の `data-src` 属性を参照し、その画像データからモザイクを描くスクリプトです。





## html

```html

<canvas id="canvas" data-src="test.jpg" width="800" height="600"></canvas>

```





## JavaScript

```js

/**
 * canvasのdata-src属性の画像のピクセルデータからモザイクを描画する
 * @param mosaicSize {number}
 */
const draw = (mosaicSize = 20) => {

  /**
   * 画像情報からモザイクを描画する
   */
  const createMosaic = (context, width, height, size, data) => {

    for (let y = 0; y < height; y += size) {

      for (let x = 0; x < width; x += size) {

        /**
         * r,g,b,a の順で格納されている値を取り出す
         */
        let cR = data.data[(y * width + x) * 4],
            cG = data.data[(y * width + x) * 4 + 1],
            cB = data.data[(y * width + x) * 4 + 2];

        context.fillStyle = `rgb(${cR},${cG},${cB})`;
        context.fillRect(x, y, x + size, y + size);

      }

    }

    // 横ストライプにしたければこんな感じで
    //
    // for (y = 0; y < height; y = y + size) {
    //
    //   let cR = data.data[(y * width) * 4],
    //       cG = data.data[(y * width) * 4 + 1],
    //       cB = data.data[(y * width) * 4 + 2];
    //
    //   context.fillStyle = `rgb(${cR},${cG},${cB})`;
    //   context.fillRect(x, y, width, y + size);
    //
    // }

  };

  const init = () => {

    let canvas = document.getElementById('canvas'),
        _canvas = document.createElement('canvas');

    if (!canvas || !canvas.getContext) {

      return false;

    }
    let context = canvas.getContext('2d');

    /**
     * 画像をセット
     */
    let img = new Image();
    img.src = canvas.getAttribute('data-src');

    /**
     * 画像のロードを待って取得
     */
    img.onload = () => {

      let _context = _canvas.getContext('2d'),
          imageData;

      /**
       * 画像とカンバスのサイズを合わせる
       */
      _canvas.width = img.width;
      _canvas.height = img.height;

      _context.drawImage(img, 0, 0);

      /**
       * canvasのピクセルデータのオブジェクト
       * 左から右に、 r, g, b, a の順で色情報が格納されている
       */
      imageData = _context.getImageData(0, 0, _canvas.width, _canvas.height);

      createMosaic(_context, _canvas.width, _canvas.height, mosaicSize, imageData);

      context.drawImage(_canvas, 0, 0);

    };

  };

  init();

};
draw(20);

```