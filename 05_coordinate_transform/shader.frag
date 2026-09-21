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

    vec2 p = (fragCoord * 2.0 - resolution) / resolution.y;

    float theta = 3.14/4.0;
    mat2 rot = mat2(vec2(cos(theta),sin(theta)),vec2(-sin(theta),cos(theta)));

    p = rot * p; //調べる座標を反時計回りに回すため、画面上の図形は逆の時計回りに回って見える

    vec2 size = vec2(0.3,0.5);
    vec2 q = abs(p)-size;
    //q = 1.0 - smoothstep(0.1, 0.2, q);
    //float mask = q.x * q.y;
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); //max(q,0.0)は成分ごとに負の値を0にする
    float mask = 1.0 - smoothstep(0.0, fwidth(d), d); //こうすることで境界の約1ピクセルだけを滑らかにしギザギザを軽減できるらしい

    return vec3(mask);
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
