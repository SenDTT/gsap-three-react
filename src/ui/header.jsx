import { Center, Text3D } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function Header() {
    const headerRef = useRef()

    useEffect(() => {
        if (!headerRef.current) return

        gsap.fromTo(headerRef, {opacity: 0, duration: 0}, {
            opacity: 1,
            duration: 1000,
        });
    }, [])
    
    return (
        <Canvas style={{ background: 'rgb(9, 44, 79)', height: '12vh' }} camera={{ position: [0, 0, 2], fov: 75 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[-5, 4, 10]} />
            <directionalLight position={[5, 4, 10]} />

            <Center>
                <Text3D bevelThickness={0.01} bevelEnabled bevelSegments={1} height={0.05} ref={headerRef} font={'/fonts/Playwrite NZ Basic_Regular.json'}>
                    GSAP + Three.js + React
                    <meshStandardMaterial color="rgb(255, 0, 81, 0.5)" />
                </Text3D>
            </Center>
        </Canvas>
    )
}