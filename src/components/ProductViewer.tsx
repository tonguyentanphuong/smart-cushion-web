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
    color: "#050505", // Deep dark black
    glowColor: "rgba(249,115,22,0.8)", // Orange glow
    image: "/cushion-black.png",
  },
  {
    id: "blue",
    name: "Electric Blue",
    description: "A vibrant accent that brings energy to your workspace.",
    color: "#3b82f6", // Electric blue
    glowColor: "rgba(59,130,246,0.9)", // Blue glow
    image: "/cushion-blue.png",
  },
  {
    id: "slate",
    name: "Slate Gray",
    description: "Modern, neutral, and blends perfectly with any office chair.",
    color: "#64748b", // Slate gray
    glowColor: "rgba(148,163,184,0.9)", // Slate glow
    image: "/cushion-slate.png",
  },
];

// Interactive Photorealistic 3D Cushion Component
interface PhotorealisticCushion3DProps {
  productId: string;
  image: string;
  name: string;
}

const PhotorealisticCushion3D: React.FC<PhotorealisticCushion3DProps> = ({ productId, image, name }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move handler to compute tilt angles and light glide positions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Position of cursor relative to element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates around the center (-1 to 1)
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    setCoords({ x: normalizedX, y: normalizedY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Compute CSS transforms
  const rotateX = isHovered ? -coords.y * 12 : 0; // Pitch angle (clamped)
  const rotateY = isHovered ? coords.x * 12 : 0;  // Yaw angle (clamped)
  
  // Shadow shifts in the opposite direction of the tilt to enhance spatial 3D effect!
  const shadowX = isHovered ? -coords.x * 15 : 0;
  const shadowY = isHovered ? -coords.y * 15 : 0;

  // Glossy spotlight coordinates in percent
  const spotX = isHovered ? (coords.x + 1) * 50 : 50;
  const spotY = isHovered ? (coords.y + 1) * 50 : 50;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative flex items-center justify-center transition-all duration-300 group/parallax cursor-pointer"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Realistic Soft Floor Shadow (Translates in opposite direction of tilt) */}
      <div 
        className="absolute w-[80%] h-[12%] bg-black/60 rounded-full blur-[18px] bottom-[5%] pointer-events-none transition-all"
        style={{
          transform: `translateX(${shadowX}px) translateY(${shadowY}px) scale(${isHovered ? 1.05 : 1}) translateZ(-10px)`,
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* Main 3D Card Body (Tilts and Scales) */}
      <div
        className="w-[90%] h-[90%] relative rounded-[2rem] overflow-hidden flex items-center justify-center"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
          transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Photorealistic Product Image */}
        <img 
          src={image} 
          alt={name} 
          className="w-[95%] h-[95%] object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 pointer-events-none"
          style={{
            transform: isHovered ? "translateZ(30px) scale(1.02)" : "translateZ(0px) scale(1)",
            transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />

        {/* Dynamic Glossy Light Highlight Overlay Layer (Spot gloss reflection) */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover/parallax:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`,
            transition: isHovered ? "none" : "background 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />

        {/* Dynamic Glass Glare (adds a realistic glass-like reflection sheen) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/parallax:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(${135 + rotateY}deg, rgba(255, 255, 255, 0.05) 0%, transparent 40%)`,
          }}
        />
      </div>
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
            <PhotorealisticCushion3D 
              productId={selected.id}
              image={selected.image}
              name={selected.name}
            />
          </div>

          {/* Hologram Floating Badges */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest pointer-events-none">
            <Rotate3d className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
            <span>3D Parallax</span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest pointer-events-none">
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Hover to tilt</span>
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
