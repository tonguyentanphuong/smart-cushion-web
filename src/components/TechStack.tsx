"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  MessageSquare, 
  Database, 
  Zap, 
  Globe 
} from "lucide-react";

const techItems = [
  { icon: Cpu, name: "ESP32", color: "text-orange-500", delay: 0 },
  { icon: Zap, name: "MQTT", color: "text-yellow-500", delay: 0.2 },
  { icon: Layers, name: "AI/ML", color: "text-blue-500", delay: 0.4 },
  { icon: Globe, name: "Astro", color: "text-purple-500", delay: 0.1 },
  { icon: Database, name: "Cloud", color: "text-emerald-500", delay: 0.3 },
  { icon: MessageSquare, name: "React", color: "text-cyan-500", delay: 0.5 },
];

export const TechStack = () => {
  return (
    <section className="py-32 bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase mb-6"
          >
            Engineering Excellence
          </motion.div>
          <h2 className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
            The <span className="text-primary italic">Powerhouse</span> Behind
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            A sophisticated neural architecture blending edge computing, high-precision IoT, and advanced machine learning models.
          </p>
        </div>

        <div className="relative flex items-center justify-center h-[500px] md:h-[600px] w-full">
          {/* Orbital Rings */}
          <div className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full border border-white/5" />
          <div className="absolute w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full border border-white/10" />
          
          {/* Central Hub */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 40px rgba(var(--primary), 0.2)", "0 0 80px rgba(var(--primary), 0.4)", "0 0 40px rgba(var(--primary), 0.2)"] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative w-24 h-24 md:w-36 md:h-36 rounded-full bg-black border-2 border-primary/40 flex items-center justify-center z-20"
          >
            <div className="text-center">
               <span className="text-primary text-2xl md:text-4xl font-black italic">S</span>
               <span className="block text-[8px] md:text-[10px] font-mono text-primary/60 tracking-widest uppercase">Kernel</span>
            </div>
          </motion.div>

          {/* Orbiting Icons */}
          {techItems.map((tech, i) => {
            const angle = (i * 360) / techItems.length;
            const radius = 140; // Mobile
            const desktopRadius = 225; // Desktop
            
            return (
              <motion.div
                key={tech.name}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: -i * 2 }}
                className="absolute w-full h-full pointer-events-none"
              >
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  style={{
                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: -i * 2 }}
                    className="flex flex-col items-center group"
                  >
                    <div className={`p-4 md:p-6 rounded-[1.5rem] bg-neutral-900 border border-white/10 shadow-2xl backdrop-blur-xl ${tech.color} hover:border-primary transition-colors cursor-default`}>
                      <tech.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-3 text-[10px] md:text-xs font-mono font-bold text-white uppercase tracking-widest bg-black/80 px-2 py-1 rounded border border-white/10"
                    >
                      {tech.name}
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-20 relative z-20">
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="text-center">
               <span className="block text-3xl font-black text-white mb-1">99.9%</span>
               <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest">Uptime</span>
            </div>
            <div className="text-center">
               <span className="block text-3xl font-black text-white mb-1">&lt;100ms</span>
               <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest">Latency</span>
            </div>
            <div className="text-center">
               <span className="block text-3xl font-black text-white mb-1">AES-256</span>
               <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest">Security</span>
            </div>
            <div className="text-center">
               <span className="block text-3xl font-black text-white mb-1">9-Axis</span>
               <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest">Precision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
