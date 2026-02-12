import { GradientTexture, MeshWobbleMaterial, OrbitControls, PositionalAudio, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Character from "../../components/Character";

export default function StudioView() {
    return (
        <Canvas style={{height: "80vh"}} camera={{ position: [-0.5, 0.5, 5], fov: 80 }} shadows>
            <SoftShadows opacity={0.5} size={30} samples={20} />

            <color attach="background" args={['#252424']} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 0, -30]} intensity={1}/>

            {/* <light position={[0, 10, 0]} intensity={1} castShadow /> */}

            <group position={[0, 1.25, 0]} rotation={[0, Math.PI, 0]}>
                <mesh>
                    <boxGeometry args={[8, 3.5, 0]} />
                    <meshStandardMaterial color="#92fca8" />
                    {/* <meshStandardMaterial color="#487c52" /> */}

                    {/* <planeGeometry args={[5, 3]} /> */}
                    {/* <meshBasicMaterial>
                        <GradientTexture
                            stops={[0, 1]} // As many stops as you want
                            colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
                            size={1024} // Size is optional, default = 1024
                        />
                    </meshBasicMaterial> */}
                </mesh>
            </group>

            <mesh receiveShadow position={[0, -0.5, 2]}>
                <boxGeometry args={[10, 0.1, 10]} />
                <meshStandardMaterial color="#b5b5b5" />
            </mesh>
            
            <group castShadow>
                <spotLight position={[0, 7, 10]} angle={0.2} intensity={100} />
                <Character />

                {/* audio, the sound will be played louder when the camera is near. */}
                {/* <PositionalAudio url="/audios/example_audio.mp3" distance={1} loop autoplay /> */}
            </group>

            {/* <mesh position={[2, 0.5, 4]} rotation={[0, 0, 2]}>
                <boxGeometry />
                <MeshWobbleMaterial factor={3} speed={1} />
            </mesh> */}

            <OrbitControls />
        </Canvas>
    )
}