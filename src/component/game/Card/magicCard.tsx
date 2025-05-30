import { useState } from "react";
import "./Card.css";
import { FileQuestionIcon } from "lucide-react";
interface MagicCardProps {
  value: string | number;
  onClick: () => void;
  helpLink?: string;
}

const MagicCard: React.FC<MagicCardProps> = ({ value, onClick,helpLink }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {helpLink && (
        <a
          href={helpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="question-icon"
          onClick={(e) => e.stopPropagation()}
          title="Описание этой карточки"
        >
          <FileQuestionIcon size={16} />
        </a>
      )}
      
      <div className={`card-content ${hovered ? "show" : ""}`}>
        {hovered ? value : ""}
      </div>
    </div>
  );
};

export default MagicCard;
