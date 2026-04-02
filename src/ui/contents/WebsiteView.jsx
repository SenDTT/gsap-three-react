import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef as useThreeRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    label:	"Section One",
    desc:	"Scroll down to explore",
    img:	"https://picsum.photos/seed/s1/400/300",
  },
  {
    label:	"Section Two",
    desc:	"The scene changes with you",
    img:	"https://picsum.photos/seed/s2/400/300",
  },
  {
    label:	"Section Three",
    desc:	"Keep going...",
    img:	"https://picsum.photos/seed/s3/400/300",
  },
  {
    label:	"Section Four",
    desc:	"Almost there",
    img:	"https://picsum.photos/seed/s4/400/300",
  },
];

const BG_COLORS = ["#b3b3f5", "#a8d8b9", "#f5b3b3", "#c4b8f5"];
const colorInterpolator = gsap.utils.interpolate(BG_COLORS);

function SceneObject({ scrollRef }) {
  const meshRef = useThreeRef();

  const calDemensions = (i) => 1 + i * 0.4;

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
        onEnter: () => gsap.to(mesh.scale, { x: calDemensions(i), y: calDemensions(i), z: calDemensions(i), duration: 0.8, ease: "power2.out" }),
        onEnterBack: () => gsap.to(mesh.scale, { x: calDemensions(i), y: calDemensions(i), z: calDemensions(i), duration: 0.8, ease: "power2.out" }),
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
      const textEls = section.querySelectorAll("h2, p, img");

      gsap.set(textEls, { x: fromRight ? 100 : -100, opacity: 0 });

      return ScrollTrigger.create({
        scroller: el,
        trigger: section,
        start: "top 75%",
        onEnter: () => gsap.to(textEls, { x: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.3 }),
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
      <div ref={bgRef} className="website-canvas-bg" style={{ backgroundColor: BG_COLORS[0] }}>
        <Canvas camera={{ position: [0, 0, 5] }} style={{ height: "100%" }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} color="#ff6b00" intensity={1} />
          <SceneObject scrollRef={scrollRef} />
        </Canvas>
      </div>

      {/* scroll sections — sit on top of the sticky canvas */}
      <div className="website-sections">
        {SECTIONS.map((s, i) => (
          <div
            key={i}
            className="section"
            ref={(el) => (sectionRefs.current[i] = el)}
            style={{ flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}
          >
            <div className="section-text" style={{ alignItems: i % 2 === 0 ? "flex-start" : "flex-end" }}>
              <h2>{s.label}</h2>
              <p>{s.desc}</p>
            </div>
            <img className="section-img" src={s.img} alt={s.label} />
          </div>
        ))}
      </div>
    </div>
  );
}
