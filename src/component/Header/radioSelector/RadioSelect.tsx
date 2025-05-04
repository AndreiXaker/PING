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
    <StyledWrapper count={coins.length} index={selectedIndex}>
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
    width: calc(var(--container_width) / 3);
    z-index: 0;
    left: 0;
    top: 0;
    transition: 0.15s ease;
  }

  .radio-input label:has(input:checked) {
    color: #000;
  }

  .radio-input label:has(input:checked) ~ .selection {
    background-color: #00bcd4;;
    display: inline-block;
  }

  .radio-input label:nth-child(1):has(input:checked) ~ .selection {
    transform: translateX(0%);
  }

  .radio-input label:nth-child(2):has(input:checked) ~ .selection {
    transform: translateX(100%);
  }

  .radio-input label:nth-child(3):has(input:checked) ~ .selection {
    transform: translateX(200%);
  }
`;

export default RadioSelector;
