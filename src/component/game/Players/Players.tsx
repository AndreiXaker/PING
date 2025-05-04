import styled from 'styled-components';

interface PlayerCountProps {
  players: number;
}

const PlayerCountCard = ({ players }: PlayerCountProps) => {
  return (
    <StyledWrapper>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Игроков в комнате</div>
          <div className="stat-value animate-count">{players}</div>
          
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .stats {
    display: inline-grid;
    background-color: #111111;
    color: #fff;
    border-radius: 1rem;
    border: 1px solid gray;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
    }
  }

  .stat {
    display: inline-grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    column-gap: 1rem;
    padding: 1rem 1.5rem;
  }
.stat-value.animate-count {
    animation: count-up 0.5s ease-in-out;
  }

  @keyframes count-up {
    from { 
      transform: translateY(5px);
      opacity: 0;
      color: #00bcd490;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
      color: #00bcd4;
    }
  }

  .stat-title {
    grid-column-start: 1;
    white-space: nowrap;
    color: rgb(197, 194, 194);
    font-size: 0.875rem;
  }

  .stat-value {
    grid-column-start: 1;
    white-space: nowrap;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #00bcd4;
    transition: color 0.3s ease;
    
    &.animate-count {
      transition: all 0.5s ease-in-out;
    }
  }

  .stat-desc {
    grid-column-start: 1;
    white-space: nowrap;
    font-size: 0.75rem;
    color: rgb(197, 194, 194);
  }

  @keyframes count-up {
    from { transform: translateY(5px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export default PlayerCountCard;