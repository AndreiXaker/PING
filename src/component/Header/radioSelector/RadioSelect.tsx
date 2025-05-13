import { useEffect, useState } from "react";
import styled from "styled-components";
import { limitBet } from "../../../api/api";

interface StyledWrapperProps {
  count: number;
  index: number
}

interface RadioSelectProps { 
  selectedIndex: number
  setSelectedIndex: (index: number, symbol : string) => void
}


const RadioSelector = ({selectedIndex, setSelectedIndex}: RadioSelectProps) => {
  const [coins, setCoins] = useState<string[]>([]);

  useEffect(() => {
    limitBet().then((data) => {
      if (Array.isArray(data)) {
        setCoins(data.map((item) => item.coin));
        
      }
    });
  }, []);
  
  return (
    <StyledWrapper count={coins.length} index={selectedIndex} >
      <div className="radio-input">
        {coins.map((coin, idx) => (
          <label key={coin}>
            <input
              type="radio"
              name="value-radio"
              value={coin}
              checked={selectedIndex === idx}
              onChange={() => setSelectedIndex(idx, coin)}
            />
            <span>{coin}</span>
          </label>
        ))}
        <span className="selection" />
      </div>
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div<StyledWrapperProps>`
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
    width: var(--container_width: ${({ count }) => count * 80}px);
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
    width: ${({ count }) => 100 / count}%;
    z-index: 0;
    left: ${({ index, count }) => `calc((100% / ${count}) * ${index})`};
    top: 0;
    transition: 0.15s ease;
    transform: translateX(var(--selector-position));
  }

  .radio-input label:has(input:checked) {
    color: #000;
  }

  .radio-input label:has(input:checked) ~ .selection {
    background-color: #00bcd4;;
    display: inline-block;
  }

`;

export default RadioSelector;
