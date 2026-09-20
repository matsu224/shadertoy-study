# shadertoy-study

ShaderToyで作成したGLSLの練習コードをまとめたリポジトリ。

各フォルダには、1つのテーマまたは小さなシェーダーをまとめている。

## GLSLとShaderToyの境界

このリポジトリのシェーダーはShaderToy上での実行を前提としている。
次の名前や形式は標準GLSLそのものではなく、ShaderToyが用意するインターフェースである。

* `mainImage(out vec4 fragColor, in vec2 fragCoord)`：ShaderToyのエントリーポイント
* `fragCoord`：`mainImage`へ渡される、現在のピクセル座標
* `iResolution`：描画領域の解像度
* `iTime`：シェーダーの再生時間
* `iMouse`：マウスの位置やクリック状態
* `iChannel0`：テクスチャなどを受け取る入力チャンネル（`iChannel1`〜`iChannel3`も同様）

型（`vec2`、`vec3`など）、演算子、制御構文、`sin`や`mix`などの組み込み関数は基本的にGLSLの機能である。ただし、ShaderToyのコードをOpenGL、WebGL、Unityなどの別環境で使う場合は、`mainImage`をその環境のエントリーポイントへ置き換え、上記の入力に相当するuniformや出力変数を自分で宣言する必要がある。

## コードの基本テンプレート

学習対象のGLSLとShaderToy固有の処理を分けるため、基本的に次の形式で記述する。

```glsl
vec3 render(
    vec2 fragCoord,
    vec2 resolution,
    float time,
    vec4 mouse,
    sampler2D channel0,
    sampler2D channel1,
    sampler2D channel2,
    sampler2D channel3
)
{
    // ピクセル座標を0〜1の範囲へ変換する
    vec2 uv = fragCoord / resolution;

    // ここに学習するGLSLを書く
    return vec3(0.0);
}

// --- ここから下だけShaderToy固有 ---
// mainImage  : ShaderToyのエントリーポイント
// fragCoord  : 現在のピクセル座標
// iResolution: 描画領域の解像度
// iTime      : シェーダーの再生時間
// iMouse     : マウスの位置やクリック状態
// iChannel0〜3: テクスチャなどを受け取る入力チャンネル
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec3 color = render(
        fragCoord,
        iResolution.xy,
        iTime,
        iMouse,
        iChannel0,
        iChannel1,
        iChannel2,
        iChannel3
    );

    fragColor = vec4(color, 1.0);
}
```

`uv`はGLSLやShaderToyが自動的に用意する変数ではなく、このリポジトリで使う普通のローカル変数である。`fragCoord`はピクセル単位の座標だが、`resolution`で割ることで、解像度にかかわらず画面の左下をおよそ`(0.0, 0.0)`、右上をおよそ`(1.0, 1.0)`として扱える。

`render`はこのリポジトリで定める学習用の関数であり、GLSLやShaderToyの組み込み関数ではない。このリポジトリで使用する可能性がある入力を最初からすべて引数に含め、課題ごとに関数の形を変更しない。使わない引数はそのままでよい。

学習部分ではShaderToy固有の名前を直接使わず、`time`、`mouse`、`channel0`〜`channel3`として扱う。ShaderToy固有の`iTime`、`iMouse`、`iChannel0`〜`iChannel3`との対応は、末尾のadapterだけにまとめる。

## ディレクトリ構成

```text
01_uv_gradient/
├── shader.frag
└── preview.png

02_shape_masks/
├── shader.frag
└── preview.png

03_repetition_patterns/
├── shader.frag
└── preview.png

04_sine_patterns/
├── shader.frag
└── preview.png

05_coordinate_transform/
├── shader.frag
└── preview.png

06_vector_dot/
├── shader.frag
└── preview.png

07_color_mix/
├── shader.frag
└── preview.png

08_procedural_pattern/
├── shader.frag
└── preview.png

09_time_animation/
├── shader.frag
└── preview.png

10_scanline_effect/
├── shader.frag
└── preview.png
```

* フォルダ名は `番号_テーマ名` の形式
* `shader.frag` にShaderToyで使用したGLSLコードを保存
* `preview.png` に実行結果を保存
* 必要な場合のみ補足ファイルを追加

フォルダ番号は学習・作成した順番を表す。
