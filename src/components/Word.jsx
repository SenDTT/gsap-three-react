import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export default function Word({ children, ...props }) {
  const color = new THREE.Color()
  const fontProps = { font: '/fonts/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame(() => {
    ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
  })
  return (
    <Billboard {...props}>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log('clicked')} {...fontProps} children={children} />
    </Billboard>
  )
}