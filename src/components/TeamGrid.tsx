import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: "To Nguyen Tan Phuong",
    role: "Hardware & Edge Engineer",
    image: "/Phuong.jpg",
    bg: "bg-blue-500/20",
    description: "Hardware architecture specialist. Phuong focuses on sensor integration and optimizing edge computing performance."
  },
  {
    name: "Tran Viet Nam",
    role: "Fog & Hardware Integration",
    image: "/Nam.png",
    bg: "bg-purple-500/20",
    description: "Architects scalable local infrastructures and bridges the gap between hardware sensors and cloud services."
  },
  {
    name: "Dong Boi Thi",
    role: "Cloud & Dashboard Developer",
    image: "/Thi.jpg",
    bg: "bg-emerald-500/20",
    description: "Specializes in cloud backend frameworks and real-time data visualization systems, ensuring seamless data flow."
  },
  {
    name: "Hoang Mai Vu",
    role: "Mobile App Developer",
    image: "/Vu.jpg",
    bg: "bg-orange-500/20",
    description: "Designs clear, elegant mobile experiences, blending visual storytelling with empathetic user research."
  }
];

export const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {team.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="flex flex-col bg-neutral-900/40 border border-neutral-800/50 p-4 rounded-[1.5rem] hover:border-primary/50 transition-colors duration-300 cursor-pointer backdrop-blur-sm"
        >
          {/* Image Container - Slightly smaller */}
          <div className={`relative w-full aspect-square rounded-[1rem] overflow-hidden mb-4 ${item.bg}`}>
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Info - Centered */}
          <div className="space-y-1 text-center">
            <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
            <p className="text-xs text-primary font-mono uppercase tracking-wider">{item.role}</p>
          </div>

          {/* Dashed Separator - Minimal */}
          <div className="my-3 border-t border-dashed border-neutral-800 w-full" />

          {/* Description - Centered and compact */}
          <p className="text-xs text-neutral-400 leading-relaxed text-center line-clamp-3">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
