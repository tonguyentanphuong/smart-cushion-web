"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Cpu, Zap, Monitor, Cloud, Brain, ArrowRightIcon, Sparkles } from "lucide-react";

const environments = [
  { id: "office", label: "Modern Office", image: "/hero-office.png", color: "from-blue-500/20" },
  { id: "classroom", label: "Smart Classroom", image: "/hero-classroom.png", color: "from-primary/20" },
];

export default function Hero() {
  const [activeEnv, setActiveEnv] = useState(environments[0]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-neutral-300 tracking-wide uppercase">AI-Powered Ergonomic Excellence</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                The Future of <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient-x italic">
                  Healthy Sitting.
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl leading-relaxed font-medium">
                Transform your sitting habits with our IoT-enabled smart cushion. 
                Real-time posture detection, AI coaching, and deep health insights.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <a href="/features">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg font-bold group shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                    Explore Solution
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                
                {/* Environment Toggles */}
                <div className="flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                   {environments.map((env) => (
                     <button
                       key={env.id}
                       onClick={() => setActiveEnv(env)}
                       className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                         activeEnv.id === env.id ? "bg-white text-black shadow-lg" : "text-neutral-400 hover:text-white"
                       }`}
                     >
                       {env.label}
                     </button>
                   ))}
                </div>
              </div>

              {/* Data Journey Card */}
              <div className="mt-16 flex flex-col items-center lg:items-start w-full">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-8 font-bold">Data Journey: From Office to Cloud</p>
                
                <div className="relative w-full max-w-3xl bg-neutral-900/40 border border-white/5 rounded-[3rem] p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden group hover:border-primary/20 transition-colors backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 relative z-10">
                    {[
                      { icon: Monitor, label: "Office", color: "text-neutral-400" },
                      { icon: ArrowRightIcon, isArrow: true },
                      { icon: Cpu, label: "ESP32", color: "text-orange-500" },
                      { icon: ArrowRightIcon, isArrow: true },
                      { icon: Zap, label: "MQTT", color: "text-yellow-500" },
                      { icon: ArrowRightIcon, isArrow: true },
                      { icon: Brain, label: "AI/ML", color: "text-blue-500" },
                      { icon: ArrowRightIcon, isArrow: true },
                      { icon: Cloud, label: "Cloud", color: "text-primary" },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4 md:gap-8">
                        {step.isArrow ? (
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-neutral-700 hidden sm:block"
                          >
                            <step.icon size={16} />
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${step.color}`}>
                              <step.icon size={28} />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">{step.label}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content: Product Visualization with Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeEnv.color} blur-[150px] rounded-full transition-colors duration-1000`} />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEnv.id}
                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <img 
                      src={activeEnv.image} 
                      alt={activeEnv.label} 
                      className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                    />
                    
                    {/* Minimalist Tech Status */}
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">System Online</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
