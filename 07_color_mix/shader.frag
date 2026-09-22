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

    vec3 blue = vec3(0.0, 0.0, 1.0);
    vec3 red  = vec3(1.0, 0.0, 0.0);

    vec3 backgroundColor = mix(blue, red, uv.x);
    vec3 circleColor = vec3(1.0, 1.0, 0.0);

    float d = length(p);
    float mask = 1.0 - smoothstep(0.2, 0.4, d);
    vec3 res = mix(backgroundColor, circleColor, mask);

    return res;
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
