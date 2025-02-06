import { useState } from "react";
import "./Card.css";

export default function MagicCard({ number }: { number: number }) {
  const [hoverText, setHoverText] = useState("");

  return (
    <div
      className="card"
      onMouseEnter={() => setHoverText(`${number}`)}
      onMouseLeave={() => setHoverText("")}
    >
      {hoverText || "Magic Card"}
    </div>
  );
}
