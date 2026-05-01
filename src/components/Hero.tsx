"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Cpu, Zap, Monitor, Cloud, Brain, ArrowRightIcon, Sparkles, Home, School, Briefcase } from "lucide-react";

const environments = [
  { id: "office", label: "Modern Office", icon: Briefcase, image: "/hero-office.png", color: "from-blue-500/20" },
  { id: "classroom", label: "Smart Classroom", icon: School, image: "/hero-classroom.png", color: "from-primary/20" },
  { id: "home", label: "Home & Living", icon: Home, image: "/hero.png", color: "from-purple-500/20" },
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
              
              <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                The Future of <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient-x italic">
                  Healthy Sitting.
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-neutral-400 mb-10 max-w-2xl leading-relaxed font-medium">
                Transform your sitting habits with our IoT-enabled smart cushion. 
                Real-time posture detection, AI coaching, and deep health insights.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <a href="/features">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-bold group shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                    Explore Solution
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>

              {/* Refined Data Journey Card */}
              <div className="mt-16 flex flex-col items-center lg:items-start w-full">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/80 mb-6 font-bold">The Neural Data Journey</p>
                
                <div className="relative w-full max-w-2xl bg-neutral-900/60 border border-white/5 rounded-[2rem] p-6 md:p-8 flex items-center justify-center overflow-hidden backdrop-blur-xl group hover:border-primary/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
                  
                  <div className="flex items-center justify-between w-full relative z-10 gap-1 md:gap-2">
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
                      <React.Fragment key={idx}>
                        {step.isArrow ? (
                          <motion.div
                            animate={{ 
                              x: [0, 3, 0],
                              opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-primary/40"
                          >
                            <step.icon size={12} />
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 flex-1">
                            <div className={`p-2.5 md:p-3.5 rounded-xl bg-white/5 border border-white/10 ${step.color} shadow-lg transition-transform group-hover:scale-105 duration-500`}>
                              <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-tighter text-neutral-500 font-bold">{step.label}</span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-2xl mx-auto"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${activeEnv.color} blur-[150px] rounded-full transition-all duration-700`} />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <motion.div
                  key={activeEnv.id}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <img 
                    src={activeEnv.image} 
                    alt={activeEnv.label} 
                    className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-[2rem]"
                  />
                  
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">System Online</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl relative z-50"
            >
               {environments.map((env) => (
                 <button
                   key={env.id}
                   onClick={() => setActiveEnv(env)}
                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                     activeEnv.id === env.id 
                       ? "bg-white text-black shadow-xl scale-105" 
                       : "text-neutral-400 hover:text-white hover:bg-white/5"
                   }`}
                 >
                   <env.icon size={16} />
                   <span>{env.label}</span>
                 </button>
               ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
