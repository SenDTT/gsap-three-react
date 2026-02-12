export default function House({ position }) {
  return (
    <group position={position}>
      {/* body */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#e6b87d" />
      </mesh>

      {/* roof */}
      <mesh position={[0, 2.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[1.7, 1.2, 4]} />
        <meshStandardMaterial color="#b33b3b" />
      </mesh>
    </group>
  );
}
