import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Character from "../../components/Character";

export default function StudioView() {
    return (
        <Canvas style={{height: "80vh"}} camera={{ position: [-4, 2, 6], fov: 70 }}>
            <color attach="background" args={['#0e0e0e']} />
            <ambientLight intensity={2} />
            <directionalLight position={[5, 10, 5]} intensity={1} />

            <mesh position={[0, 1.25, 0]}>
                <boxGeometry args={[6, 3.5, 0]} />
                <meshStandardMaterial color="#487c52" />
            </mesh>

            <mesh position={[0, -0.5, 2]}>
                <boxGeometry args={[6, 0, 4]} />
                <meshStandardMaterial color="#80da7f" />
            </mesh>

            <Suspense fallback={null}>
                <Character />
            </Suspense>

            <OrbitControls />
        </Canvas>
    )
}