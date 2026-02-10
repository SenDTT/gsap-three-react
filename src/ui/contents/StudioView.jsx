import { MeshWobbleMaterial, OrbitControls, PositionalAudio, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Character from "../../components/Character";

export default function StudioView() {
    return (
        <Canvas style={{height: "80vh"}} camera={{ position: [-4, 2, 6], fov: 80 }} shadows>
            <SoftShadows opacity={0.5} size={30} samples={20} />

            <color attach="background" args={['#252424']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, -30]} intensity={1}/>

            <mesh position={[0, 1.25, 0]}>
                <boxGeometry args={[8, 3.5, 0]} />
                <meshStandardMaterial color="#487c52" />
            </mesh>

            <mesh receiveShadow position={[0, -0.5, 2]}>
                <boxGeometry args={[10, 0.1, 10]} />
                <meshStandardMaterial color="#a9e4a8" />
            </mesh>

            <group castShadow>
                <Character />

                {/* audio, the sound will be played louder when the camera is near. */}
                {/* <PositionalAudio url="/audios/example_audio.mp3" distance={1} loop autoplay /> */}
            </group>

            <mesh position={[2, 0.5, 4]} rotation={[0, 0, 2]}>
                <boxGeometry />
                <MeshWobbleMaterial factor={3} speed={1} />
            </mesh>

            <OrbitControls />
        </Canvas>
    )
}