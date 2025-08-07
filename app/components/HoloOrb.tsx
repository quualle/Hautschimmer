"use client";

import { Canvas } from "@react-three/fiber";
import { Float, PresentationControls } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

export default function HoloOrb() {
  return (
    <div className="relative h-[70vh]">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }}>
        <color attach="background" args={["#0b0b0d"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1.1} />
        <PresentationControls global rotation={[0, 0, 0]} azimuth={[-0.4, 0.4]} polar={[-0.2, 0.2]}>
          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
            <mesh>
              <icosahedronGeometry args={[1, 3]} />
              <meshStandardMaterial metalness={0.9} roughness={0.15} color="#d2b48c" />
            </mesh>
          </Float>
        </PresentationControls>
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.2} />
          <Noise opacity={0.06} />
          <Vignette darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}


