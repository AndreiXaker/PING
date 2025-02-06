import { Dropdown, Layout, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ping from "../component/ui/ping.gif";
const { Header } = Layout;

// Меню выбора криптовалюты
const cryptocurrencyMenu = (
  <Menu
    onClick={(e) => message.info(`Вы выбрали: ${e.item.props.children}`)}
    items={[
      { label: "Bitcoin", key: "1" },
      { label: "Ethereum", key: "2" },
      { label: "Litecoin", key: "3" },
    ]}
  />
);

// Меню выбора сети
const networkMenu = (
  <Menu
    onClick={(e) => message.info(`Вы выбрали сеть: ${e.item.props.children}`)}
    items={[
      { label: "Mainnet", key: "1" },
      { label: "Testnet", key: "2" },
      { label: "Ropsten", key: "3" },
    ]}
  />
);

export default function CustomHeader() {
  return (
    <Header className="flex items-center justify-between bg-[#131722] p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-1">
          <img src={ping} alt='loading...'></img>
        {/* <Bitcoin className="h-8 w-8 text-yellow-500" />
        <span className="text-xl font-bold text-white">CryptoGaming</span> */}
        </div>

        {/* Dropdown для выбора криптовалюты */}
        <Dropdown className="border border-1 border-gray-700 rounded-xl p-2" overlay={cryptocurrencyMenu} trigger={["click"]}>
          <span className="cursor-pointer text-xl text-white flex items-center gap-1">
            Choose a coin <DownOutlined style={{fontSize : '15px'}} />
          </span>
        </Dropdown>

        {/* Dropdown для выбора сети */}
        <Dropdown className="border border-1 border-gray-700 rounded-xl p-2" overlay={networkMenu} trigger={["click"]}>
          <span className="cursor-pointer text-xl text-white flex items-center gap-1">
            Select a network <DownOutlined style={{fontSize : '15px'}}/>
          </span>
        </Dropdown>
      </div>
    </Header>
  );
}
