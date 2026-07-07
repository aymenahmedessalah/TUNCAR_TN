import React from 'react';
import { motion } from 'framer-motion';
import { PartType } from './TechnicalMapPage';
import './TechnicalMap.css';

interface TechnicalMapProps {
  activePart: PartType;
  onPartSelect: (p: PartType) => void;
}

export default function TechnicalMap({ activePart, onPartSelect }: TechnicalMapProps) {
  const parts: PartType[] = ['engine', 'transmission', 'suspension', 'electrique'];

  return (
    <div className="canvas-container">
      <img src="/maps/car-wireframe.png" alt="Car Map" className="wireframe-layer" />
      
      {parts.map((part) => (
        <motion.div 
          key={part as string}
          className={`hotspot ${part} ${activePart === part ? 'active' : ''}`}
          onClick={() => onPartSelect(part)}
          whileHover={{ scale: 1.2 }}
        >
          {activePart === part && <div className="hotspot-pulse" />}
        </motion.div>
      ))}
    </div>
  );
}