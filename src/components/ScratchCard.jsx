import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * A golden scratch-card. The `value` sits underneath a gold foil drawn on a
 * <canvas>. Dragging (mouse or touch) erases the foil; once enough is
 * scratched away the card auto-reveals with a soft fade. The value stays
 * hidden until the guest actually scratches it.
 */
export default function ScratchCard({ label, value, threshold = 0.45 }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const revealedRef = useRef(false);
  const lastPoint = useRef(null);
  const lastCheck = useRef(0);
  const [revealed, setRevealed] = useState(false);

  const doReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || revealedRef.current) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w === 0 || h === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    // Gold foil gradient
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#caa24a");
    g.addColorStop(0.45, "#f6e7ad");
    g.addColorStop(0.55, "#f6e7ad");
    g.addColorStop(1, "#b8860b");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Sparkle speckles
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hint text
    ctx.fillStyle = "rgba(122,80,10,0.6)";
    ctx.textAlign = "center";
    ctx.font = "600 11px 'Cormorant Garamond', serif";
    ctx.fillText("SCRATCH", w / 2, h / 2 - 4);
    ctx.font = "600 12px serif";
    ctx.fillText("✦ ✦ ✦", w / 2, h / 2 + 14);

    // Everything drawn after this fully erases the foil (solid alpha so the
    // pixels reach 0 alpha and the reveal threshold can be reached).
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    let raf;
    // Wait until the card actually has a size before drawing the foil
    // (it mounts behind the curtain, so layout may not be ready yet).
    const tryInit = () => {
      const wrap = wrapRef.current;
      if (revealedRef.current) return;
      if (wrap && wrap.clientWidth > 0) {
        initCanvas();
      } else {
        raf = requestAnimationFrame(tryInit);
      }
    };
    tryInit();

    const onResize = () => {
      if (!revealedRef.current) initCanvas();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [initCanvas]);

  const pointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let samples = 0;
    const step = 32; // sample every 32nd pixel for performance
    for (let i = 3; i < data.length; i += 4 * step) {
      samples++;
      if (data[i] === 0) clear++;
    }
    if (samples > 0 && clear / samples > threshold) doReveal();
  };

  // getImageData is a costly GPU→CPU readback, so only sample occasionally
  // instead of on every pointer move.
  const maybeCheckProgress = () => {
    const now = performance.now();
    if (now - lastCheck.current < 140) return;
    lastCheck.current = now;
    checkProgress();
  };

  const scratch = (e) => {
    if (!drawing.current || revealedRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const { x, y } = pointerPos(e);
    const last = lastPoint.current || { x, y };

    // Interpolated stroke so quick swipes don't leave gaps.
    ctx.lineWidth = 34;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 17, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = { x, y };
    maybeCheckProgress();
  };

  const start = (e) => {
    if (revealedRef.current) return;
    drawing.current = true;
    lastPoint.current = pointerPos(e);
    scratch(e);
  };
  const end = () => {
    drawing.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        ref={wrapRef}
        className="relative h-28 w-24 overflow-hidden rounded-2xl border border-gold/60 bg-gradient-to-br from-white/85 to-champagne/70 shadow-glow"
        whileHover={{ y: -4 }}
      >
        {/* Value revealed underneath the foil */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-4xl font-bold text-shimmer">{value}</span>
        </div>

        {/* Gold foil to scratch away */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-pointer touch-none select-none"
          onMouseDown={start}
          onMouseMove={scratch}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={scratch}
          onTouchEnd={end}
          animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ pointerEvents: revealed ? "none" : "auto" }}
          aria-hidden="true"
        />
      </motion.div>
      <span className="font-serif text-xs uppercase tracking-[0.25em] text-cocoa/70">
        {label}
      </span>
    </div>
  );
}
