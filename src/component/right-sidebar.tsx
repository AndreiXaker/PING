import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { useBalance } from "../hooks/useBalance";
import { usersLoses, usersWins } from "../api/api";

interface Win {
  game_name: string;
  cell_count: number;
  bet: number;
  win: number;
  coin: string;
  created_at: string;
}

interface Loss {
  game_name: string;
  cell_count: number;
  bet: number;
  coin: string;
  created_at: string;
}

interface RightSidebarProps {
  openModal: () => void;
}

export default function RightSidebar({ openModal }: RightSidebarProps) {
  const { data, error, isLoading } = useBalance();

  const [wins, setWins] = useState<Win[]>([]);
  const [losses, setLosses] = useState<Loss[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const winsData = await usersWins();
        const lossesData = await usersLoses();
        setWins(winsData?.wins ?? []);
        setLosses(lossesData?.losses ?? []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStatsError(true);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Ваш баланс", hasButton: true },
    { title: "Статистика", hasButton: false },
    { title: "Партнерская программа", hasButton: false },
    { title: "Битва кланов", hasButton: false },
    { title: "Чемпионат", hasButton: false },
    { title: "Настройка автобота", hasButton: false },
  ];

  return (
    <div className=" border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm">
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
                    Пополнить/Снять баланс
                  </Button>
                </div>
              )}

              {card.title === "Статистика" && (
                <div className="text-white">
                  {statsLoading ? (
                    <p>Загрузка статистики...</p>
                  ) : statsError ? (
                    <p className="text-red-500">Ошибка загрузки статистики</p>
                  ) : (
                    <div className="space-y-4 text-left">
                      <div>
                        <p className="text-green-400 font-semibold">Победы:</p>
                        {wins.length > 0 ? (
                          <ul className="list-disc list-inside text-sm">
                            {wins.map((win, index) => (
                              <li key={index}>
                                {win.game_name} ({win.coin}): выигрыш {win.win}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400 text-sm">Побед нет</p>
                        )}
                      </div>

                      <div>
                        <p className="text-red-400 font-semibold">Поражения:</p>
                        {losses.length > 0 ? (
                          <ul className="list-disc list-inside text-sm">
                            {losses.map((loss, index) => (
                              <li key={index}>
                                {loss.game_name} ({loss.coin}): ставка {loss.bet}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400 text-sm">Поражений нет</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!card.hasButton && card.title !== "Статистика" && (
                <p className="text-gray-400 text-sm">Coming soon</p>
              )}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
