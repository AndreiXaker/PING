import React, { useEffect, useState } from "react";
import { useDepositMutation } from "../hooks/useDeposit";
import { message } from "antd";
import { transfer, qrCode,userLogin,wallet } from "../api/api";
import { useCoinLimits } from "../hooks/useCoinLimits";
interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { data: coinLimits, isLoading } = useCoinLimits();
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [, setQrLoading] = useState<boolean>(false);
  const [memoPhrase, setMemoPhrase] = useState<string>("");
  const [walletAddressFromApi, setWalletAddressFromApi] = useState<string | null>(null)

  useEffect(() => {
    const fetchMemoPhrase = async () => {
      const memo = await userLogin();
      setMemoPhrase(memo);
    }
    fetchMemoPhrase()
  },[])

  useEffect(() => {
    const fetchWallet = async() => {
      const data = await wallet();
      if (data?.contract_address){
        setWalletAddressFromApi(data.contract_address)
      }
    }
    fetchWallet()
  })

  useEffect(() => {
  const fetchQr = async () => {
    if (isWithdraw) return;
    setQrLoading(true);
    try {
      const base64Image = await qrCode(); 
      setQrImage(base64Image); 
    } catch (error) {
      console.error('Ошибка получения QR-кода:', error);
      setQrImage(null);
    } finally {
      setQrLoading(false);
    }
  };
  fetchQr();
}, [isWithdraw]);

  const depositMutation = useDepositMutation(
    () => {
      message.success("✅ Ваш баланс пополнен. Обновите страницу.");
      onConfirm();
    },
    () => {
      alert("Ошибка пополнения баланса");
    }
  );

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedCurrency) {
      alert("Пожалуйста, выберите валюту");
      return;
    }

    if (isWithdraw) {
      if (!walletAddress || !amount) {
        alert("Пожалуйста, введите сумму и адрес кошелька");
        return;
      }
      try {
        await transfer({
          amount,
          currency: selectedCurrency,
          wallet_address: walletAddress,
        });
        message.success("✅ Перевод отправлен!");
        onConfirm();
        onClose();
      } catch (error) {
        console.error(error);
        message.error("❌ Ошибка при отправке перевода");
      }
    } else {
      // if (!amount) {
      //   alert("Введите сумму пополнения");
      //   return;
      // }
      depositMutation.mutate({ coin: selectedCurrency });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-[95%] sm:w-[500px]">
        <h2 className="text-white text-xl font-bold text-center mb-4">
          {isWithdraw ? "Вывод средств:" : "Пополнение баланса:"}
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setIsWithdraw(false)}
            className={`px-4 py-2 rounded ${!isWithdraw ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}`}
          >
            Пополнение
          </button>
          <button
            onClick={() => setIsWithdraw(true)}
            className={`px-4 py-2 rounded ${isWithdraw ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}`}
          >
            Вывод
          </button>
        </div>

        <div className="mb-4 justify-items-center">
          <label className="text-white">Выберите валюту:</label>
          <div className="space-y-2 mt-2">
            {isLoading ? (
              <p className="text-white">Загрузка валют...</p>
            ) : (
              coinLimits?.map(({ coin }: { coin: string }) => (
                <div key={coin} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id={coin}
                    name="currency"
                    className="hidden"
                    checked={selectedCurrency === coin}
                    onChange={() => handleCurrencyChange(coin)}
                  />
                  <label
                    htmlFor={coin}
                    className={`cursor-pointer p-2 rounded-lg ${
                      selectedCurrency === coin ? "bg-blue-600" : "bg-gray-700"
                    } text-white flex items-center space-x-2 hover:bg-gray-600 w-full`}
                  >
                    <span
                      className={`w-4 h-4 border-2 ${
                        selectedCurrency === coin ? "border-blue-500" : "border-gray-300"
                      } rounded-full flex items-center justify-center`}
                    >
                      {selectedCurrency === coin && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </span>
                    <span>{coin}</span>
                  </label>
                </div>
              ))
            )}
          </div>
          {!isWithdraw && qrImage && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-white text-sm mb-2">QR-код для пополнения:</p>
            <img src={qrImage} alt="QR code" className="w-48 h-48 rounded border border-gray-600" />
          </div>
        )}
        {!isWithdraw && (
          <div className="mt-4 space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Ваш Telegram ID:</p>
              <p className="text-white font-mono text-lg break-all">
                {memoPhrase ? memoPhrase : "Загрузка..."}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Адрес для пополнения:</p>
              <p className="text-white font-mono text-sm break-all">
                {walletAddressFromApi ?? "Загрузка адреса кошелька..."}
              </p>
            </div>
          </div>
        )}
        </div>

        {isWithdraw && (
          <>
            <div className="mb-4">
              <label className="text-white">Сумма:</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full p-2 bg-gray-700 text-white rounded mt-2"
                placeholder="Введите сумму для вывода"
              />
            </div>

            <div className="mb-4">
              <label className="text-white">Адрес кошелька:</label>
              <input
                type="text"
                value={walletAddress}
                onChange={handleWalletAddressChange}
                className="w-full p-2 bg-gray-700 text-white rounded mt-2"
                placeholder="Введите адрес кошелька"
              />
            </div>
          </>
        )}

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Закрыть
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={depositMutation.isLoading}
          >
            {depositMutation.isLoading ? "Загрузка..." : isWithdraw ? "Вывести" : "Пополнить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
