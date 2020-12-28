// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//:unsigned integers
  // float mod(float a, float b){
  //   return (a)-((a)/(b))*(b);
  // }

void main(){
    vec2 coord = gl_FragCoord.xy;
    vec3 color = vec3(0.0);

    // bottom-left
    vec2 bl = step(vec2(25.0), mod(coord, 26.0));
    float pct = bl.x * bl.y;
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}
