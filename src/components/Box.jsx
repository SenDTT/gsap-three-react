import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function Box() {
  const mesh = useRef()

  useEffect(() => {
    gsap.to(mesh.current.rotation, {
      y: Math.PI * 2,
      duration: 2,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  return (
    <mesh ref={mesh}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
