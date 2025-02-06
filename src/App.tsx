import React from "react";
import { Layout } from "antd";
import LeftSidebar from "./component/left-sidebar";
import RightSidebar from "./component/right-sidebar";
import Header from "./component/header";
import GameRoom from "./component/game/game-room";

const { Sider } = Layout;


const CryptoGamingPage: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      <LeftSidebar/>
      {/* Основной контент */}
      <Layout className="flex-1">
        <Header/>

        <main className="p-4 text-white min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 ">
        {/* {Games Rooms} */}
        <div className="grid gap-6 lg:grid-cols-3">
            <GameRoom  maxPlayers={3} />
            <GameRoom  maxPlayers={6} />
            <GameRoom  maxPlayers={9} />
        </div>
        {/* {Active Games} */}
        <div className="mt-6 rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">Активные игры</h2>
            <div className="mt-4 h-32 rounded-md bg-gray-700/50"></div>
          </div>

        {/* Site Footer */}
        
        </main>
        
      </Layout>

      Правый сайдбар
      <Sider width={250} className="bg-[#131722] p-4 border border-1 border-gray-700">
        <RightSidebar/>
      </Sider>
      
    </Layout>
  );
};

export default CryptoGamingPage;
