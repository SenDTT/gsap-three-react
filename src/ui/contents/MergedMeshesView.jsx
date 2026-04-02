import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Merged, OrbitControls, ContactShadows, Environment } from "@react-three/drei";

const boxMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: "white", roughness: 0.3, metalness: 0.4 })
);

const COLOR_PAIRS = [
  ["#ff6b00", "#00e5ff"],
  ["#ff2d78", "#2dff9b"],
  ["#a855f7", "#facc15"],
  ["#ef4444", "#3b82f6"],
  ["#f97316", "#8b5cf6"],
];

const [colorA, colorB] = COLOR_PAIRS[Math.floor(Math.random() * COLOR_PAIRS.length)];
const COLORS = [new THREE.Color(colorA), new THREE.Color(colorB)];

const instances = Array.from({ length: 100 }, () => ({
  position: [
    (Math.random() - 0.5) * 30,
    Math.random() * 8 + 2,
    (Math.random() - 0.5) * 30,
  ],
  scale: 0.5 + Math.random() * 1.5,
  color: COLORS[Math.floor(Math.random() * 2)],
}));

export default function MergeMeshesView() {
  return (
    <Canvas shadows style={{ height: "100%" }} camera={{ position: [18, 14, 18], fov: 50 }}>
      <color attach="background" args={["#111"]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <Environment preset="city" />
      <Merged meshes={{ box: boxMesh }}>
        {({ box: MergedBox }) => instances.map(({ position, scale, color }, i) => (
          <MergedBox key={i} position={position} scale={scale} color={color} castShadow />
        ))}
      </Merged>
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#222" roughness={1} />
      </mesh> */}
      <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={40} blur={2} far={10} />
      <OrbitControls />
    </Canvas>
  );
}