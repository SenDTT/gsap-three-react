import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Header from './ui/header.jsx'
import Box from './components/Box.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Canvas
        style={{ background: '#111', height: '88vh' }}
        camera={{ position: [3, 4, 5] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Box />

        <OrbitControls />
      </Canvas>
    </>
  )
}
