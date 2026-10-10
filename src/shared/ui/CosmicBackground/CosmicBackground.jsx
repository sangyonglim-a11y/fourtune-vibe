import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './CosmicBackground.css'

function createStarField(count) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const gold = new THREE.Color(0xf0d78c)
  const violet = new THREE.Color(0x9b6dff)
  const white = new THREE.Color(0xffffff)

  for (let i = 0; i < count; i += 1) {
    const radius = 18 + Math.random() * 42
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.45
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const mix = Math.random()
    const color = mix > 0.72 ? gold : mix > 0.35 ? violet : white
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })

  return new THREE.Points(geometry, material)
}

function createMilkyWay() {
  const count = 1400
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const warm = new THREE.Color(0xffe4a8)
  const cool = new THREE.Color(0xb39dff)

  for (let i = 0; i < count; i += 1) {
    const t = (i / count) * Math.PI * 4
    const arm = Math.floor(Math.random() * 3)
    const spiral = t + (arm * Math.PI * 2) / 3
    const radius = 4 + (i / count) * 22 + (Math.random() - 0.5) * 1.8
    const height = (Math.random() - 0.5) * 1.4

    positions[i * 3] = Math.cos(spiral) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(spiral) * radius

    const color = Math.random() > 0.5 ? warm : cool
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const galaxy = new THREE.Points(geometry, material)
  galaxy.rotation.x = Math.PI * 0.42
  return galaxy
}

function createDestinyWheel() {
  const wheel = new THREE.Group()
  const goldMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.55,
  })
  const softGoldMat = new THREE.MeshBasicMaterial({
    color: 0xf0d78c,
    transparent: true,
    opacity: 0.35,
  })

  const outer = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.05, 12, 96), goldMat)
  const inner = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.035, 10, 72), softGoldMat)
  wheel.add(outer, inner)

  const spokeCount = 12
  for (let i = 0; i < spokeCount; i += 1) {
    const angle = (i / spokeCount) * Math.PI * 2
    const spoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 2.7, 6),
      softGoldMat,
    )
    spoke.position.set(Math.cos(angle) * 3.8, Math.sin(angle) * 3.8, 0)
    spoke.rotation.z = angle + Math.PI / 2
    wheel.add(spoke)

    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), goldMat)
    bead.position.set(Math.cos(angle) * 5.2, Math.sin(angle) * 5.2, 0)
    wheel.add(bead)
  }

  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), goldMat)
  wheel.add(hub)

  wheel.rotation.x = -0.55
  wheel.position.set(0, 0.4, -2)
  return wheel
}

function CosmicBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120,
    )
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const stars = createStarField(2200)
    const milkyWay = createMilkyWay()
    const wheel = createDestinyWheel()
    scene.add(stars, milkyWay, wheel)

    const ambient = new THREE.AmbientLight(0x6a4a9a, 0.6)
    scene.add(ambient)

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      stars.rotation.y = elapsed * 0.015
      stars.rotation.x = Math.sin(elapsed * 0.05) * 0.04
      milkyWay.rotation.z = elapsed * 0.04
      wheel.rotation.z = elapsed * 0.18
      wheel.position.y = 0.4 + Math.sin(elapsed * 0.35) * 0.15
      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="cosmic-background" aria-hidden="true" />
}

export default CosmicBackground
