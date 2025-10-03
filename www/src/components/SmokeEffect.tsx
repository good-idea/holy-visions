'use client'
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface SmokeProps {
  strength?: number
  speed?: number
  color1?: [number, number, number]
  color2?: [number, number, number]
  className?: string
}

export const SmokeEffect: React.FC<SmokeProps> = ({
  strength = 5.0,
  speed = 2.0,
  color1 = [230, 134, 153],
  color2 = [94, 54, 110],
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    uniforms: any
    animationId: number
  } | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const [controls, setControls] = useState({
    strength,
    speed,
    color1: [...color1] as [number, number, number],
    color2: [...color2] as [number, number, number],
  })

  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_strength;
    uniform float u_speed;
    uniform vec3 u_color1;
    uniform vec3 u_color2;

    float random (in vec2 _st) {
      return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))*43758.5453123);
    }

    float noise (in vec2 _st) {
      vec2 i = floor(_st);
      vec2 f = fract(_st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm ( in vec2 _st) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
      for (int i = 0; i < 5; ++i) {
          v += a * noise(_st);
          _st = rot * _st * 2.0;
          a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy*u_strength;
      vec3 color = vec3(0.0);
      vec2 q = vec2(0.);
      q.x = fbm(st);
      q.y = fbm(st);
      vec2 r = vec2(0.0);
      r.x = fbm(st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time*u_speed );
      r.y = fbm(st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time*u_speed );
      float f = fbm(st+r);
      color = mix(u_color1,
                  u_color2,
                  clamp((f*f)*4.0,0.0,1.0));
      color = mix(color,
                  u_color1,
                  clamp(length(q),0.0,1.0));
      gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
    }
  `

  const normalizeColor = (color: [number, number, number]) => {
    return new THREE.Vector3(color[0] / 255, color[1] / 255, color[2] / 255)
  }

  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x =
      event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft)
    mouseRef.current.y =
      event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop)
  }

  const onWindowResize = () => {
    if (!sceneRef.current || !containerRef.current) return

    const { renderer, uniforms } = sceneRef.current
    const dpr = window.devicePixelRatio || 1
    const scaleSize = 1

    renderer.setPixelRatio(dpr)
    renderer.setSize(
      window.innerWidth / scaleSize,
      window.innerHeight / scaleSize,
    )
    renderer.domElement.style.width =
      renderer.domElement.width * scaleSize + 'px'
    renderer.domElement.style.height =
      renderer.domElement.height * scaleSize + 'px'

    uniforms.u_resolution.value.x = renderer.domElement.width
    uniforms.u_resolution.value.y = renderer.domElement.height
    uniforms.u_mouse.value.x = mouseRef.current.x
    uniforms.u_mouse.value.y =
      2 * uniforms.u_resolution.value.y - mouseRef.current.y
  }

  const animate = (timestamp: number) => {
    if (!sceneRef.current) return

    const { renderer, scene, camera, uniforms } = sceneRef.current

    uniforms.u_time.value = timestamp / 1000
    uniforms.u_mouse.value.x = mouseRef.current.x
    uniforms.u_mouse.value.y =
      2 * uniforms.u_resolution.value.y - mouseRef.current.y

    renderer.render(scene, camera)
    sceneRef.current.animationId = requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Create Three.js scene
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      u_time: { value: 1.0 },
      u_mouse: { value: new THREE.Vector2() },
      u_resolution: { value: new THREE.Vector2() },
      u_strength: { value: controls.strength },
      u_speed: { value: controls.speed },
      u_color1: { value: normalizeColor(controls.color1) },
      u_color2: { value: normalizeColor(controls.color2) },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer()
    container.appendChild(renderer.domElement)

    sceneRef.current = {
      renderer,
      scene,
      camera,
      uniforms,
      animationId: 0,
    }

    // Set up event listeners
    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', onWindowResize)

    // Initial resize and start animation
    onWindowResize()
    animate(0)

    return () => {
      // Cleanup
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        container.removeChild(sceneRef.current.renderer.domElement)
        sceneRef.current.renderer.dispose()
      }
    }
  }, [])

  // Update uniforms when controls change
  useEffect(() => {
    if (!sceneRef.current) return

    const { uniforms } = sceneRef.current
    uniforms.u_strength.value = controls.strength
    uniforms.u_speed.value = controls.speed
    uniforms.u_color1.value = normalizeColor(controls.color1)
    uniforms.u_color2.value = normalizeColor(controls.color2)
  }, [controls])

  const handleControlChange = (property: string, value: any) => {
    setControls((prev) => ({
      ...prev,
      [property]: value,
    }))
  }

  const colorToHex = (color: [number, number, number]) => {
    return `#${color.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`
  }

  const hexToColor = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0]
  }

  return (
    <div
      className={`absolute top-0 w-full h-full mix-blend-difference ${className}`}
    >
      {/* WebGL Container */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden"
      />

      {/* Controls */}
      <div className="hidden absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white">
        <h3 className="text-sm font-bold mb-3">Smoke Controls</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1">
              Strength: {controls.strength}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={controls.strength}
              onChange={(e) =>
                handleControlChange('strength', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs mb-1">
              Speed: {controls.speed}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={controls.speed}
              onChange={(e) =>
                handleControlChange('speed', parseFloat(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs mb-1">Color 1</label>
            <input
              type="color"
              value={colorToHex(controls.color1)}
              onChange={(e) =>
                handleControlChange('color1', hexToColor(e.target.value))
              }
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs mb-1">Color 2</label>
            <input
              type="color"
              value={colorToHex(controls.color2)}
              onChange={(e) =>
                handleControlChange('color2', hexToColor(e.target.value))
              }
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
