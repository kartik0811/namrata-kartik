import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * A golden scratch-card. The `value` sits underneath a gold foil drawn on a
 * <canvas>. Dragging (mouse or touch) erases the foil; once enough is
 * scratched away the card auto-reveals with a soft fade. The value stays
 * hidden until the guest actually scratches it.
 */
export default function ScratchCard({
  label,
  value,
  threshold = 0.45,
  onRevealed,
  valueClassName = "font-[cursive] text-3xl font-bold leading-none",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const revealedRef = useRef(false);
  const lastPoint = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const coverageRef = useRef({ cells: new Set(), columns: 0, rows: 0, cellSize: 8 });
  const [revealed, setRevealed] = useState(false);

  const doReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    if (onRevealed) onRevealed();
  }, [onRevealed]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || revealedRef.current) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w === 0 || h === 0) return;
    // A capped DPR keeps the tiny scratch canvases crisp without creating
    // unnecessarily large GPU/CPU buffers on high-density phones.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (sizeRef.current.width === w && sizeRef.current.height === h) return;
    sizeRef.current = { width: w, height: h };
    const cellSize = 8;
    coverageRef.current = {
      cells: new Set(),
      columns: Math.ceil(w / cellSize),
      rows: Math.ceil(h / cellSize),
      cellSize,
    };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
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
    ctx.font = "600 14px 'Cormorant Garamond', serif";
    ctx.fillText("SCRATCH", w / 2, h / 2 - 4);
    ctx.font = "600 13px serif";
    ctx.fillText("✦ ✦ ✦", w / 2, h / 2 + 18);

    // Everything drawn after this fully erases the foil (solid alpha so the
    // pixels reach 0 alpha and the reveal threshold can be reached).
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    let raf = requestAnimationFrame(initCanvas);
    const observer = wrap
      ? new ResizeObserver(() => {
          if (!revealedRef.current) initCanvas();
        })
      : null;
    observer?.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [initCanvas]);

  const pointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // Track the cells touched by the brush instead of reading canvas pixels.
  // This avoids repeated GPU-to-CPU readbacks, which are particularly costly
  // during touch drags on iPhones.
  const markScratchCoverage = (x, y) => {
    const { cells, columns, rows, cellSize } = coverageRef.current;
    if (!columns || !rows) return;

    const brushRadius = 17;
    const startColumn = Math.max(0, Math.floor((x - brushRadius) / cellSize));
    const endColumn = Math.min(columns - 1, Math.floor((x + brushRadius) / cellSize));
    const startRow = Math.max(0, Math.floor((y - brushRadius) / cellSize));
    const endRow = Math.min(rows - 1, Math.floor((y + brushRadius) / cellSize));

    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        const centerX = (column + 0.5) * cellSize;
        const centerY = (row + 0.5) * cellSize;
        if (Math.hypot(centerX - x, centerY - y) <= brushRadius) {
          cells.add(row * columns + column);
        }
      }
    }

    if (cells.size / (columns * rows) >= threshold) doReveal();
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

    const distance = Math.hypot(x - last.x, y - last.y);
    const steps = Math.max(1, Math.ceil(distance / 8));
    for (let step = 0; step <= steps; step++) {
      const progress = step / steps;
      markScratchCoverage(last.x + (x - last.x) * progress, last.y + (y - last.y) * progress);
    }

    lastPoint.current = { x, y };
  };

  const start = (e) => {
    if (revealedRef.current) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drawing.current = true;
    lastPoint.current = pointerPos(e);
    scratch(e);
  };
  const end = (e) => {
    if (e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    drawing.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        ref={wrapRef}
        className="relative h-28 w-20 shrink-0 overflow-hidden rounded-2xl border border-gold/60 bg-gradient-to-br from-white/85 to-champagne/70 shadow-glow sm:w-24"
        whileHover={{ y: -4 }}
      >
        {/* Value revealed underneath the foil */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${valueClassName} min-w-full whitespace-nowrap text-center leading-none tabular-nums text-wine`}>
            {value}
          </span>
        </div>

        {/* Gold foil to scratch away */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-pointer touch-none select-none"
          onPointerDown={start}
          onPointerMove={scratch}
          onPointerUp={end}
          onPointerCancel={end}
          animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ pointerEvents: revealed ? "none" : "auto" }}
          aria-hidden="true"
        />
      </motion.div>
      <span className="font-serif text-sm uppercase tracking-[0.2em] text-cocoa/70">
        {label}
      </span>
    </div>
  );
}
