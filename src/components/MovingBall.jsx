import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";

export default function MovingBall() {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.position.x = Math.sin(clock.elapsedTime) * 3;
  });

  return (
    <Trail width={0.3} length={8} color="cyan">
      <mesh ref={ref}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </Trail>
  );
}
