import { useState } from "react";
import "./Card.css";

interface MagicCardProps {
  value: number;
  onClick: () => void;
}

const MagicCard: React.FC<MagicCardProps> = ({ value, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className={`card-content ${hovered ? "show" : ""}`}>
        {hovered ? value : ""}
      </div>
    </div>
  );
};

export default MagicCard;
