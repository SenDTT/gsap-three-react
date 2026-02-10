import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import gsap from "gsap";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Character() {
    const { scene, animations } = useGLTF('/models/humanoid_robot.glb');
    const mixer = useRef(null);
    const ref = useRef();

    // useEffect(() => {
    //     if (!scene) {
    //         console.warn("GLTF model not loaded.");
    //     }

    //     if (ref.current) {
    //         gsap.fromTo(ref.current.position, { x: -3 }, {
    //             x: Math.PI * 1,
    //             duration: 7,
    //             repeat: -1,
    //             ease: "linear",
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if (!animations || !animations.length) {
            console.warn("No animations found in the GLTF model.");
            return;
        }

        if (mixer.current) return;

        mixer.current = new THREE.AnimationMixer(scene);
        const clip = animations[0];
        clip.resetDuration(); // recalculates duration tightly
        // clip.trim(0, clip.duration - 0.15); // remove last ~150ms to prevent looping glitch

        const action = mixer.current.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);

        action.time = 0.0001;

        action.clampWhenFinished = false;
        action.zeroSlopeAtEnd = false;
        action.zeroSlopeAtStart = false;
        action.play();

        console.log("Animation started:", clip.name);

        // mixer.current.update(0.001);

        return () => {
            if (mixer.current) {
                mixer.current.stopAllAction();
                mixer.current = null;
            }
        };
    }, [animations, scene]);
    
    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    return (
        <Suspense fallback={null}>
            <primitive ref={ref} object={scene} position={[0, -0.45, 1]} scale={0.7} rotation={[0, Math.PI * 2.5, 0]} />
        </Suspense>
    );
}