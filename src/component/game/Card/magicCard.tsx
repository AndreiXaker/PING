import { useState } from "react";
import "./Card.css";
interface MagicCardProps {
  number: number;
  onClick: () => void;
}

const MagicCard: React.FC<MagicCardProps> = ({ number, onClick }) =>{
  const [hoverText, setHoverText] = useState("");

  return (
    <div
      className="card"
      onMouseEnter={() => setHoverText(`${number}`)}
      onMouseLeave={() => setHoverText("")}
      onClick={onClick}
    >
      {hoverText || "Magic Card"}
    </div>
  );
}

export default MagicCard
