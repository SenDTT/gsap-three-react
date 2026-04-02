import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef as useThreeRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { label: "Section One",   desc: "Scroll down to explore" },
  { label: "Section Two",   desc: "The scene changes with you" },
  { label: "Section Three", desc: "Keep going..." },
  { label: "Section Four",  desc: "Almost there" },
];

const BG_COLORS = ["#b3b3f5", "#a8d8b9", "#f5b3b3", "#c4b8f5"];
const colorInterpolator = gsap.utils.interpolate(BG_COLORS);

function SceneObject({ scrollRef }) {
  const meshRef = useThreeRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !meshRef.current) return;

    const mesh = meshRef.current;

    // scale up per section
    SECTIONS.forEach((_, i) => {
      ScrollTrigger.create({
        scroller: el,
        trigger: el.querySelectorAll(".section")[i],
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(mesh.scale, { x: 1 + i * 0.4, y: 1 + i * 0.4, z: 1 + i * 0.4, duration: 0.8, ease: "power2.out" }),
        onEnterBack: () => gsap.to(mesh.scale, { x: 1 + i * 0.4, y: 1 + i * 0.4, z: 1 + i * 0.4, duration: 0.8, ease: "power2.out" }),
      });
    });

    // move mesh on scroll
    ScrollTrigger.create({
      scroller: el,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.to(mesh.position, {
          x: (self.progress - 0.5) * 4,
          duration: 0.4,
          ease: "power1.out",
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [scrollRef]);

  return null;
}

export default function WebsiteView() {
  const scrollRef = useRef();
  const bgRef = useRef();
  const sectionRefs = useRef([]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const bgTrigger = ScrollTrigger.create({
      scroller: el,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bgRef.current.style.backgroundColor = colorInterpolator(self.progress);
      },
    });

    const textTriggers = sectionRefs.current.map((section, i) => {
      const fromRight = i % 2 !== 0;
      const textEls = section.querySelectorAll("h2, p");

      gsap.set(textEls, { x: fromRight ? 100 : -100, opacity: 0 });

      return ScrollTrigger.create({
        scroller: el,
        trigger: section,
        start: "top 75%",
        onEnter: () => gsap.to(textEls, { x: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.1 }),
        onLeaveBack: () => gsap.to(textEls, { x: fromRight ? 100 : -100, opacity: 0, duration: 1, ease: "power2.in" }),
      });
    });

    return () => {
      bgTrigger.kill();
      textTriggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ height: "100%", overflowY: "scroll" }} className="website-scroll">

      {/* sticky 3D canvas */}
      <div ref={bgRef} style={{ position: "sticky", top: 0, height: "100%", backgroundColor: BG_COLORS[0], transition: "none", zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5] }} style={{ height: "100%" }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} color="#ff6b00" intensity={1} />
          <SceneObject scrollRef={scrollRef} />
        </Canvas>
      </div>

      {/* scroll sections — sit on top of the sticky canvas */}
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
        {SECTIONS.map((s, i) => (
          <div
            key={i}
            className="section"
            ref={(el) => (sectionRefs.current[i] = el)}
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: i % 2 === 0 ? "flex-start" : "flex-end",
              padding: "0 8vw",
            }}
          >
            <h2 style={{ color: "#4e3131", fontSize: "3rem", margin: 0, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{s.label}</h2>
            <p style={{ color: "#736c6c", fontSize: "1.2rem", marginTop: "0.5rem", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
