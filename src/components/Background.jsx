import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Tree from "./Tree";

export default function Background() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.position.x -= delta * 1.5;

    if (groupRef.current.position.x < -30) {
      groupRef.current.position.x = 30;
    }
  });

  return (
    <group ref={groupRef}>
      <Tree position={[0, -2, -0.2]} />
      {/* <House position={[8, 0, -10]} />
      <CoffeeShop position={[16, 0, -10]} /> */}
      <Tree position={[7, -2, -0.2]} />
    </group>
  );
}
