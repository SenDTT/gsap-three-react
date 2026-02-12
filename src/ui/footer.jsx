import { Center, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { generate } from "random-words";

export default function Footer() {
    const randomWord = generate();
    return (
        <Canvas style={{ background: '#222', height: '10vh' }} camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[-5, 4, 10]} />
            <directionalLight position={[5, 4, 10]} />

            <Center top>
                <Text 
                    color='#e2dfdf' fontSize={0.6} 
                    font={'/fonts/PlaywriteNZBasic-VariableFont_wght.ttf'} 
                    onClick={() => window.open("https://github.com/SenDTT", "_blank")}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "default")}
                >
                    © 2026 by SenDTT - {randomWord}
                </Text>
            </Center>
            <Center bottom>
                <Text
                    color='#e2dfdf' fontSize={0.4} 
                    font={'/fonts/PlaywriteNZBasic-VariableFont_wght.ttf'} 
                >Press 1 or 2 to switch camera</Text>
            </Center>
        </Canvas>
    )
}