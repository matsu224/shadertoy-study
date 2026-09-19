vec3 render(vec2 fragCoord, vec2 resolution)
{
    vec2 uv = fragCoord / resolution;
    vec2 p = uv*2.0-1.0;

    return vec3(uv.x, uv.y, 0.0);
}

// ここから下だけShaderToy固有
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec3 color = render(fragCoord, iResolution.xy);
    fragColor = vec4(color, 1.0);
}