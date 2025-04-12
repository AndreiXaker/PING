import React, { useState } from "react";
import { useDepositMutation } from "../hooks/useDeposit";


interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  
  const depositMutation = useDepositMutation(
    () => {
      onConfirm(); 
    },
    (error) => {
      alert("Ошибка запроса: " + error.message);
    }
  );

  const handleSubmit = () => {
    if (selectedCurrency && amount) {
      depositMutation.mutate({ coin: selectedCurrency, amount });
    } else {
      alert("Пожалуйста, выберите валюту и введите сумму");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-min">
        <h2 className="text-white text-xl font-bold text-center">Пополнение баланса</h2>

        <div className="m-4 p-2 text-2xl font-bold">
          <label className="text-white">Выберите валюту:</label>
          <div className="space-y-4 mt-2">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="DOGS"
                name="currency"
                className="hidden"
                checked={selectedCurrency === "DOGS"}
                onChange={() => handleCurrencyChange("DOGS")}
              />
              <label
                htmlFor="DOGS"
                className={`cursor-pointer p-2 rounded-lg ${selectedCurrency === "DOGS" ? 'bg-blue-600' : 'bg-gray-700'} text-white flex items-center space-x-2 hover:bg-gray-600`}
              >
                <span className={`w-4 h-4 border-2 ${selectedCurrency === "DOGS" ? 'border-blue-500' : 'border-gray-300'} rounded-full flex items-center justify-center`}>
                  {selectedCurrency === "DOGS" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </span>
                <span>DOGS</span>
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="TON"
                name="currency"
                className="hidden"
                checked={selectedCurrency === "TON"}
                onChange={() => handleCurrencyChange("TON")}
              />
              <label
                htmlFor="TON"
                className={`cursor-pointer p-2 rounded-lg ${selectedCurrency === "TON" ? 'bg-blue-600' : 'bg-gray-700'} text-white flex items-center space-x-2 hover:bg-gray-600`}
              >
                <span className={`w-4 h-4 border-2 ${selectedCurrency === "TON" ? 'border-blue-500' : 'border-gray-300'} rounded-full flex items-center justify-center`}>
                  {selectedCurrency === "TON" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </span>
                <span>TON</span>
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="USDT"
                name="currency"
                className="hidden"
                checked={selectedCurrency === "USDT"}
                onChange={() => handleCurrencyChange("USDT")}
              />
              <label
                htmlFor="USDT"
                className={`cursor-pointer p-2 rounded-lg ${selectedCurrency === "USDT" ? 'bg-blue-600' : 'bg-gray-700'} text-white flex items-center space-x-2 hover:bg-gray-600`}
              >
                <span className={`w-4 h-4 border-2 ${selectedCurrency === "USDT" ? 'border-blue-500' : 'border-gray-300'} rounded-full flex items-center justify-center`}>
                  {selectedCurrency === "USDT" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </span>
                <span>USDT</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="text-white">Сумма пополнения:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-2 bg-gray-700 text-white rounded mt-2"
            placeholder="Введите сумму"
          />
        </div>

        <div className="mt-4 text-white bg-gray-700 p-4 rounded-lg">
          <p className="font-semibold text-lg text-yellow-400">
            Важное примечание:
          </p>
          <p className="mt-2 text-sm">
            Сначала выполните аналогичную транзакцию в кошельке в Telegram на адрес, указанный
            выше, добавив комментарий в виде мемо-фразы, которую прислал вам наш бот, в поле memo.
            Затем введите ту же сумму и ту же валюту для новой транзакции на сайте.
          </p>
        </div>

        <div className="mt-4 text-white bg-gray-700 p-4 rounded-lg">
          <p className="font-semibold text-lg text-yellow-400">Адрес пополнения:</p>
          <p className="mt-2 text-sm font-mono text-green-400">
            UQAu3vPWa8lM4eWgzoZX78doLD3c6q5gXNWTzJ8lTdAENXzH
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
            Закрыть
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={depositMutation.isLoading}
          >
            {depositMutation.isLoading ? "Загрузка..." : "Пополнить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
