import { Layout } from "antd";
import { useState } from "react";
const { Header } = Layout;
import RadioSelector from "./radioSelector/RadioSelect";
import BetLimitSelector from "./radioSelector/BetLimitSelector";
import WalletBalance from "./Balance/Wallet";
import ButtonIo from "../ui/ButtonIO";
import ModalComponent from "../Modal";
import { useGameStore } from "../../store/store";



export default function CustomHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCoinSymbol, setBetAmount} = useGameStore()
  const [coinIdx, setCoinIdx] = useState(0)
  const [betIdx, setBetIdx] = useState(0)

  const onBetChange = (_idx: number, amount: number) => {
    setBetIdx(_idx)
    setBetAmount(amount)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const onCoinChange = (idx: number, symbol: string) => {
    setCoinIdx(idx)
    setCoinSymbol(symbol)
    setBetIdx(0)
    setBetAmount(0)
  }



  return (
    <Header className="flex justify-between bg-[#131722] py-2 px-4">
      <div className="flex gap-4">
        <RadioSelector
          selectedIndex={coinIdx}
          setSelectedIndex={onCoinChange}
        />
        <BetLimitSelector
          selectedIndex={betIdx}
          setSelectedIndex={onBetChange}
          coinIndex={coinIdx}
        />
      </div>
        <div className="flex items-center gap-4">
        <WalletBalance openModal={handleOpenModal}/>
        <ButtonIo/>
        <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleCloseModal}/>
      </div>
    </Header>
  );
}