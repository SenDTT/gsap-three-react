export default function CoffeeShop({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 2, 2]} />
        <meshStandardMaterial color="#d9c29c" />
      </mesh>

      {/* sign */}
      <mesh position={[0, 2.2, 1.1]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#5a3e36" />
      </mesh>
    </group>
  );
}
