"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SparklesCore } from "./ui/SparklesCore";

const problems = [
  {
    title: "The Silent Crisis",
    description: "Modern work environments force us into static positions for hours, leading to chronic back pain and long-term spinal issues.",
    image: "/problem-1.png",
    color: "text-red-500",
    glow: "rgba(239, 68, 68, 0.4)"
  },
  {
    title: "Concentration Drain",
    description: "Poor posture restricted blood flow and oxygen to the brain, causing fatigue and a significant drop in mental focus.",
    image: "/problem-2.png",
    color: "text-yellow-500",
    glow: "rgba(234, 179, 8, 0.4)"
  },
  {
    title: "Spinal Integrity",
    description: "Continuous pressure on lumbar discs can lead to permanent damage. Early detection is the only true prevention.",
    image: "/problem-3.png",
    color: "text-orange-500",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  {
    title: "Health Ecosystem",
    description: "Sitting is the new smoking. Without active monitoring, the risks of cardiovascular and metabolic issues increase daily.",
    image: "/problem-4.png",
    color: "text-rose-500",
    glow: "rgba(244, 63, 94, 0.4)"
  }
];

export const SolutionsScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const itemsCount = problems.length + 2; 

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Sparkles */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="solutionsParticles"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="relative w-full h-full">
          
          {/* 0. Intro Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 0.15], [1, 1, 0]),
              y: useTransform(smoothProgress, [0, 0.1, 0.15], [0, 0, -50]),
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-5xl md:text-9xl font-bold text-white mb-8 tracking-tighter">
              A Journey through <br/> <span className="text-primary italic">the Problem</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              Before we talk about the solution, we must understand the silent impact of our modern lifestyle on our bodies.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 text-primary/40 text-xs font-mono tracking-[0.5em] uppercase"
            >
              Scroll to explore the crisis
            </motion.div>
          </motion.div>

          {/* 1-4. Problem Slides with Illustrations */}
          {problems.map((prob, index) => {
            const activePoint = (index + 1.2) / itemsCount;
            const range = 0.08;

            const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
            const scale = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0.95, 1, 0.95]);
            const x = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [30, 0, -30]);

            return (
              <motion.div
                key={index}
                style={{ opacity, scale, x }}
                className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-10 lg:px-32 gap-16"
              >
                {/* Illustration Column */}
                <div className="flex-1 w-full max-w-2xl relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                    <img 
                      src={prob.image} 
                      alt={prob.title} 
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Text Column */}
                <div className="flex-1 text-left">
                  <span className="text-sm font-mono text-primary mb-4 block uppercase tracking-[0.3em]">Crisis Chapter 0{index + 1}</span>
                  <h2 className="text-4xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                    {prob.title}
                  </h2>
                  <p className="text-xl lg:text-2xl text-neutral-400 max-w-xl leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* 5. Outro Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.9, 0.95], [0, 1]),
              y: useTransform(smoothProgress, [0.9, 0.95], [50, 0]),
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="text-4xl lg:text-8xl font-bold text-white mb-12 leading-tight tracking-tighter">
              Understanding is <br/> 
              <span className="text-primary italic font-serif">the first step.</span>
            </h2>
            <a href="/features" className="px-12 py-6 bg-primary text-white rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(var(--primary),0.3)]">
              Discover the Solution
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
