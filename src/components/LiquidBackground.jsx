import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Smooth, studio-tuned fluid silk shader matching the attached black-to-violet liquid gradient
const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.95;

    // Subtle pointer fluid bend
    vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0) * 1.8;
    float md = length(p - m);
    p -= (p - m) * exp(-md * 2.4) * 0.12;

    float t = u_time * 0.26;

    // Smooth iterative liquid satin folds (matches diagonal silk ribbons in image-1.jpeg)
    vec2 q = p;
    for (int i = 1; i <= 4; i++) {
      float fi = float(i);
      q.x += 0.50 / fi * sin(fi * 1.55 * q.y + t * 0.85 + 0.4 * fi);
      q.y += 0.48 / fi * cos(fi * 1.38 * q.x - t * 0.70 + 0.6 * fi);
    }

    float primaryWave = sin(q.x * 1.18 - q.y * 1.02 + t * 0.55);
    float crossWave   = cos(q.x * 0.82 + q.y * 1.48 - t * 0.42);
    float silk        = smoothstep(-0.68, 0.90, primaryWave * 0.68 + crossWave * 0.40);

    // Specular pastel-lavender silk crest from image-1.jpeg
    float crest = pow(max(0.0, sin(q.x * 1.35 - q.y * 0.88 + t * 0.6) * 0.5 + 0.5), 6.0);
    float depthMask = smoothstep(-0.4, 0.78, sin(p.x * 0.7 + q.y * 0.55 - t * 0.25));

    vec3 voidBlack    = vec3(0.010, 0.004, 0.026); // #030107
    vec3 deepIndigo   = vec3(0.105, 0.000, 0.310); // #1B004F
    vec3 electricPurp = vec3(0.490, 0.000, 0.980); // #7D00FA
    vec3 silkViolet   = vec3(0.660, 0.190, 1.000); // #A830FF
    vec3 softCrest    = vec3(0.930, 0.760, 1.000); // #EDC2FF

    vec3 col = mix(voidBlack, deepIndigo, smoothstep(0.08, 0.54, silk));
    col = mix(col, electricPurp, smoothstep(0.34, 0.84, silk) * (0.52 + 0.48 * depthMask));
    col = mix(col, silkViolet, smoothstep(0.60, 0.96, silk) * 0.82);
    col += softCrest * crest * 0.54 * smoothstep(0.38, 0.92, silk);

    // Subtle studio vignette so foreground cards pop with crisp contrast
    float vig = 1.0 - smoothstep(0.55, 1.75, length((uv - vec2(0.36, 0.52)) * vec2(1.12, 1.0)));
    col *= (0.56 + 0.44 * vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LiquidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' }) ||
      canvas.getContext('experimental-webgl');

    if (!gl) return;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(prog, 'u_time');
    const resLoc = gl.getUniformLocation(prog, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: 0.32, y: 0.52 };
    let target = { x: 0.32, y: 0.52 };

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.65;
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onPointer = (e) => {
      target.x = e.clientX / Math.max(window.innerWidth, 1);
      target.y = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
    };

    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });

    let raf;
    const t0 = performance.now();

    const frame = (now) => {
      const elapsed = (now - t0) * 0.001;
      mouse.x += (target.x - mouse.x) * 0.035;
      mouse.y += (target.y - mouse.y) * 0.035;

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030108]">
      {/* Attached reference gradient image gently drifting as base layer */}
      <img
        src="./images/liquid-gradient-ref.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-55 scale-125 liquid-img-drift"
      />

      {/* CSS Liquid Silk Fallback Orbs */}
      <div className="liquid-fallback-orb liquid-orb-1" />
      <div className="liquid-fallback-orb liquid-orb-2" />

      {/* Real-time 60fps WebGL Fluid Silk Shader */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-88 mix-blend-screen"
      />

      {/* Atmospheric contrast veil for crisp editorial readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 22% 42%, transparent 0%, rgba(4, 1, 11, 0.42) 70%), linear-gradient(180deg, rgba(4, 1, 11, 0.28) 0%, rgba(4, 1, 11, 0.18) 50%, rgba(4, 1, 11, 0.55) 100%)',
        }}
      />
    </div>
  );
}
