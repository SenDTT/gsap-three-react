import { ContactShadows, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import gsap from "gsap";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Character() {
    const { scene, animations } = useGLTF('/models/humanoid_robot.glb');
    const mixer = useRef(null);
    const actionRef = useRef(null);
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

    const LOOP_START = 0.9;

    useEffect(() => {
        if (!animations || !animations.length) {
            console.warn("No animations found in the GLTF model.");
            return;
        }

        if (mixer.current) return;

        mixer.current = new THREE.AnimationMixer(scene);
        const clip = animations[0].clone(); // clone the clip to avoid modifying the original
        
        clip.tracks.forEach(track => {
            track.times = track.times.map(t => t - LOOP_START);
        }); // remove last ~150ms to prevent looping glitch

        clip.resetDuration(); // recalculates duration tightly based on keyframes, should be around 3.5s now
        const action = mixer.current.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);

        // action.time = LOOP_START; // start a bit into the animation to avoid the initial pose

        action.clampWhenFinished = false;
        action.zeroSlopeAtEnd = false;
        action.zeroSlopeAtStart = false;
        action.play();

        actionRef.current = action;

        console.log("Animation started:", clip.name);
    }, [animations, scene]);
    
    useFrame((state, delta) => {
        if (!mixer.current || !actionRef.current) return;

        const action = actionRef.current;
        const clip = action.getClip();

        // find the good loop boundary
        const LOOP_END = clip.duration - 0.096; // adjust this number

        if (action.time >= LOOP_END) {
            action.time = 0.0001;
        }

        mixer.current.update(delta);
    });

    return (
        <Suspense fallback={null}>
            <primitive ref={ref} object={scene} position={[0, -0.45, 1]} scale={0.7} rotation={[0, Math.PI * 2.5, 0]} />

                <ContactShadows 
                    position={[0, -0.4, 0.05]}
                    resolution={256}
                    scale={10}
                />
        </Suspense>
    );
}