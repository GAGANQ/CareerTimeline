import React, { useEffect, useState } from 'react';
import { JourneyNode, ThemeConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PathVisualizerProps {
  nodes: JourneyNode[];
  activeId: string | null;
  onNodeClick: (id: string) => void;
  currentTheme?: ThemeConfig;
}

// Updated Female Avatar matching user request (Black Blazer, Bob Hair, Red Lips)
const FemaleAvatar = () => (
  <g transform="translate(-28, -52)"> 
    {/* Back Hair (Bob base) - Dark Black/Brown */}
    <path 
      d="M14 25 Q12 45 16 48 L40 48 Q44 45 42 25 Z" 
      fill="#1A1A1A" 
    />

    {/* Black Blazer (Body) */}
    <path 
      d="M10 52 L46 52 L46 44 C46 36 36 38 28 38 C20 38 10 36 10 44 Z" 
      fill="#111827" 
    />
    
    {/* Blazer Lapels/Collar */}
    <path d="M28 50 L36 42 L28 42 L20 42 L28 50 Z" fill="#1F2937" />

    {/* White Shirt */}
    <path d="M28 38 L32 43 L24 43 Z" fill="#FFFFFF" />

    {/* Neck */}
    <rect x="25" y="32" width="6" height="6" fill="#FDE6D6" />

    {/* Face */}
    <ellipse cx="28" cy="25" rx="10.5" ry="11.5" fill="#FDE6D6" />

    {/* Ears */}
    <circle cx="17.5" cy="27" r="2" fill="#FDE6D6" />
    <circle cx="38.5" cy="27" r="2" fill="#FDE6D6" />

    {/* Front Hair (Bob Style) - Dark Black/Brown */}
    <path 
        d="M28 8 C18 8 13 14 13 30 C13 36 16 34 16 28 C16 18 22 14 28 14 C34 14 40 18 40 28 C40 34 43 36 43 30 C43 14 38 8 28 8" 
        fill="#1A1A1A"
    />

    {/* Eyes */}
    <circle cx="23" cy="26" r="1.5" fill="#1A1A1A" />
    <circle cx="33" cy="26" r="1.5" fill="#1A1A1A" />
    
    {/* Eyelashes */}
    <path d="M21 25.5 L20 24.5" stroke="#1A1A1A" strokeWidth="0.5" />
    <path d="M35 25.5 L36 24.5" stroke="#1A1A1A" strokeWidth="0.5" />

    {/* Eyebrows */}
    <path d="M21 23 Q23 22 25 23" stroke="#1A1A1A" strokeWidth="0.8" fill="none" />
    <path d="M31 23 Q33 22 35 23" stroke="#1A1A1A" strokeWidth="0.8" fill="none" />
    
    {/* Blush */}
    <circle cx="20" cy="30" r="1.5" fill="#FF8A80" opacity="0.3" />
    <circle cx="36" cy="30" r="1.5" fill="#FF8A80" opacity="0.3" />

    {/* Red Lips Smile */}
    <path d="M24 33 Q28 36 32 33" stroke="#E11D48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </g>
);

const PathVisualizer: React.FC<PathVisualizerProps> = ({ nodes, activeId, onNodeClick, currentTheme }) => {
  const [pathD, setPathD] = useState('');
  const [nodePositions, setNodePositions] = useState<{x: number, y: number}[]>([]);

  // Layout Constants
  const VIEWBOX_WIDTH = 500;
  const NODE_SPACING = 160; 
  const CENTER_X = VIEWBOX_WIDTH / 2;
  const SWING = 70; // Wavy path
  const PADDING_TOP = 80;
  const PADDING_BOTTOM = 120;

  // Defaults if no theme provided
  const primaryColor = currentTheme?.primary || '#b47255';
  const secondaryColor = currentTheme?.secondary || '#e0c9b9';

  const calculatePos = (i: number) => {
      const y = PADDING_TOP + i * NODE_SPACING;
      // Wavy path using Sine wave
      const xOffset = Math.sin(i * 0.9) * SWING; 
      const x = CENTER_X + xOffset;
      return { x, y };
  };

  useEffect(() => {
    if (nodes.length === 0) return;

    const positions = nodes.map((_, i) => calculatePos(i));

    setNodePositions(positions);

    let d = `M ${positions[0].x} ${positions[0].y}`;
    for (let i = 0; i < positions.length - 1; i++) {
      const current = positions[i];
      const next = positions[i + 1];
      
      // Smooth Cubic Bezier for road-like flow
      const cp1Y = current.y + NODE_SPACING * 0.5;
      const cp2Y = next.y - NODE_SPACING * 0.5;
      
      // Add some X variation to control points for curvier look
      const cp1X = current.x + (next.x - current.x) * 0.1;
      const cp2X = next.x - (next.x - current.x) * 0.1;

      d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.x} ${next.y}`;
    }
    setPathD(d);
  }, [nodes]);

  const totalHeight = Math.max(600, nodes.length * NODE_SPACING + PADDING_TOP + PADDING_BOTTOM);
  
  const activeIndex = activeId ? nodes.findIndex(n => n.id === activeId) : -1;

  return (
    <div className="relative w-full min-h-[600px] flex justify-center pb-10 select-none">
      <svg 
        width="100%" 
        height={totalHeight} 
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${totalHeight}`}
        preserveAspectRatio="xMidYMin meet"
        className="overflow-visible"
        style={{ maxWidth: '100%' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Path */}
        <path 
          d={pathD} 
          fill="none" 
          stroke={secondaryColor} 
          strokeWidth="4" 
          strokeLinecap="round"
          className="transition-colors duration-1000"
        />
        
        {/* Animated Dashed Path (Career Progress) */}
        <motion.path 
          d={pathD} 
          fill="none" 
          stroke={primaryColor} 
          strokeWidth="6" 
          strokeLinecap="round"
          strokeDasharray="0 16" 
          animate={{ strokeDashoffset: [0, -32] }} 
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          style={{ opacity: 0.6 }}
        />
        
        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = nodePositions[i];
          if (!pos) return null;
          const isActive = activeId === node.id;
          const isPast = activeIndex >= i;
          
          const isLeft = i % 2 !== 0; 
          const labelWidth = 160;
          const xOffset = 55; // Distance from node
          const labelX = isLeft ? pos.x - xOffset - labelWidth : pos.x + xOffset;
          const labelY = pos.y - 35;

          return (
            <g 
              key={node.id} 
              onClick={() => onNodeClick(node.id)} 
              className="cursor-pointer"
            >
              <circle cx={pos.x} cy={pos.y} r="40" fill="transparent" />

              <AnimatePresence>
                {isActive && (
                  <motion.circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    initial={{ r: 10, opacity: 0.6 }}
                    animate={{ r: 35, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    fill={primaryColor}
                  />
                )}
              </AnimatePresence>
              
              <motion.circle 
                cx={pos.x} 
                cy={pos.y} 
                initial={false}
                animate={{ 
                  r: isActive ? 12 : 9,
                  fill: isActive ? primaryColor : (isPast ? primaryColor : "#fff"),
                  stroke: isPast ? primaryColor : secondaryColor,
                  strokeWidth: isActive ? 4 : 3
                }}
                whileHover={{ 
                  scale: 1.3, 
                  filter: `drop-shadow(0 0 8px ${primaryColor})`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              
              <foreignObject x={labelX} y={labelY} width={labelWidth} height="120" className="overflow-visible pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.7, 
                    x: 0,
                    scale: isActive ? 1.05 : 1
                  }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className={`
                    flex items-center gap-3 transition-all duration-300
                    ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'}
                  `}
                >
                   <span className="text-2xl filter drop-shadow-md">{node.emoji}</span>
                   <div className={`flex flex-col ${isLeft ? 'items-end' : 'items-start'}`}>
                     <span className={`
                       font-serif text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border leading-tight transition-all duration-300
                       ${isActive ? 'shadow-md' : ''}
                     `}
                     style={{ 
                       backgroundColor: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
                       color: isActive ? primaryColor : '#475569',
                       borderColor: isActive ? primaryColor : 'transparent',
                       transform: isActive ? 'scale(1.05)' : 'scale(1)'
                     }}
                     >
                       {node.role}
                     </span>
                     <span className="text-[10px] font-bold uppercase tracking-wide px-1 mt-1 leading-tight break-words w-full" style={{color: primaryColor}}>
                        {node.company}
                     </span>
                     <span className="text-[9px] font-medium opacity-60 mt-0.5" style={{color: currentTheme?.text}}>
                        {node.dateRange}
                     </span>
                   </div>
                </motion.div>
              </foreignObject>
            </g>
          );
        })}

        {/* The Professional Character Avatar */}
        {activeId && (() => {
          const activePos = nodePositions[activeIndex];
          if (!activePos) return null;
          
          return (
            <motion.g
              initial={false}
              animate={{ x: activePos.x, y: activePos.y }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            >
              <motion.g
                 animate={{ y: [0, -3, 0], rotate: [0, -1, 0, 1, 0] }}
                 transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                 className="drop-shadow-2xl"
              >
                <FemaleAvatar />
              </motion.g>
            </motion.g>
          );
        })()}
      </svg>
    </div>
  );
};

export default PathVisualizer;