import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 650, y: 300 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity:'.6', 
        pointerEvents: 'none',
        zIndex: 9999,
        
      }}
      
      animate={{ x: mousePos.x-15, y: mousePos.y-15 }}
     transition={{
        type: 'spring',
        stiffness: 500,
        damping: 60,
      }}
    />
  );
}
