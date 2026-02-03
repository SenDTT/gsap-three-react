import { Canvas } from '@react-three/fiber'
import { AsciiRenderer, OrbitControls } from '@react-three/drei'
import Header from './ui/header.jsx'
import Footer from './ui/footer.jsx'
import Torusknot from './components/Torusknot.jsx'

export default function App() {
  return (
    <>
      <Header />

      <Canvas
        style={{ background: '#111', height: '80vh' }}
        camera={{ position: [3, 4, 5] }}
      >
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Torusknot />

        <AsciiRenderer bgColor='transparent' />

        <OrbitControls />
      </Canvas>

      <Footer />
    </>
  )
}
