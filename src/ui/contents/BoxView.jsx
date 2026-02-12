import { Canvas } from "@react-three/fiber";
import Box from "../../components/Box";
import { OrbitControls } from "@react-three/drei";

export default function BoxView() {
    return (
        <Canvas
            style={{ background: '#111', height: '78vh' }}
            camera={{ position: [3, 4, 5] }}
            >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
    
            <Box />
    
            <OrbitControls />
        </Canvas>
    )
}