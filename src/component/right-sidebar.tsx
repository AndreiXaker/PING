import { Button } from "./ui/Button";
import { useBalance } from "../hooks/useBalance";

interface RightSidebarProps {
  openModal: () => void;
}

export default function RightSidebar({ openModal }: RightSidebarProps) {
  const { data, error, isLoading } = useBalance();
  
  const cards = [
    { title: "Ваш баланс", hasButton: true },
    { title: "Статистика", hasButton: false },
    { title: "Партнерская программа", hasButton: false },
    { title: "Битва кланов", hasButton: false },
    { title: "Чемпионат", hasButton: false },
    { title: "Настройка автобота", hasButton: false },
  ];

  return (
    <div className="w-auto border-r border-gray-800 bg-gray-900/50  backdrop-blur-sm">
      <nav className="space-y-4">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg bg-gray-800/50 p-4 mr-7">
            <div className="space-y-2 flex flex-col items-center">
              <p className="text-lg text-white font-bold text-center">{card.title}</p>
              {card.title === "Ваш баланс" && (
                <div>
                  {isLoading ? (
                    <p className="text-white">Загрузка...</p>
                  ) : error ? (
                    <p className="text-red-500">Ошибка загрузки баланса</p>
                  ) : (
                    <div>
                      {data?.balances.map((balance, index) => (
                        <p key={index} className="text-white">
                          {balance.coin}: {balance.amount}
                        </p>
                      ))}
                    </div>
                  )}
                  <Button className="text-lg" onClick={openModal}>
                    Пополнить баланс
                  </Button>
                </div>
              )}
              {!card.hasButton && <p className="text-gray-400 text-sm">Coming soon</p>}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
