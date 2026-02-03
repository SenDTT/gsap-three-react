import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"

export default function Torusknot(props) {
  const ref = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta / 2))
  return (
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <torusKnotGeometry args={[1, 0.2, 123, 29]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}