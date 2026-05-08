"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Cloud, Smartphone, Activity, BrainCircuit, Database } from "lucide-react";

const nodes = [
  { id: "edge", title: "Smart Cushion", desc: "FSR Sensor Matrix", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "esp", title: "Edge MCU", desc: "ESP32 Pre-processing", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { id: "fog", title: "Fog Node", desc: "CNN Inference Model", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: true },
  { id: "cloud", title: "AWS Cloud", desc: "IoT Core & Lambda", icon: Cloud, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "dashboard", title: "Live Dashboard", desc: "Analytics & Gamification", icon: Smartphone, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export const ArchitectureDiagram = () => {
  return (
    <section className="py-32 bg-black relative border-t border-white/5">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-widest mb-6"
          >
            SYSTEM ARCHITECTURE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
          >
            From Sensor to Screen in <span className="text-primary italic">Milliseconds</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Our Cloud-Fog architecture pushes the deep learning intelligence to the local network edge, guaranteeing ultra-low latency, absolute privacy, and minimal cloud costs.
          </motion.p>
        </div>

        {/* Diagram Container */}
        <div className="max-w-6xl mx-auto relative mt-16 pb-12">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
             {/* Animated Data Particles */}
             <motion.div 
               className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
               animate={{ left: ["-10%", "110%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
             <motion.div 
               className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
               animate={{ left: ["-10%", "110%"] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
             />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 relative">
            {nodes.map((node, i) => (
              <React.Fragment key={node.id}>
                
                {/* Node Item */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring" }}
                  className="flex flex-col items-center w-full lg:w-48 group relative z-10"
                >
                  <div className={`w-20 h-20 md:w-[88px] md:h-[88px] rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(var(--primary),0.3)] bg-black/50 ${node.bg} ${node.border} ${node.glow ? 'shadow-[0_0_30px_rgba(var(--primary),0.2)] border-primary/40' : ''} relative`}>
                    <node.icon className={`w-10 h-10 md:w-12 md:h-12 ${node.color} transition-transform duration-500 group-hover:scale-110`} />
                    
                    {/* Pulsing effect for Fog Node */}
                    {node.glow && (
                      <span className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-50" />
                    )}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <h4 className="text-white font-bold text-lg tracking-wide mb-1.5">{node.title}</h4>
                    <p className="text-neutral-500 text-sm font-medium">{node.desc}</p>
                  </div>
                </motion.div>

                {/* Mobile/Tablet Arrow */}
                {i < nodes.length - 1 && (
                  <div className="lg:hidden w-[2px] h-12 bg-white/10 relative overflow-hidden my-2">
                     <motion.div 
                       className="absolute left-0 right-0 h-4 bg-primary"
                       animate={{ top: ["-100%", "200%"] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          
        </div>
        
        {/* Additional Technical Detail Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto mt-20 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500"
        >
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           
           <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 shrink-0 shadow-[0_0_30px_rgba(var(--primary),0.1)]">
              <Database className="w-8 h-8 text-primary" />
           </div>
           <div>
              <h4 className="text-white font-bold text-xl mb-3 flex items-center gap-3">
                Why Fog Computing?
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Performance
                </span>
              </h4>
              <p className="text-neutral-400 text-base leading-relaxed">
                By deploying our <strong className="text-white font-semibold">Lightweight Convolutional Neural Network (CNN)</strong> on the local Fog Node, 
                we completely eliminate the need to stream heavy, raw FSR matrix data to the cloud. AWS only receives the final inference output (a few bytes per event), 
                allowing instantaneous state updates for your gamified Capybara dashboard while reducing bandwidth by over 99%.
              </p>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
