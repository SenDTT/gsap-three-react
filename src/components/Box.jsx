import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Box() {
  const mesh = useRef()

  useEffect(() => {
    const tween = gsap.to(mesh.current.rotation, {
      y: Math.PI * 2,
      z: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'linear',
    })

    return () => tween.kill()
  }, [])

  return (
    <mesh ref={mesh}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
