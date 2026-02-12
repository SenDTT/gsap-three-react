export default function Tree({ position }) {
  return (
    <group position={position}>
      {/* trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2]} />
        <meshStandardMaterial color="#5c3d1e" />
      </mesh>

      {/* leaves */}
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#2f8f2f" />
      </mesh>
    </group>
  );
}
