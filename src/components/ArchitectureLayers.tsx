import React from "react";
import { motion } from "framer-motion";

export const ArchitectureLayers = () => {
  return (
    <section className="py-24 bg-black relative min-h-screen border-t border-white/5">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            System <span className="text-primary italic">Architecture</span> Models
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            A comparative view of standard architectural models applied to the Smart Cushion ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* 3 LAYER - Cloud Computing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="text-8xl font-black text-white mb-4">3</div>
              <h2 className="text-2xl font-bold text-white mb-2">Cloud Computing service models <span className="text-neutral-500 font-normal">(3 Layer)</span></h2>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-end">
              {/* SaaS */}
              <div className="flex items-stretch rounded-xl overflow-hidden border border-emerald-500/30">
                <div className="w-1/3 bg-emerald-500/20 p-4 flex items-center justify-center text-center">
                  <span className="text-emerald-400 font-semibold text-sm">IoT end user</span>
                </div>
                <div className="w-2/3 bg-emerald-500/10 p-4 flex items-center justify-between">
                  <div className="text-xs text-neutral-300">
                    <strong className="text-white text-sm block mb-1">Application</strong>
                    (e.g., Smart home, smart factory, smart metering)
                  </div>
                  <div className="text-emerald-400 font-bold ml-2">SaaS</div>
                </div>
              </div>

              {/* PaaS */}
              <div className="flex items-stretch rounded-xl overflow-hidden border border-orange-500/30">
                <div className="w-1/3 bg-orange-500/20 p-4 flex items-center justify-center text-center">
                  <span className="text-orange-400 font-semibold text-sm">IoT application developer</span>
                </div>
                <div className="w-2/3 bg-orange-500/10 p-4 flex items-center justify-between">
                  <div className="text-xs text-neutral-300">
                    <strong className="text-white text-sm block mb-1">Platform</strong>
                    (e.g., Software frameworks for sensor data processing)
                  </div>
                  <div className="text-orange-400 font-bold ml-2">PaaS</div>
                </div>
              </div>

              {/* IaaS */}
              <div className="flex items-stretch rounded-xl overflow-hidden border border-purple-500/30">
                <div className="w-1/3 bg-purple-500/20 p-4 flex items-center justify-center text-center">
                  <span className="text-purple-400 font-semibold text-sm">IoT application developer</span>
                </div>
                <div className="w-2/3 bg-purple-500/10 p-4 flex items-center justify-between">
                  <div className="text-xs text-neutral-300">
                    <strong className="text-white text-sm block mb-1">Infrastructure</strong>
                    (e.g., Network, storage, computation)
                  </div>
                  <div className="text-purple-400 font-bold ml-2">IaaS</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5 LAYER - IoT Architecture */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="text-8xl font-black text-white mb-4">5</div>
              <h2 className="text-2xl font-bold text-white mb-2">IoT Architecture <span className="text-neutral-500 font-normal">(5 Layer)</span></h2>
              <p className="text-neutral-500 text-sm">(Typical, not a standard)</p>
            </div>

            <div className="flex flex-col gap-3 flex-1 justify-end">
              <Layer5Box name="Business Layer" icon="📊" />
              <div className="flex justify-center"><div className="w-0.5 h-3 bg-white/20" /></div>
              <Layer5Box name="Application Layer" icon="📱" />
              <div className="flex justify-center"><div className="w-0.5 h-3 bg-white/20" /></div>
              <Layer5Box name="Middleware Layer" icon="⚙️" dashed />
              <div className="flex justify-center"><div className="w-0.5 h-3 bg-white/20" /></div>
              <Layer5Box name="Network Layer" icon="🌐" />
              <div className="flex justify-center"><div className="w-0.5 h-3 bg-white/20" /></div>
              <Layer5Box name="Physical Layer" icon="📡" />
            </div>
          </motion.div>

          {/* 7 LAYER - OSI Model */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="text-8xl font-black text-white mb-4">7</div>
              <h2 className="text-2xl font-bold text-white mb-2">OSI model <span className="text-neutral-500 font-normal">(7 layer)</span></h2>
              <p className="text-neutral-500 text-sm">(Open Systems Interconnection)</p>
            </div>

            <div className="flex gap-2 flex-1 items-end">
              
              {/* Data Units */}
              <div className="w-1/4 flex flex-col gap-2 justify-end">
                <DataUnitBox text="Data" height="h-[120px]" />
                <DataUnitBox text="Segments (TCP) Datagrams (UDP)" height="h-12" color="bg-cyan-500/20 text-cyan-400 border-cyan-500/30" />
                <DataUnitBox text="Packets" height="h-12" color="bg-green-500/20 text-green-400 border-green-500/30" />
                <DataUnitBox text="Frames" height="h-12" color="bg-lime-500/20 text-lime-400 border-lime-500/30" />
                <DataUnitBox text="Bits" height="h-12" color="bg-yellow-500/20 text-yellow-400 border-yellow-500/30" />
              </div>

              {/* OSI Layers */}
              <div className="w-3/4 flex flex-col gap-2">
                <OsiLayerBox num={7} name="Application" desc="Network services to Application" color="bg-indigo-500/20 border-indigo-500/30 text-indigo-300" />
                <OsiLayerBox num={6} name="Presentation" desc="Data Formatting and Encryption" color="bg-indigo-500/20 border-indigo-500/30 text-indigo-300" />
                <OsiLayerBox num={5} name="Session" desc="Interhost Communication" color="bg-indigo-500/20 border-indigo-500/30 text-indigo-300" />
                
                <OsiLayerBox num={4} name="Transport" desc="End-to-End Connections and Reliability" color="bg-cyan-500/20 border-cyan-500/30 text-cyan-300" />
                
                <OsiLayerBox num={3} name="Network" desc="Routing and IP (Logical Addressing)" color="bg-green-500/20 border-green-500/30 text-green-300" />
                <OsiLayerBox num={2} name="Data Link" desc="MAC and LLC (Physical Addressing)" color="bg-lime-500/20 border-lime-500/30 text-lime-300" />
                <OsiLayerBox num={1} name="Physical" desc="Media, Signal and Binary Transmission" color="bg-yellow-500/20 border-yellow-500/30 text-yellow-300" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Helper Components
const Layer5Box = ({ name, icon, dashed = false }: { name: string, icon: string, dashed?: boolean }) => (
  <div className={`flex items-center justify-between p-4 rounded-xl border bg-white/5 ${dashed ? 'border-red-500/50 border-dashed' : 'border-blue-500/30'}`}>
    <span className="text-white font-semibold text-sm flex items-center gap-3">
      <span className="text-2xl">{icon}</span> {name}
    </span>
  </div>
);

const DataUnitBox = ({ text, height, color = "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" }: { text: string, height: string, color?: string }) => (
  <div className={`${height} ${color} border rounded-lg p-2 flex items-center justify-center text-center text-[10px] font-bold`}>
    {text}
  </div>
);

const OsiLayerBox = ({ num, name, desc, color }: { num: number, name: string, desc: string, color: string }) => (
  <div className={`h-12 ${color} border rounded-lg flex items-stretch overflow-hidden`}>
    <div className="flex-1 px-3 py-1 flex flex-col justify-center text-center leading-tight">
      <span className="font-bold text-white text-sm">{name}</span>
      <span className="text-[9px] opacity-80">{desc}</span>
    </div>
    <div className="w-8 flex items-center justify-center font-black bg-black/20 border-l border-inherit">
      {num}
    </div>
  </div>
);
