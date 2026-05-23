"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, Rotate3d, Fingerprint } from "lucide-react";

// Product Data
const products = [
  {
    id: "black",
    name: "Mysterious Black",
    description: "The classic choice for a professional and sleek setup.",
    color: "#18181b", // Dark charcoal black
    glowColor: "rgba(249,115,22,0.8)", // Primary orange glow wireframe
    image: "/cushion-black.png",
  },
  {
    id: "blue",
    name: "Electric Blue",
    description: "A vibrant accent that brings energy to your workspace.",
    color: "#2563eb", // Electric blue
    glowColor: "rgba(59,130,246,0.9)", // Electric blue glow wireframe
    image: "/cushion-blue.png",
  },
  {
    id: "slate",
    name: "Slate Gray",
    description: "Modern, neutral, and blends perfectly with any office chair.",
    color: "#475569", // Slate gray
    glowColor: "rgba(148,163,184,0.9)", // Slate wireframe glow
    image: "/cushion-slate.png",
  },
];

// Interactive 3D Cushion Canvas Component
interface Cushion3DProps {
  productId: string;
  color: string;
  glowColor: string;
}

const Cushion3D: React.FC<Cushion3DProps> = ({ productId, color, glowColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Rotation State
  const rotationRef = useRef({
    angleX: -0.6, // Pitch (tilt)
    angleY: 0.5,  // Yaw (spin)
    targetAngleX: -0.6,
    targetAngleY: 0.5,
    isDragging: false,
    startX: 0,
    startY: 0,
    pulseTime: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // 1. Generate 3D Mesh Grid for Ergonomic Cushion
    const NX = 13;
    const NY = 13;
    const vertices: { x: number; y: number; z: number; isTop: boolean }[] = [];
    
    // Ergonomic height formula matching physical contoured cushion shape
    const getErgonomicHeight = (x: number, y: number) => {
      const dThighL = Math.pow(x + 1.6, 2) + Math.pow(y + 0.6, 2);
      const dThighR = Math.pow(x - 1.6, 2) + Math.pow(y + 0.6, 2);
      const dTailbone = Math.pow(x, 2) + Math.pow(y - 2.8, 2);
      const dDivider = Math.pow(x, 2) + Math.pow(y + 3.0, 2);

      let z = 0.55;
      z -= 0.32 * Math.exp(-dThighL / 1.8);  // Left thigh depression scoop
      z -= 0.32 * Math.exp(-dThighR / 1.8);  // Right thigh depression scoop
      z -= 0.40 * Math.exp(-dTailbone / 1.0); // Coccyx/Tailbone cutout relief
      z += 0.16 * Math.exp(-dDivider / 1.5);  // Thigh divider center hump
      z += 0.04 * y;                          // Gentle forward slope

      return z;
    };

    // Generate Top Mesh Grid (z = getErgonomicHeight(x, y))
    for (let i = 0; i < NX; i++) {
      for (let j = 0; j < NY; j++) {
        const x = -3.2 + 6.4 * (i / (NX - 1));
        const y = -3.2 + 6.4 * (j / (NY - 1));
        const z = getErgonomicHeight(x, y);
        vertices.push({ x, y, z, isTop: true });
      }
    }

    // Generate Bottom Mesh Grid (z = -0.55 flat base)
    const baseOffset = NX * NY;
    for (let i = 0; i < NX; i++) {
      for (let j = 0; j < NY; j++) {
        const x = -3.2 + 6.4 * (i / (NX - 1));
        const y = -3.2 + 6.4 * (j / (NY - 1));
        vertices.push({ x, y, z: -0.55, isTop: false });
      }
    }

    // 2. Generate Face Connections (Quad Polygons)
    const faces: { indices: number[]; isTop: boolean; isSide: boolean }[] = [];

    // Top Surface Faces
    for (let i = 0; i < NX - 1; i++) {
      for (let j = 0; j < NY - 1; j++) {
        const v0 = i * NY + j;
        const v1 = (i + 1) * NY + j;
        const v2 = (i + 1) * NY + (j + 1);
        const v3 = i * NY + (j + 1);
        faces.push({ indices: [v0, v1, v2, v3], isTop: true, isSide: false });
      }
    }

    // Bottom Base Faces (Reverse Winding for Normal direction)
    for (let i = 0; i < NX - 1; i++) {
      for (let j = 0; j < NY - 1; j++) {
        const v0 = baseOffset + i * NY + j;
        const v1 = baseOffset + i * NY + (j + 1);
        const v2 = baseOffset + (i + 1) * NY + (j + 1);
        const v3 = baseOffset + (i + 1) * NY + j;
        faces.push({ indices: [v0, v1, v2, v3], isTop: false, isSide: false });
      }
    }

    // Side Perimeter Faces (Connect boundary edges)
    // Front Boundary (j = 0)
    for (let i = 0; i < NX - 1; i++) {
      const vTop = i * NY + 0;
      const vTopNext = (i + 1) * NY + 0;
      const vBot = baseOffset + i * NY + 0;
      const vBotNext = baseOffset + (i + 1) * NY + 0;
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }
    // Right Boundary (i = NX - 1)
    for (let j = 0; j < NY - 1; j++) {
      const vTop = (NX - 1) * NY + j;
      const vTopNext = (NX - 1) * NY + (j + 1);
      const vBot = baseOffset + (NX - 1) * NY + j;
      const vBotNext = baseOffset + (NX - 1) * NY + (j + 1);
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }
    // Back Boundary (j = NY - 1)
    for (let i = NX - 1; i > 0; i--) {
      const vTop = i * NY + (NY - 1);
      const vTopNext = (i - 1) * NY + (NY - 1);
      const vBot = baseOffset + i * NY + (NY - 1);
      const vBotNext = baseOffset + (i - 1) * NY + (NY - 1);
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }
    // Left Boundary (i = 0)
    for (let j = NY - 1; j > 0; j--) {
      const vTop = 0 * NY + j;
      const vTopNext = 0 * NY + (j - 1);
      const vBot = baseOffset + 0 * NY + j;
      const vBotNext = baseOffset + 0 * NY + (j - 1);
      faces.push({ indices: [vTop, vTopNext, vBotNext, vBot], isTop: false, isSide: true });
    }

    // 3. Arrangement of 9 Smart Pressure Sensors (FSRs)
    const sensorOffsets = [-1.6, 0, 1.6];
    const sensors: { x: number; y: number; z: number }[] = [];
    for (const sx of sensorOffsets) {
      for (const sy of sensorOffsets) {
        // Place sensors slightly floating above the contoured top surface
        const sz = getErgonomicHeight(sx, sy) + 0.08;
        sensors.push({ x: sx, y: sy, z: sz });
      }
    }

    // 4. Position of Blue LED STATUS Light on the right side
    const statusLed = { x: 3.2, y: -0.6, z: -0.15 };

    // 3D Point Rotation Helper
    const rotate = (x: number, y: number, z: number, angleX: number, angleY: number) => {
      // Rotate around X-axis (Pitch / Tilt)
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;

      // Rotate around Y-axis (Yaw / Spin)
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x2 = x * cosY - z1 * sinY;
      const z2 = x * sinY + z1 * cosY;

      return { x: x2, y: y1, z: z2 };
    };

    // Canvas Resize Handler
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = (rect?.width || 500) * window.devicePixelRatio;
      canvas.height = (rect?.height || 500) * window.devicePixelRatio;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    resize();
    window.addEventListener("resize", resize);

    // 5. Core 60FPS Loop
    const render = () => {
      const state = rotationRef.current;
      
      // Auto Spin slowly when user is not dragging
      if (!state.isDragging) {
        state.targetAngleY += 0.005;
      }
      
      // Dynamic Momentum LERP Smooth interpolation
      state.angleX += (state.targetAngleX - state.angleX) * 0.12;
      state.angleY += (state.targetAngleY - state.angleY) * 0.12;
      state.pulseTime += 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      // Dynamically calculate camera scale depending on viewport size
      const baseScale = Math.min(canvas.width, canvas.height) * 0.1;
      const D = 14; // Camera Viewport Distance

      // 5a. Rotate and Project all Vertices to Screen space
      const projected = vertices.map(v => {
        const r = rotate(v.x, v.y, v.z, state.angleX, state.angleY);
        const scale = (D * baseScale) / (D + r.z); // Perspective projection scale
        return {
          rx: r.x,
          ry: r.y,
          rz: r.z,
          sx: cx + r.x * scale,
          sy: cy + r.y * scale,
        };
      });

      // 5b. Face Projection and Flat Shading calculations
      const faceData = faces.map((face, index) => {
        const vPoints = face.indices.map(idx => projected[idx]);
        const rotPoints = face.indices.map(idx => {
          const v = vertices[idx];
          return rotate(v.x, v.y, v.z, state.angleX, state.angleY);
        });

        // Depth Sorting metric: average z position
        let avgZ = 0;
        vPoints.forEach(p => { avgZ += p.rz; });
        avgZ /= vPoints.length;

        // 3D Normal Vector Cross Product (Face flat shading calculation)
        const u = {
          x: rotPoints[1].x - rotPoints[0].x,
          y: rotPoints[1].y - rotPoints[0].y,
          z: rotPoints[1].z - rotPoints[0].z,
        };
        const v = {
          x: rotPoints[2].x - rotPoints[0].x,
          y: rotPoints[2].y - rotPoints[0].y,
          z: rotPoints[2].z - rotPoints[0].z,
        };
        const nx = u.y * v.z - u.z * v.y;
        const ny = u.z * v.x - u.x * v.z;
        const nz = u.x * v.y - u.y * v.x;
        const len = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
        const normal = { x: nx/len, y: ny/len, z: nz/len };

        // Virtual light coming from top-front-right normalized
        const light = { x: 0.5, y: 0.8, z: -0.45 };
        const dot = normal.x * light.x + normal.y * light.y + normal.z * light.z;
        
        // Two-sided shading multiplier to keep wireframe fully visible and shaded
        const brightness = 0.35 + 0.65 * Math.abs(dot);

        return {
          vPoints,
          avgZ,
          brightness,
          isTop: face.isTop,
          isSide: face.isSide,
        };
      });

      // 5c. Painter's Algorithm Depth Sort: draw back faces first
      faceData.sort((a, b) => b.avgZ - a.avgZ);

      // 5d. Draw all Quad polygons
      faceData.forEach(face => {
        ctx.beginPath();
        ctx.moveTo(face.vPoints[0].sx, face.vPoints[0].sy);
        for (let i = 1; i < face.vPoints.length; i++) {
          ctx.lineTo(face.vPoints[i].sx, face.vPoints[i].sy);
        }
        ctx.closePath();

        // Shaded Solid fill colors matching selected products
        let fillColor = "";
        let strokeColor = "";
        
        const br = face.brightness;

        if (productId === "black") {
          // Sleek glowing charcoal dark-cyber feel
          fillColor = `rgba(${Math.round(18 * br + 8)}, ${Math.round(18 * br + 8)}, ${Math.round(20 * br + 10)}, 0.96)`;
          strokeColor = face.isTop 
            ? `rgba(249, 115, 22, ${0.12 + 0.18 * br})` // Orange mesh wire lines
            : `rgba(255, 255, 255, 0.05)`;
        } else if (productId === "blue") {
          // Rich electric deep blue shaded surfaces
          fillColor = `rgba(${Math.round(15 * br + 10)}, ${Math.round(50 * br + 20)}, ${Math.round(210 * br + 45)}, 0.90)`;
          strokeColor = `rgba(59, 130, 246, ${0.15 + 0.22 * br})`;
        } else {
          // Premium cool metallic Slate Gray
          fillColor = `rgba(${Math.round(55 * br + 15)}, ${Math.round(65 * br + 18)}, ${Math.round(80 * br + 22)}, 0.92)`;
          strokeColor = `rgba(148, 163, 184, ${0.15 + 0.20 * br})`;
        }

        ctx.fillStyle = fillColor;
        ctx.fill();

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.0 * window.devicePixelRatio;
        ctx.stroke();
      });

      // 5e. Render 9 Glowing Smart Sensor nodes on top of the cushion
      sensors.forEach((s, idx) => {
        const r = rotate(s.x, s.y, s.z, state.angleX, state.angleY);
        const scale = (D * baseScale) / (D + r.z);
        const sx = cx + r.x * scale;
        const sy = cy + r.y * scale;

        // Draw ONLY if the sensor is on a front-facing surface (rz < 0)
        if (r.z < 0) {
          // Radial glow coordinates
          const rad = 7 + 4 * Math.sin(state.pulseTime * 4.5 + idx * 1.5);
          
          // Glow Background Circle
          ctx.beginPath();
          ctx.arc(sx, sy, rad * window.devicePixelRatio, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            sx, sy, 0, 
            sx, sy, rad * window.devicePixelRatio
          );
          
          if (productId === "black") {
            grad.addColorStop(0, "rgba(249, 115, 22, 0.65)"); // Orange sensor cores
            grad.addColorStop(1, "rgba(249, 115, 22, 0)");
          } else if (productId === "blue") {
            grad.addColorStop(0, "rgba(34, 211, 238, 0.65)"); // Cyber Cyan sensors for contrast
            grad.addColorStop(1, "rgba(34, 211, 238, 0)");
          } else {
            grad.addColorStop(0, "rgba(16, 185, 129, 0.65)"); // Emerald Green sensors
            grad.addColorStop(1, "rgba(16, 185, 129, 0)");
          }
          
          ctx.fillStyle = grad;
          ctx.fill();

          // Small Central Solid LED Core
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2 * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fillStyle = productId === "black" ? "#f97316" : productId === "blue" ? "#22d3ee" : "#10b981";
          ctx.shadowBlur = 12 * window.devicePixelRatio;
          ctx.shadowColor = ctx.fillStyle;
          ctx.fill();
          
          // Reset shadow blur
          ctx.shadowBlur = 0;
        }
      });

      // 5f. Render Glowing Electric Blue LED STATUS Light on the side
      const rStatus = rotate(statusLed.x, statusLed.y, statusLed.z, state.angleX, state.angleY);
      const scaleStatus = (D * baseScale) / (D + rStatus.z);
      const sxStatus = cx + rStatus.x * scaleStatus;
      const syStatus = cy + rStatus.y * scaleStatus;

      // Render only if facing towards the camera (rz < 0)
      if (rStatus.z < 0) {
        // Small blue LED indicator
        const statusPulse = 2 + 1.2 * Math.sin(state.pulseTime * 6);
        ctx.beginPath();
        ctx.arc(sxStatus, syStatus, statusPulse * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8"; // Bright sky blue led
        ctx.shadowBlur = 8 * window.devicePixelRatio;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset

        // Small monospace "STATUS" text next to the LED, aligning exactly with the photo!
        ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
        ctx.font = `${Math.round(7.5 * window.devicePixelRatio)}px monospace`;
        ctx.fillText("STATUS", sxStatus + 6 * window.devicePixelRatio, syStatus + 2.5 * window.devicePixelRatio);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [productId, color, glowColor]);

  // Drag-to-Rotate Mouse Coordinate Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const state = rotationRef.current;
    state.isDragging = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const state = rotationRef.current;
    if (!state.isDragging) return;
    
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    state.targetAngleY += dx * 0.0075; // Adjust rotation speed
    state.targetAngleX = Math.max(-1.4, Math.min(0.2, state.targetAngleX + dy * 0.0075)); // Pitch limits

    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const handleMouseUp = () => {
    rotationRef.current.isDragging = false;
  };

  // Mobile Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    const state = rotationRef.current;
    state.isDragging = true;
    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const state = rotationRef.current;
    if (!state.isDragging) return;
    
    // Prevent mobile pull-to-refresh or page scrolling while rotating 3D model
    if (e.cancelable) e.preventDefault();

    const dx = e.touches[0].clientX - state.startX;
    const dy = e.touches[0].clientY - state.startY;

    state.targetAngleY += dx * 0.009;
    state.targetAngleX = Math.max(-1.4, Math.min(0.2, state.targetAngleX + dy * 0.009));

    state.startX = e.touches[0].clientX;
    state.startY = e.touches[0].clientY;
  };

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none flex items-center justify-center">
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full block touch-none"
      />
    </div>
  );
};

export const ProductViewer = () => {
  const [selected, setSelected] = useState(products[0]);

  return (
    <div className="flex flex-col items-center py-20 px-4 w-full">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Interactive 3D Cushion Canvas Panel */}
        <div className="relative flex items-center justify-center aspect-square rounded-[3rem] bg-neutral-950/80 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden group">
          {/* Futuristic subtle background grid & ambient light */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Animated Glow Blurs backing the Canvas */}
          <div 
            className="absolute w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-700" 
            style={{ backgroundColor: selected.glowColor.replace('0.9', '0.3').replace('0.8', '0.3') }}
          />

          {/* Interactive Canvas Rendering container */}
          <div className="w-full h-full p-4 flex items-center justify-center relative z-10">
            <Cushion3D 
              productId={selected.id}
              color={selected.color}
              glowColor={selected.glowColor}
            />
          </div>

          {/* Hologram Floating Badges */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
            <Rotate3d className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
            <span>Interactive 3D Mesh</span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Drag to rotate</span>
          </div>
        </div>

        {/* Right: Product Info & Selector */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
              <Sparkles size={14} /> Premium Ergonomics
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Smart <span className="text-primary">Cushion</span>
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
              {selected.description} Crafted with multi-density memory foam and integrated sensor fabric.
            </p>
          </div>

          <div className="space-y-4">
            <p className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
              <Palette size={16} className="text-primary" /> Choose Your Style
            </p>
            <div className="flex gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelected(product)}
                  className={`group relative w-12 h-12 rounded-full border-2 transition-all p-1 ${
                    selected.id === product.id ? "border-primary scale-110" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner" 
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {product.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 mt-4">
            <p className="text-sm text-neutral-500 italic">
              Designed for long-term health and focus. Every detail is engineered to support your natural posture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
