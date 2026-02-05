import { Canvas } from "@react-three/fiber";
import { generate } from "random-words";
import Torusknot from "../../components/Torusknot";
import { AsciiRenderer, OrbitControls } from "@react-three/drei";

export default function TorusknotView() {
    const randChar = generate({maxLength: 1});
    return (
        <Canvas
            style={{ background: '#111', height: '80vh' }}
            camera={{ position: [3, 4, 5] }}
            >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
    
            <color attach="background" args={['#000']} />
            <Torusknot />
            <AsciiRenderer bgColor='transparent' characters={randChar} color='#fff'/>
    
            <OrbitControls />
        </Canvas>
    )
}