
import MagicCard from "./magicCard";
import "./Card.css";


interface CardsListProps {
    maxPlayers: number;
    onCardClick?: (i: number) => void;
  }
  

const CardsList: React.FC<CardsListProps> = ({ maxPlayers, onCardClick }) => (
    <div className="game-room-grid">
      {Array.from({ length: maxPlayers }).map((_, idx) => (
        <MagicCard
          key={idx}
          value={idx + 1}
          onClick={() => onCardClick?.(idx + 1)}
        />
      ))}
    </div>
  );
  

  export default CardsList;
  