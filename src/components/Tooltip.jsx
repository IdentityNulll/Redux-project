import { useState, useRef } from "react";

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ref = useRef();

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect();

    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });

    setVisible(true);
  };

  return (
    <div
      ref={ref}
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className="fixed z-[9999] bg-black text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap"
          style={{
            top: coords.y - 8,
            left: coords.x,
            transform: "translate(-50%, -100%)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}