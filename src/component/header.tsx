import { Dropdown, Layout, Menu, message, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const { Header } = Layout;

const limitBet = async () => {
  try {
    const response = await axios.get("https://pingapp.tech/games/api/v1/coin-bet-limits/");
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return [];
  }
};

export default function CustomHeader() {
  const [betLimits, setBetLimits] = useState<{ coin: string; allowed_bets: string[] }[]>([]);

  useEffect(() => {
    limitBet().then((data) => {
      if (Array.isArray(data)) setBetLimits(data);
    });
  }, []);

  const cryptocurrencyMenu = (
    <Menu
      onClick={(e) => message.info(`Вы выбрали: ${e.domEvent.currentTarget.textContent}`)}
      items={[
        { label: "Bitcoin", key: "Bitcoin" },
        { label: "Ethereum", key: "Ethereum" },
        { label: "Litecoin", key: "Litecoin" },
      ]}
    />
  );

  const networkMenu = (
    <Menu
      onClick={(e) => message.info(`Вы выбрали сеть: ${e.domEvent.currentTarget.textContent}`)}
      items={[
        { label: "Mainnet", key: "Mainnet" },
        { label: "Testnet", key: "Testnet" },
        { label: "Ropsten", key: "Ropsten" },
      ]}
    />
  );

  const betLimitsText = betLimits
  .map((item) => {
    const formattedBets = item.allowed_bets
      .map((bet) => parseFloat(bet).toString())
      .join(", ");
    return `${item.coin}: ${formattedBets}`;
  })
  .join("\n");

  return (
    <Header className="flex items-center justify-between bg-[#131722] p-4">
      <div className="flex items-center gap-6">
        <Dropdown overlay={cryptocurrencyMenu} trigger={["click"]}>
          <span className="cursor-pointer text-xl text-white flex items-center gap-1">
            Choose a coin <DownOutlined style={{ fontSize: "15px" }} />
          </span>
        </Dropdown>

        <Dropdown overlay={networkMenu} trigger={["click"]}>
          <span className="cursor-pointer text-xl text-white flex items-center gap-1">
            Select a network <DownOutlined style={{ fontSize: "15px" }} />
          </span>
        </Dropdown>

        {betLimits.length > 0 && (
          <Tooltip title={<pre className="whitespace-pre-wrap text-base">{betLimitsText}</pre>}>
            <span className="cursor-pointer text-xl text-white flex items-center gap-1">
              Лимиты ставок <DownOutlined style={{ fontSize: "15px" }} />
            </span>
          </Tooltip>
        )}
      </div>
    </Header>
  );
}
