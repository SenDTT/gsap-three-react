import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Character() {
    const { scene, animations } = useGLTF('/models/humanoid_robot.glb');
    const mixer = useRef(null);

    useEffect(() => {
        if (!animations || !animations.length) {
            console.warn("No animations found in the GLTF model.");
            return;
        }

        mixer.current = new THREE.AnimationMixer(scene);
        const action = mixer.current.clipAction(animations[0]);
        action.play();

        console.log("Animation started:", animations[0].name);

        return () => {
            if (mixer.current) {
                mixer.current.stopAllAction();
                mixer.current = null;
            }
        };
    }, [animations, scene]);
    
    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    return (
        <primitive object={scene} position={[0, -0.48, 1]} scale={0.7} rotation={[0, Math.PI * 2.5, 0]} />
    );
}