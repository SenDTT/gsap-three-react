import { ContactShadows, Edges, GradientTexture, Grid, MeshWobbleMaterial, OrbitControls, PerspectiveCamera, PositionalAudio, ScreenSizer, ScreenSpace, Shadow, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Character from "../../components/Character";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Background from "../../components/Background";

export default function StudioView() {
    const cameraRef = useRef();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "1") {
                gsap.to(cameraRef.current.position, {
                    x: 2.5,
                    y: 2,
                    z: 5,
                    duration: 4,
                    ease: "power2.inOut"
                });
            }

            if (e.key === "2") {
                gsap.to(cameraRef.current.position, {
                    x: -1.5,
                    y: 0.3,
                    z: 4,
                    duration: 4,
                    ease: "power2.inOut"
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <Canvas style={{height: "78vh"}} shadows>
            {/* <SoftShadows opacity={0.5} size={30} samples={20} /> */}

            <color attach="background" args={['#252424']} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 0, -30]} intensity={1}/>

            {/* <light position={[0, 10, 0]} intensity={1} castShadow /> */}

            <group position={[0, 1.35, 0]} rotation={[0, Math.PI, 0]}>
                <mesh>
                    <boxGeometry args={[20, 3.5, 0]} />
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

                    {/* <Edges
                        renderOrder={100}
                        linewidth={4}
                        scale={1}
                        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
                        color="white"
                    /> */}
                </mesh>

                <Background />
            </group>

            <mesh receiveShadow position={[0, -0.5, 2]}>
                <boxGeometry args={[20, 0.1, 10]} />
                <meshStandardMaterial color="#b5b5b5" />
            </mesh>
            
            <group castShadow>
                <spotLight position={[0, 7, 10]} angle={0.2} intensity={100} />
                <Character position={[0, -0.45, 2]} />

                {/* <Shadow opacity={0.9} color="#323232" colorStop={0} position={[0, -0.4, 1]}  rotation={[-Math.PI / 2, 0, 2]} /> */}

                {/* audio, the sound will be played louder when the camera is near. */}
                {/* <PositionalAudio url="/audios/example_audio.mp3" distance={1} loop autoplay /> */}
            </group>

            <PerspectiveCamera ref={cameraRef} makeDefault position={[-1.5, 1.5, 5]} fov={80} />

            {/* <PerspectiveCamera ref={cameraRef} position={[1.5, 1.5, 5]} fov={80} /> */}

            {/* <mesh position={[2, 0.5, 4]} rotation={[0, 0, 2]}>
                <boxGeometry />
                <MeshWobbleMaterial factor={3} speed={1} />
            </mesh> */}

            <OrbitControls />
        </Canvas>
    )
}