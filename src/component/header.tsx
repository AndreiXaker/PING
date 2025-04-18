import { Dropdown, Layout, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Header } = Layout;


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

export default function CustomHeader() {
  return (
    <Header className="flex items-center justify-between bg-[#131722] p-4">
      <div className="flex items-center gap-4">
        
        
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
      </div>
    </Header>
  );
}
