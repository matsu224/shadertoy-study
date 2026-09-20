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

    vec2 cellUV = fract(uv * 5.0);
    cellUV = cellUV * 2.0 - 1.0;
    cellUV.x *= resolution.x / resolution.y; //横長画面でも円に見えるよう補正
    float d = length(cellUV);
    float r = 0.5;
    d = abs(d-r);
    d = 1.0 - smoothstep(0.1, 0.2, d);

    vec2 cellId = floor(uv * 5.0);
    float checker = mod(cellId.x + cellId.y, 2.0);

    return vec3(checker * d);
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
