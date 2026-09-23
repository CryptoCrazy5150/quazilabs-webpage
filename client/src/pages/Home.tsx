import { useEffect, useRef, useState } from "react";

// Manus serves the logo from its storage proxy; static builds (GitHub Pages) set VITE_LOGO_SRC.
const LOGO_SRC = import.meta.env.VITE_LOGO_SRC || "/manus-storage/quazi-logo-v3_adf1770d.png";
const hideBrokenImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

// ─── Geometric Circles Canvas (matches reference: large semi-transparent circles, tech line overlays) ──
function GeometricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Large floating circles — semi-transparent, neon green tones
    const circles = [
      { x: 0.15, y: 0.3, r: 0.22, speed: 0.00018, phase: 0, color: "rgba(0,255,159,0.07)" },
      { x: 0.75, y: 0.2, r: 0.18, speed: 0.00022, phase: 1.2, color: "rgba(0,220,140,0.05)" },
      { x: 0.55, y: 0.65, r: 0.28, speed: 0.00015, phase: 2.4, color: "rgba(0,255,159,0.04)" },
      { x: 0.85, y: 0.7, r: 0.14, speed: 0.00025, phase: 0.8, color: "rgba(0,180,120,0.06)" },
      { x: 0.3, y: 0.75, r: 0.16, speed: 0.0002, phase: 3.1, color: "rgba(0,255,159,0.05)" },
      { x: 0.65, y: 0.1, r: 0.12, speed: 0.00028, phase: 1.8, color: "rgba(0,240,160,0.06)" },
      { x: 0.1, y: 0.8, r: 0.10, speed: 0.00032, phase: 4.2, color: "rgba(0,255,159,0.04)" },
    ];

    // Tech data points for line overlays
    const dataPoints = Array.from({ length: 12 }, (_, i) => ({
      x: 0.1 + (i / 11) * 0.8,
      y: 0.3 + Math.sin(i * 0.9) * 0.15 + Math.random() * 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      const W = canvas.width;
      const H = canvas.height;

      // Draw large geometric circles
      circles.forEach((c) => {
        const ox = Math.sin(t * c.speed + c.phase) * 30;
        const oy = Math.cos(t * c.speed * 0.7 + c.phase) * 20;
        const cx = c.x * W + ox;
        const cy = c.y * H + oy;
        const r = c.r * Math.min(W, H);

        // Outer glow ring
        const grad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r);
        grad.addColorStop(0, c.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Crisp circle border
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = c.color.replace("0.0", "0.15").replace("0.07", "0.18");
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Tech line overlay — horizontal data flow line
      const lineY = H * 0.5 + Math.sin(t * 0.0008) * H * 0.05;
      ctx.beginPath();
      ctx.moveTo(W * 0.05, lineY);
      dataPoints.forEach((p, i) => {
        const px = p.x * W;
        const py = lineY + (p.y - 0.5) * H * 0.3 + Math.sin(t * 0.001 + i) * 8;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "rgba(0,255,159,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Small data nodes on the line
      dataPoints.forEach((p, i) => {
        const px = p.x * W;
        const py = lineY + (p.y - 0.5) * H * 0.3 + Math.sin(t * 0.001 + i) * 8;
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.015 + i * 0.8);
        ctx.beginPath();
        ctx.arc(px, py, 2 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,159,${0.3 + pulse * 0.4})`;
        ctx.fill();
      });

      // Horizontal scan line
      const scanY = ((t * 0.15) % (H + 100)) - 50;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, "rgba(0,255,159,0)");
      scanGrad.addColorStop(0.5, "rgba(0,255,159,0.04)");
      scanGrad.addColorStop(1, "rgba(0,255,159,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, W, 60);

      // Corner bracket accents
      const bSize = 30;
      const bPad = 40;
      ctx.strokeStyle = "rgba(0,255,159,0.2)";
      ctx.lineWidth = 1.5;
      // TL
      ctx.beginPath(); ctx.moveTo(bPad, bPad + bSize); ctx.lineTo(bPad, bPad); ctx.lineTo(bPad + bSize, bPad); ctx.stroke();
      // TR
      ctx.beginPath(); ctx.moveTo(W - bPad - bSize, bPad); ctx.lineTo(W - bPad, bPad); ctx.lineTo(W - bPad, bPad + bSize); ctx.stroke();
      // BL
      ctx.beginPath(); ctx.moveTo(bPad, H - bPad - bSize); ctx.lineTo(bPad, H - bPad); ctx.lineTo(bPad + bSize, H - bPad); ctx.stroke();
      // BR
      ctx.beginPath(); ctx.moveTo(W - bPad - bSize, H - bPad); ctx.lineTo(W - bPad, H - bPad); ctx.lineTo(W - bPad, H - bPad - bSize); ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} id="particle-canvas" />;
}

// ─── SVG Tech Visuals ──────────────────────────────────────────────────────────
function SvgBarChart({ color = "#00FF9F" }: { color?: string }) {
  const bars = [65, 80, 45, 90, 70, 55, 85, 60];
  return (
    <svg viewBox="0 0 80 48" className="w-full h-full" fill="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 10 + 1}
          y={48 - h * 0.42}
          width={7}
          height={h * 0.42}
          fill={color}
          opacity={0.15 + i * 0.05}
          rx={1}
        />
      ))}
      <line x1="0" y1="47" x2="80" y2="47" stroke={color} strokeOpacity="0.3" strokeWidth="0.5" />
    </svg>
  );
}

function SvgSemicircle({ color = "#00FF9F", pct = 78 }: { color?: string; pct?: number }) {
  const r = 28;
  const cx = 40;
  const cy = 40;
  const circ = Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 80 44" className="w-full h-full" fill="none">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke={color} strokeOpacity="0.15" strokeWidth="6" />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke={color}
        strokeOpacity="0.7"
        strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <text x={cx} y={cy - 6} textAnchor="middle" fill={color} fontSize="10" fontFamily="JetBrains Mono" opacity="0.9">{pct}%</text>
    </svg>
  );
}

function SvgLineChart({ color = "#00FF9F" }: { color?: string }) {
  const pts = [38, 22, 30, 15, 25, 10, 18, 8, 12, 5];
  const path = pts.map((y, i) => `${i === 0 ? "M" : "L"} ${i * 9} ${y}`).join(" ");
  const area = path + ` L ${(pts.length - 1) * 9} 40 L 0 40 Z`;
  return (
    <svg viewBox="0 0 81 42" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lg1)" />
      <path d={path} stroke={color} strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((y, i) => (
        <circle key={i} cx={i * 9} cy={y} r="1.5" fill={color} opacity="0.6" />
      ))}
    </svg>
  );
}

function SvgRadar({ color = "#00FF9F" }: { color?: string }) {
  const n = 6;
  const cx = 40; const cy = 38; const r = 28;
  const pts = [0.9, 0.75, 0.85, 0.6, 0.95, 0.7];
  const poly = pts.map((v, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return `${cx + Math.cos(a) * r * v},${cy + Math.sin(a) * r * v}`;
  }).join(" ");
  const grid = [0.33, 0.66, 1].map((s) =>
    pts.map((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`;
    }).join(" ")
  );
  return (
    <svg viewBox="0 0 80 76" className="w-full h-full" fill="none">
      {grid.map((g, i) => <polygon key={i} points={g} stroke={color} strokeOpacity="0.12" strokeWidth="0.5" fill="none" />)}
      {pts.map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />;
      })}
      <polygon points={poly} fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.7" strokeWidth="1.2" />
    </svg>
  );
}

function SvgBulletList({ color = "#00FF9F", items }: { color?: string; items: string[] }) {
  return (
    <div className="space-y-2 w-full">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <svg viewBox="0 0 10 10" className="w-3 h-3 mt-0.5 flex-shrink-0">
            <polygon points="0,5 4,0 10,5 4,10" fill={color} opacity="0.7" />
          </svg>
          <span className="text-xs leading-tight" style={{ color: "#7abf9a", fontFamily: "'JetBrains Mono', monospace" }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Scroll Reveal ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
  }, [displayed, deleting, idx, texts]);
  return (
    <span className="neon-green font-mono">
      {displayed}
      <span className="animate-[blink_1s_step-end_infinite] inline-block w-[2px] h-[1em] bg-[#00FF9F] ml-0.5 align-middle" />
    </span>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,159,0.12)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo — larger, prominent */}
        <div className="flex items-center gap-4">
          <img
            src={LOGO_SRC}
            onError={hideBrokenImage}
            alt="Quazi Labs"
            className="h-14 w-14 object-contain"
            style={{ filter: "drop-shadow(0 0 12px #00FF9F70)" }}
          />
          <span
            className="text-2xl font-bold tracking-wider"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e8f5f0" }}
          >
            QUAZI<span className="neon-green"> LABS</span>
          </span>
        </div>
        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Platform", "Use Cases", "Pain Points", "Partnerships"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium text-gray-400 hover:text-[#00FF9F] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}
            >
              {item}
            </a>
          ))}
        </div>
        {/* CTA */}
        <a
          href="#partnerships"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-sm transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid #00FF9F60",
            color: "#00FF9F",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.08em",
            boxShadow: "0 0 15px #00FF9F20",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#00FF9F15";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px #00FF9F40";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px #00FF9F20";
          }}
        >
          INQUIRE
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanline"
      style={{ background: "#080808" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,255,159,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="container relative z-10 text-center pt-24 pb-16">
        <div
          className="inline-block text-xs font-mono tracking-widest px-4 py-1.5 mb-8 rounded-sm"
          style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.25)", color: "#00FF9F" }}
        >
          ● PILOT PARTNERSHIPS &amp; STRATEGIC ACQUISITION — INQUIRIES OPEN
        </div>
        <h1
          className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0faf5" }}
        >
          Make every parameter count.
          <br />
          <span className="gradient-text">Without replacing the infrastructure.</span>
        </h1>
        <p
          className="text-lg md:text-xl mb-4 max-w-2xl mx-auto"
          style={{ color: "#8ab8a0", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Precision-adaptive encoding for enterprise AI —
          <span className="font-mono" style={{ color: "#00FF9F", textShadow: "0 0 15px #00FF9F60" }}>
            <Typewriter texts={["no weights destroyed.", "CPU-only at every stage.", "every run anchored.", "fidelity cost disclosed."]} />
          </span>
        </p>
        <p
          className="text-base mb-12 max-w-xl mx-auto"
          style={{ color: "#5a8a70" }}
        >
          A verified flagship result: 91.35% compression, 98.08% capability retention, and 2.77 bits per weight. Every run logged, SHA-256 hashed, and anchored to the Bitcoin blockchain.
        </p>

        {/* Metrics row — outcome-oriented */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {[
            { value: "91.35%", label: "Compression · QR-0007" },
            { value: "98.08%", label: "Capability Retention" },
            { value: "2.77", label: "Bits Per Weight" },
            { value: "CPU-Only", label: "Every Stage" },
          ].map((m) => (
            <div
              key={m.value}
              className="glass-card rounded-sm px-4 py-4 text-center"
              style={{ border: "1px solid rgba(0,255,159,0.15)" }}
            >
              <div
                className="text-xl md:text-2xl font-bold font-mono mb-1"
                style={{ color: "#00FF9F", textShadow: "0 0 15px #00FF9F50" }}
              >
                {m.value}
              </div>
              <div className="text-xs tracking-widest" style={{ color: "#4a7a5a" }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#partnerships"
            className="px-8 py-3.5 font-semibold text-sm tracking-widest rounded-sm transition-all duration-200"
            style={{
              background: "rgba(0,255,159,0.12)",
              border: "1px solid rgba(0,255,159,0.5)",
              color: "#00FF9F",
              boxShadow: "0 0 25px rgba(0,255,159,0.2)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,159,0.35)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(0,255,159,0.2)"; }}
          >
            EXPLORE PILOT PARTNERSHIP
          </a>
          <a
            href="#platform"
            className="px-8 py-3.5 font-semibold text-sm tracking-widest rounded-sm transition-all duration-200"
            style={{
              background: "transparent",
              border: "1px solid rgba(0,255,159,0.2)",
              color: "#7abf9a",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.4)"; (e.currentTarget as HTMLElement).style.color = "#00FF9F"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.2)"; (e.currentTarget as HTMLElement).style.color = "#7abf9a"; }}
          >
            LEARN THE PLATFORM ↓
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Pain Points ───────────────────────────────────────────────────────────────
function PainPoints() {
  const painPoints = [
    {
      visual: <SvgLineChart color="#00FF9F" />,
      problem: "Capable Models Are Difficult to Deploy Efficiently", 
      status: "Deployment Constraint",
      solution: "Precision-adaptive encoding — no weights destroyed. In verified run QR-0007, gpt2-medium reached 91.35% compression, 98.08% capability retention, and 2.77 bits per weight. The run converged at iteration 1 using CPU-only execution.",
    },
    {
      visual: <SvgSemicircle color="#00E87A" pct={99} />,
      problem: "Security and Provenance Need to Be Verifiable", 
      status: "Security & Provenance",
      solution: "Post-quantum cryptography is presented as a security feature. Every run is logged, SHA-256 hashed, and anchored to the Bitcoin blockchain via OpenTimestamps, creating a verifiable record of the result.",
    },
    {
      visual: <SvgBarChart color="#00FF9F" />,
      problem: "Evaluation Needs a Measured Fidelity Cost", 
      status: "Measurement Required",
      solution: "Quazi Labs emphasizes quantified, disclosed fidelity cost. Compression is measured against a defined quality signal, with the result reported rather than implied.",
    },
    {
      visual: <SvgBulletList color="#00FF9F" items={["Existing infrastructure", "CPU-only results", "Defined scope", "Measured output"]} />,
      problem: "AI Infrastructure Is Costly to Adapt", 
      status: "Infrastructure Fit",
      solution: "Every verified result was produced without GPU at any stage — compression, execution, or serving. The practical question for a partner is whether the workflow can run within its existing infrastructure; that is what a scoped validation is designed to test.",
    },
    {
      visual: <SvgSemicircle color="#00CC78" pct={91} />,
      problem: "Inference Efficiency Is a Deployment Constraint", 
      status: "Efficiency Constraint",
      solution: "Compression below the industry's 4-bit floor can reduce the amount of model data that must be moved and served. The verified QR-0007 result was produced CPU-only, with the fidelity cost quantified and disclosed.",
    },
    {
      visual: <SvgRadar color="#00FF9F" />,
      problem: "Decisions Need Evidence Before Scale", 
      status: "Measurement Required",
      solution: "Partner validation begins with a defined model, dataset, decision criterion, and run record. Results are reported with the appropriate disclosure level before broader deployment decisions are made.",
    },
  ];

  return (
    <section id="pain-points" className="py-32 relative z-10">
      <div className="container">
        <div className="reveal text-center mb-16">
          <div
            className="inline-block text-xs font-mono tracking-widest px-3 py-1 mb-4 rounded-sm"
            style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)", color: "#00FF9F" }}
          >
            THE DEPLOYMENT GAP
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0faf5" }}
          >
            Enterprise AI is ready.
            <br />
            <span className="gradient-text">The infrastructure is not.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Quazi Labs focuses on the practical constraints that keep capable models expensive, fragile, and difficult to deploy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((p, i) => (
            <div
              key={i}
              className="reveal glass-card rounded-sm p-6 group transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms`, borderColor: "rgba(0,255,159,0.12)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.35)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,255,159,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.12)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* SVG tech visual */}
              <div className="h-14 mb-4 opacity-80">{p.visual}</div>
              <div
                className="text-xs font-mono tracking-widest mb-2 px-2 py-0.5 rounded-sm inline-block"
                style={{ background: "rgba(0,255,159,0.08)", color: "#00FF9F", border: "1px solid rgba(0,255,159,0.25)" }}
              >
                {p.status}
              </div>
              <h3
                className="text-lg font-bold mb-3 mt-2"
                style={{ color: "#e8f5f0", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {p.problem}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6a9a80" }}>
                {p.solution}
              </p>
              <div
                className="mt-4 h-px w-full"
                style={{ background: "linear-gradient(90deg, rgba(0,255,159,0.4), transparent)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Platform ──────────────────────────────────────────────────────────────────
function Platform() {
  const modules = [
    { id: "01", name: "Precision-Adaptive Encoding", desc: "Precision-adaptive encoding — no weights destroyed. Verified QR-0007 result: 91.35% compression, 98.08% capability retention, 2.77 bits per weight.", tag: "Core", visual: <SvgLineChart color="#00FF9F" /> },
    { id: "02", name: "Post-Quantum Cryptography", desc: "A security feature using standard post-quantum cryptography terminology. Every run is logged, SHA-256 hashed, and anchored to the Bitcoin blockchain via OpenTimestamps.", tag: "Security", visual: <SvgSemicircle color="#00E87A" pct={98} /> },
    { id: "03", name: "Compliance Readiness", desc: "Define the evidence, logging, and review requirements for a partner validation. Public materials disclose verified results; additional technical detail is shared under NDA.", tag: "Compliance", visual: <SvgBarChart color="#00CC78" /> },
    { id: "04", name: "CPU-Native Deployment", desc: "Every verified result was produced without GPU at any stage — compression, execution, or serving. Designed for practical deployment on existing infrastructure.", tag: "Deployment", visual: <SvgRadar color="#00FF9F" /> },
    { id: "05", name: "Fidelity Measurement", desc: "A quantified, disclosed fidelity cost accompanies the compression result. Quality is measured and reported rather than implied.", tag: "Verification", visual: <SvgLineChart color="#00E87A" /> },
    { id: "06", name: "Predictive Scoring", desc: "Explore calibrated probabilistic scoring for structured or behavioral datasets. Scope and validation criteria are defined with each partner.", tag: "Intelligence", visual: <SvgRadar color="#00CC78" /> },
    { id: "07", name: "Registry & Provenance", desc: "Every run logged with a run ID, configuration state, and SHA-256 hash anchored to the Bitcoin blockchain. Verifiable at opentimestamps.org.", tag: "Provenance", visual: <SvgBarChart color="#00FF9F" /> },
    { id: "08", name: "Below-Floor Compression", desc: "Compression below the industry's 4-bit floor, with the fidelity cost quantified and disclosed. QR-0007 reached 2.77 bits per weight.", tag: "Efficiency", visual: <SvgSemicircle color="#00FF9F" pct={91} /> },
    { id: "09", name: "Partner Validation", desc: "Bring a model, dataset, and decision criterion. We define the validation scope together and report the result with the appropriate disclosure level.", tag: "Custom", visual: <SvgBulletList color="#00FF9F" items={["Defined scope", "Measured result", "Logged run", "Partner review"]} /> },
  ];

  return (
    <section id="platform" className="py-32 relative z-10">
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,255,159,0.02) 50%, transparent 100%)" }}
      />
      <div className="container relative z-10">
        <div className="reveal text-center mb-16">
          <div
            className="inline-block text-xs font-mono tracking-widest px-3 py-1 mb-4 rounded-sm"
            style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)", color: "#00FF9F" }}
          >
            THE PRECISION LAYER
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0faf5" }}
          >
            A precision layer for enterprise AI.
            <br />
            <span className="neon-green">Use what fits.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A focused set of capabilities for model compression, provenance, CPU-native deployment, predictive scoring, security, and compliance. Configure the layer around the infrastructure you already operate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <div
              key={m.id}
              className="reveal glass-card rounded-sm p-5 group cursor-default transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms`, borderColor: "rgba(0,255,159,0.1)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.35)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,159,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.1)";
                (e.currentTarget as HTMLElement).style.background = "";
              }}
            >
              {/* SVG visual */}
              <div className="h-12 mb-3 opacity-70">{m.visual}</div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono" style={{ color: "#00FF9F50" }}>MODULE {m.id}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-sm font-mono"
                  style={{ background: "rgba(0,255,159,0.08)", color: "#00FF9F", border: "1px solid rgba(0,255,159,0.2)" }}
                >
                  {m.tag}
                </span>
              </div>
              <h3 className="font-bold mb-2 text-base" style={{ color: "#e8f5f0", fontFamily: "'Space Grotesk', sans-serif" }}>
                {m.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a8a70" }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Use Cases ─────────────────────────────────────────────────────────────────
function UseCases() {
  const industries = [
    {
      name: "Financial Services",
      visual: <SvgBarChart color="#00FF9F" />,
      cases: ["Model compression evaluation", "CPU-only execution review", "Fidelity measurement", "Partner validation planning"],
    },
    {
      name: "Healthcare",
      visual: <SvgLineChart color="#00E87A" />,
      cases: ["Constrained-environment deployment review", "CPU-only evaluation pathways", "Fidelity measurement", "Confidential pilot discussions"],
    },
    {
      name: "Cybersecurity",
      visual: <SvgRadar color="#00FF9F" />,
      cases: ["Security-focused deployment review", "Post-quantum cryptography as a security feature", "Provenance requirements", "Confidential pilot discussions"],
    },
    {
      name: "Manufacturing",
      visual: <SvgBarChart color="#00CC78" />,
      cases: ["Distributed inference evaluation", "CPU-only deployment review", "Fidelity measurement", "Confidential pilot discussions"],
    },
    {
      name: "Energy & Grid",
      visual: <SvgSemicircle color="#00FF9F" pct={91} />,
      cases: ["Infrastructure-constrained inference", "CPU-only deployment review", "Measured operating criteria", "Confidential pilot discussions"],
    },
    {
      name: "Telecommunications",
      visual: <SvgRadar color="#00E87A" />,
      cases: ["Distributed model deployment review", "CPU-only evaluation pathways", "Provenance requirements", "Confidential pilot discussions"],
    },
  ];

  return (
    <section id="use-cases" className="py-32 relative z-10">
      <div className="container">
        <div className="reveal text-center mb-16">
          <div
            className="inline-block text-xs font-mono tracking-widest px-3 py-1 mb-4 rounded-sm"
            style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)", color: "#00FF9F" }}
          >
            APPLICATIONS ACROSS ENTERPRISE SYSTEMS
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0faf5" }}
          >
            One underlying problem.
            <br />
            <span className="neon-green">Too much intelligence trapped in too much infrastructure.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Quazi Labs is designed for organizations that need more capable AI at lower operating complexity — across regulated, distributed, and infrastructure-constrained environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <div
              key={ind.name}
              className="reveal glass-card rounded-sm p-6 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms`, borderColor: "rgba(0,255,159,0.1)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.35)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(0,255,159,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="h-14 mb-4 opacity-75">{ind.visual}</div>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#e8f5f0", fontFamily: "'Space Grotesk', sans-serif" }}>
                {ind.name}
              </h3>
              <ul className="space-y-2">
                {ind.cases.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm" style={{ color: "#6a9a80" }}>
                    <span className="mt-1 neon-green text-xs">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Verified Results Section ──────────────────────────────────────────────────
function BridgeSection() {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,159,0.05) 0%, transparent 70%)" }}
      />
      <div className="container relative z-10">
        <div className="reveal max-w-4xl mx-auto text-center">
          <div
            className="inline-block text-xs font-mono tracking-widest px-3 py-1 mb-8 rounded-sm"
            style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)", color: "#00FF9F" }}
          >
            VERIFIED RESULTS — QUAZI PERFORMANCE REGISTRY
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0faf5" }}
          >
            A verified result below the
            <br />
            <span className="neon-green">industry's 4-bit floor.</span>
          </h2>
          <p className="text-xl mb-6 leading-relaxed" style={{ color: "#8ab8a0" }}>
            QR-0007 compressed gpt2-medium (354,823,168 parameters) by 91.35% — from 1,353.54 MB to 117.07 MB —
            at 2.77 bits per weight. Capability retention measured 98.08% on a 52-item homophone reasoning probe.
            The run converged at iteration 1, using CPU-only execution at every stage.
          </p>
          <p className="text-lg mb-12 leading-relaxed" style={{ color: "#5a8a70" }}>
            Every run is logged with a run ID, configuration state, and SHA-256 hash anchored to the Bitcoin blockchain
            via OpenTimestamps. Fidelity cost is quantified and disclosed. The QR-0007 anchor is verifiable at opentimestamps.org.
          </p>

          {/* Verified result cards */}
          <div className="flex items-stretch justify-center gap-4 mb-12 flex-wrap">
            {[
              { stat: "91.35%", label: "Compression", sub: "1,353 MB → 117 MB" },
              { stat: "98.08%", label: "Capability Retention", sub: "51/52 homophone probe" },
              { stat: "2.77 bpw", label: "Bits Per Weight", sub: "from 32-bit baseline" },
              { stat: "1 pass", label: "Convergence", sub: "target met at iteration 1" },
            ].map((t) => (
              <div key={t.stat} className="flex flex-col items-center min-w-[140px] glass-card rounded-sm px-5 py-5"
                style={{ border: "1px solid rgba(0,255,159,0.2)" }}>
                <div
                  className="text-2xl font-bold font-mono mb-1"
                  style={{ color: "#00FF9F", textShadow: "0 0 20px rgba(0,255,159,0.25)" }}
                >
                  {t.stat}
                </div>
                <p className="text-xs tracking-widest mb-1" style={{ color: "#4a7a5a" }}>{t.label}</p>
                <p className="text-xs font-mono" style={{ color: "#2a4a3a" }}>{t.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono" style={{ color: "#2a4a3a" }}>
            Run QR-0007 · 2026-07-25 · SHA-256: ec28c274e50928df4b6f8d065151b9e04576fc38f8168000db75a56ea8adb2cb · Anchored: bob.btc, finney/eternitywall, alice.btc
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Partnerships ──────────────────────────────────────────────────────────────
function Partnerships() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", interest: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="partnerships" className="py-32 relative z-10">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,255,159,0.03) 0%, transparent 70%)" }}
      />
      <div className="container relative z-10">
        <div className="reveal text-center mb-16">
          <div
            className="inline-block text-xs font-mono tracking-widest px-3 py-1 mb-4 rounded-sm"
            style={{ background: "rgba(0,255,159,0.08)", border: "1px solid rgba(0,255,159,0.2)", color: "#00FF9F" }}
          >
            PILOT PARTNERSHIPS &amp; ACQUISITION INQUIRIES
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#f0faf5" }}
          >
            Bring the constraint.
            <br />
            <span className="neon-green">We will show you the measurement.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Quazi Labs is a Delaware-incorporated prototype company accepting pilot partnership inquiries and strategic acquisition conversations.
            Public materials cover verified results only; additional technical detail is disclosed under NDA to qualified parties.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="reveal glass-card rounded-sm p-8 space-y-5"
              style={{ border: "1px solid rgba(0,255,159,0.2)" }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { key: "name", label: "Full Name", placeholder: "Your name" },
                  { key: "company", label: "Organization", placeholder: "Company or institution" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-mono tracking-widest mb-2" style={{ color: "rgba(0,255,159,0.5)" }}>
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(0,255,159,0.04)",
                        border: "1px solid rgba(0,255,159,0.15)",
                        color: "#e8f5f0",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,159,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,159,0.15)")}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest mb-2" style={{ color: "rgba(0,255,159,0.5)" }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="your@organization.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(0,255,159,0.04)",
                    border: "1px solid rgba(0,255,159,0.15)",
                    color: "#e8f5f0",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,159,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,159,0.15)")}
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest mb-2" style={{ color: "rgba(0,255,159,0.5)" }}>
                  INQUIRY TYPE
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(8,8,8,0.9)",
                    border: "1px solid rgba(0,255,159,0.15)",
                    color: form.interest ? "#e8f5f0" : "#4a6a5a",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <option value="" disabled>Select inquiry type</option>
                  <option value="pilot">Pilot Partnership</option>
                  <option value="acquisition">Strategic Acquisition</option>
                  <option value="licensing">Technology Licensing</option>
                  <option value="investor">Investor Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest mb-2" style={{ color: "rgba(0,255,159,0.5)" }}>
                  YOUR PAIN POINTS / MESSAGE
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your infrastructure challenges, use case, or acquisition interest..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(0,255,159,0.04)",
                    border: "1px solid rgba(0,255,159,0.15)",
                    color: "#e8f5f0",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,159,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,159,0.15)")}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-bold text-sm tracking-widest rounded-sm transition-all duration-200"
                style={{
                  background: "rgba(0,255,159,0.1)",
                  border: "1px solid rgba(0,255,159,0.4)",
                  color: "#00FF9F",
                  boxShadow: "0 0 20px rgba(0,255,159,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(0,255,159,0.30)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,159,0.15)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,159,0.4)";
                }}
              >
                INITIATE CONVERSATION
              </button>
              <p className="text-xs text-center" style={{ color: "#3a5a4a" }}>
                All technical details disclosed under NDA to qualified parties only.
              </p>
            </form>
          ) : (
            <div
              className="reveal glass-card rounded-sm p-12 text-center"
              style={{ border: "1px solid rgba(0,255,159,0.3)", boxShadow: "0 0 40px rgba(0,255,159,0.1)" }}
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-sm" style={{ border: "1px solid rgba(0,255,159,0.4)", background: "rgba(0,255,159,0.08)" }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                  <polyline points="20 6 9 17 4 12" stroke="#00FF9F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 neon-green" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Inquiry Received
              </h3>
              <p className="text-gray-400">We will be in touch within 48 hours. All conversations are confidential.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative z-10 py-12 border-t" style={{ borderColor: "rgba(0,255,159,0.1)" }}>
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={LOGO_SRC}
            onError={hideBrokenImage}
            alt="Quazi Labs"
            className="h-10 w-10 object-contain"
            style={{ filter: "drop-shadow(0 0 8px #00FF9F50)" }}
          />
          <span className="text-sm font-bold tracking-wider" style={{ color: "#4a6a5a" }}>QUAZI LABS</span>
        </div>
        <p className="text-xs font-mono" style={{ color: "#2a4a3a" }}>
            © 2026 Quazi Labs, Inc. All rights reserved. Public claims are limited to the current verified registry and approved disclosure sheet.
        </p>
        <div
          className="text-xs font-mono px-3 py-1 rounded-sm"
          style={{ background: "rgba(0,255,159,0.05)", border: "1px solid rgba(0,255,159,0.1)", color: "#3a5a4a" }}
        >
          PRECISION-ADAPTIVE ENCODING — VERIFIED REGISTRY
        </div>
      </div>
    </footer>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal();
  return (
    <div className="min-h-screen" style={{ background: "#080808", fontFamily: "'Space Grotesk', sans-serif" }}>
      <GeometricCanvas />
      <Nav />
      <Hero />
      <PainPoints />
      <Platform />
      <UseCases />
      <BridgeSection />
      <Partnerships />
      <Footer />
    </div>
  );
}
