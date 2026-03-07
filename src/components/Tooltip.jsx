import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black text-white text-sm px-3 py-1 rounded shadow-lg z-50">
          {text}
        </div>
      )}
    </div>
  );
}