import { Button } from "./ui/Button";

export default function RightSidebar() {
  const cards = [
    { title: "Ваш баланс", hasButton: true },
    { title: "Статистика", hasButton: true },
    { title: "Партнерская программа", hasButton: true },
    { title: "Битва кланов", hasButton: false },
    { title: "Чемпионат", hasButton: false },
    { title : "Настройка автобота", hasButton: false },
  ];

  return (
    <div className="w-64 border-r border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
      <nav className="space-y-4">
        {cards.map((card, index) => (
          <div key={index} className="rounded-lg bg-gray-800/50 p-4 mr-7">
            <div className="space-y-2 flex flex-col items-center">
              <p className="text-lg text-white font-bold text-center">{card.title}</p>
              {card.hasButton ? (
                <Button className="text-lg">LOGIN</Button>
              ) : (
                <p className="text-gray-400 text-sm">Coming soon</p>
              )}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
