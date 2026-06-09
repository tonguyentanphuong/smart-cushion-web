"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { AlertCircle, Zap, Shield, Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "The Silent Killer",
    problem: "Physical inactivity and poor sitting postures account for approximately 3.2 million annual deaths globally, representing 6% of global mortality.",
    solution: "Smart-Cushion proactively tracks your posture to break sedentary patterns and lower long-term health risks.",
    icon: AlertCircle,
    color: "text-red-500",
    image: "/1. silent killer.png"
  },
  {
    title: "Spinal Misalignment",
    problem: "Improper sitting posture leads to thoracic kyphosis, lumbar compression, high muscle tension, and abnormal vertebral alignment (such as a 38-degree tilt angle).",
    solution: "Smart-Cushion detects these bad sitting angles in real-time, alerting you to adjust and prevent spinal compression.",
    icon: Shield,
    color: "text-yellow-500",
    image: "/2. result of silent killer.png"
  },
  {
    title: "Rising Disease Trend",
    problem: "The global low back pain (LBP) burden is rising rapidly, increasing from 619 million cases in 2020 to a projected 843 million cases by 2050.",
    solution: "Smart-Cushion helps you maintain spinal health continuously, preventing you from becoming part of this growing global statistic.",
    icon: Heart,
    color: "text-emerald-500",
    image: "/3. xu huong phat benh.png"
  },
];

export const SolutionsScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = Array.from({ length: 5 });
  const itemsCount = sections.length;

  // Sync activeSlide with scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (itemsCount - 1));
    if (index !== activeSlide) setActiveSlide(index);
  });

  const navigateTo = (index: number) => {
    const targetIndex = Math.max(0, Math.min(itemsCount - 1, index));
    window.scrollTo({
      top: (containerRef.current?.offsetTop || 0) + (targetIndex * window.innerHeight),
      behavior: 'smooth'
    });
  };

  const isScrolling = useRef(false);

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      
      e.preventDefault();
      
      if (isScrolling.current) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetSlide = activeSlide + direction;
      
      if (targetSlide >= 0 && targetSlide < itemsCount) {
        isScrolling.current = true;
        navigateTo(targetSlide);
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 750);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      
      let direction = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        direction = 1;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        direction = -1;
      }
      
      if (direction !== 0) {
        e.preventDefault();
        
        if (isScrolling.current) return;
        
        const targetSlide = activeSlide + direction;
        if (targetSlide >= 0 && targetSlide < itemsCount) {
          isScrolling.current = true;
          navigateTo(targetSlide);
          
          setTimeout(() => {
            isScrolling.current = false;
          }, 750);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSlide, itemsCount]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-neutral-950">
      {/* Snap Points Container */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {sections.map((_, i) => (
          <div key={i} className="h-screen w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden touch-none lg:touch-auto">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f633,transparent_70%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="relative h-[80vh]">
            
            {/* Intro Slide */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.1, 0.25], [1, 1, 0]),
                y: useTransform(smoothProgress, [0, 0.1, 0.25], [0, 0, -50]),
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center"
            >
              <motion.div
                initial={{ filter: "blur(20px)", scale: 0.9 }}
                whileInView={{ filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h2 className="text-5xl lg:text-9xl font-bold text-white mb-8 tracking-tighter drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  A Journey through <br/>
                  <span className="text-primary italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 animate-pulse">
                    the Problem.
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl text-neutral-400 max-w-3xl leading-relaxed mx-auto">
                  Understanding the silent impact of sedentary lifestyles is the first step toward a <span className="text-white font-semibold">revolutionary recovery.</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Solution Slides */}
            {solutions.map((item, index) => {
              const activePoint = (index + 1) / (itemsCount - 1);
              const range = 0.1;

              const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
              const x = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [100, 0, -100]);
              const scale = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0.9, 1, 0.9]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity, x, scale }}
                  className="absolute inset-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
                >
                  {/* Left Side: Cinematic Illustration */}
                  <div className="flex-1 w-full h-[40vh] lg:h-[60vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                       <div className={`p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 ${item.color}`}>
                         <item.icon size={32} />
                       </div>
                    </div>
                  </div>

                  {/* Right Side: Text Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <span className={`text-sm font-mono uppercase tracking-widest mb-4 block ${item.color}`}>
                      Challenge {index + 1}
                    </span>
                    <h3 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-red-400/80 text-sm font-bold uppercase mb-2">The Crisis</p>
                        <p className="text-lg text-neutral-300">{item.problem}</p>
                      </div>
                      
                      <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <p className="text-primary text-sm font-bold uppercase mb-2">The Solution</p>
                        <p className="text-lg text-white font-medium">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Closing Slide */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.75, 0.9, 1.0], [0, 1, 1]),
                y: useTransform(smoothProgress, [0.75, 0.9], [50, 0]),
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 -z-10">
                 <div className="absolute bottom-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-40" 
                      style={{ transform: 'perspective(1000px) rotateX(75deg) translateY(200px) scale(2)' }}
                 />
                 <motion.div 
                   animate={{
                     scale: [1, 1.2, 1],
                     opacity: [0.1, 0.25, 0.1],
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[150px] rounded-full"
                 />
              </div>

              <h2 className="text-5xl lg:text-9xl font-bold text-white mb-8 tracking-tighter relative z-10">
                Check our <br/><span className="text-primary italic font-black">solution.</span>
              </h2>
              <p className="text-xl lg:text-3xl text-neutral-400 max-w-2xl mb-12 font-medium relative z-10">
                Join thousands of office professionals who have already reclaimed their spinal health.
              </p>
              <a href="/features" className="relative z-20 px-12 py-6 bg-white text-black rounded-full font-bold text-2xl hover:bg-primary hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 cursor-pointer">
                View Our Product
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex lg:hidden absolute bottom-12 left-0 w-full justify-between px-6 z-[100] pointer-events-none">
          <button 
            onClick={() => navigateTo(activeSlide - 1)}
            className={`p-4 rounded-full bg-black/80 border border-white/20 text-white pointer-events-auto active:scale-90 transition-all backdrop-blur-lg ${activeSlide === 0 ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={() => navigateTo(activeSlide + 1)}
            className={`p-4 rounded-full bg-primary text-white pointer-events-auto active:scale-90 transition-all shadow-2xl shadow-primary/40 ${activeSlide === itemsCount - 1 ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === itemsCount - 1}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
