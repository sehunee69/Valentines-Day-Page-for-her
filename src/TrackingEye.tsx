import React, { useState, useEffect, useRef } from "react";

interface TrackingEyeProps {
  top: string;    // e.g., "32%"
  left: string;   // e.g., "45%"
  mousePos: { x: number; y: number };
}

const TrackingEye: React.FC<TrackingEyeProps> = ({ top, left, mousePos }) => {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const socketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socketRef.current) {
      const rect = socketRef.current.getBoundingClientRect();
      
      // Calculate center of the eye socket
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle between eye and mouse
      const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
      
      // Limit the pupil movement radius (so it stays in the eye)
      const maxDistance = 6; 
      
      setPupilPos({
        x: Math.cos(angle) * maxDistance,
        y: Math.sin(angle) * maxDistance,
      });
    }
  }, [mousePos]);

  return (
    <div
      ref={socketRef}
      className="absolute flex items-center justify-center"
      style={{
        top,
        left,
        width: "30px", // Size of the eye socket
        height: "15px",
        backgroundColor: "transparent",
      }}
    >
      {/* The Red Pupil */}
      <div
        className="rounded-full bg-red-600 shadow-[0_0_12px_#ff0000]"
        style={{
          width: "6px",
          height: "6px",
          transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
          transition: "transform 0.05s ease-out", // Smooth movement
        }}
      />
    </div>
  );
};

export default TrackingEye;