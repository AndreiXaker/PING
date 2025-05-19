import React from 'react';
import styled from 'styled-components';

interface CardsListProps {
  maxPlayers: number;
  onCardClick: (cellNumber: number) => void;
}

const CardsList: React.FC<CardsListProps> = ({ maxPlayers, onCardClick }) => {
  const cells = Array.from({ length: maxPlayers }, (_, i) => i + 1);

  return (
    <StyledWrapper>
      <div className="container">
        {cells.map((num) => (
          <div key={num} className="card" onClick={() => onCardClick(num)}>
            <div className="box">
              <div className="content">
                <span className="heading">{num.toString().padStart(2, '0')}</span>
                <span className="content">Ячейка</span>
                <p>Выберите ячейку для ставки</p>
                <a href="#" onClick={(e) => e.preventDefault()}>Сделать ставку</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  border-radius: 20px;
}

.container .card {
  width : 31%; 
  height: 250px;
  position: relative;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.3),
    -5px -5px 15px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: 0.5s;
  cursor: pointer;
}

  .container .card .box {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: #2a2b2f;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: 0.5s;
  }

  .container .card .box:hover {
    transform: translateY(-20px);
  }

  .container .card .box:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.03);
  }

  .container .card .box .content {
    padding: 20px;
    text-align: center;
    position: relative;
  }

  .container .card .box .content .heading {
    position: absolute;
    top: -10px;
    right: 30px;
    font-size: 5rem;
    color: rgba(255, 255, 255, 0.1);
  }

  .container .card .box .content .content {
    font-size: 1.5rem;
    color: #fff;
    z-index: 1;
    margin-bottom: 15px;
  }

  .container .card .box .content p {
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
  }

  .container .card .box .content a {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 20px;
    background: #2196f3;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: 0.3s;
  }

  .container .card .box .content a:hover {
    background: #fff;
    color: #000;
  }
`;

export default CardsList;
