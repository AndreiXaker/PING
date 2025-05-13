import { useEffect, useState } from "react";
import styled from "styled-components";
import { limitBet } from "../../../api/api";
import { useGameStore } from "../../../store/store";

interface BetLimitSelectorProps {
  count: number;
  index: number;
}

interface BetProps {
  selectedIndex: number;
  setSelectedIndex: (index: number, amount : number) => void;
  coinIndex?: number;
}

const BetLimitSelector = ({ selectedIndex, setSelectedIndex, coinIndex }: BetProps) => {
  const [bets, setBets] = useState<string[]>([]);
  const { setBetAmount } = useGameStore();
  const handleSelection = (index: number, amount: number) => {
    setSelectedIndex(index, amount);
    setBetAmount(amount)
  };

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const data = await limitBet();
        if (Array.isArray(data)) {
          if (coinIndex !== undefined) {
            const selectedCoinBets = data[coinIndex]?.allowed_bets || [];
            setBets(selectedCoinBets);
          } else {
            const allBets = data.flatMap((item) => item.allowed_bets);
            const uniqueBets = Array.from(new Set(allBets));
            setBets(uniqueBets);
          }
        }
      } catch (error) {
        console.error("Error fetching bet limits:", error);
        setBets([]);
      }
    };

    fetchBets();
  }, [coinIndex]);

  if (bets.length === 0) {
    return null;
  }

  return (
    <StyledWrapper count={bets.length} index={selectedIndex}>
      <div className="radio-input">
        {bets.map((bet, idx) => {
          const amount = parseFloat(bet);
          return (
            <label key={idx}>
              <input
                type="radio"
                checked={selectedIndex === idx}
                onChange={() => handleSelection(idx, amount)}
              />
              <span>{amount}</span>
            </label>
          );
        })}
        <span className="selection" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<BetLimitSelectorProps>`
  .radio-input input {
    display: none;
  }

  .radio-input {
    --container_width: 250px;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: #212121;
    color: #fff;
    width: var(--container_width);
    height: 50px;
    overflow: hidden;
    border: 2px solid #fff;
  }

  .radio-input label {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    font-weight: 600;
    letter-spacing: -1px;
    font-size: 14px;
  }

  .selection {
    display: none;
    position: absolute;
    height: 100%;
    width: ${({ count }) => `calc(var(--container_width) / ${count})`};
    z-index: 0;
    left: 0;
    top: 0;
    transition: transform 0.15s ease;
    transform: ${({ index }) => `translateX(${index * 100}%)`};
    background-color: #00bcd4;
  }

  .radio-input label:has(input:checked) {
    color: #000;
  }

  .radio-input label:has(input:checked) ~ .selection {
    display: inline-block;
  }

  /* Динамические стили для разных позиций */
  ${({ count }) => {
    let styles = '';
    for (let i = 0; i < count; i++) {
      styles += `
        .radio-input label:nth-child(${i + 1}):has(input:checked) ~ .selection {
          transform: translateX(${i * 100}%);
        }
      `;
    }
    return styles;
  }}
`;

export default BetLimitSelector;