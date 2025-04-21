import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import LeftSidebar from "./component/left-sidebar";
import RightSidebar from "./component/right-sidebar";
import Header from "./component/header";
import GameRoom from "./component/game/game-room";
import { useState } from "react";
import ModalComponent from "./component/Modal";
import { QueryClientProvider, QueryClient } from "react-query";
import Auth from "./auth/Auth";

const { Sider } = Layout;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = new QueryClient();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <QueryClientProvider client={queryClient}>
              <Layout className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
                <LeftSidebar />

                <Layout className="flex-1">
                  <Header />
                  <main className="flex flex-col p-4 text-white min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
                    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                      <GameRoom maxPlayers={3} gameName="ThreeGames" selectedCells={[]} />
                      <GameRoom maxPlayers={6} gameName="SixGames" selectedCells={[]} />
                      <GameRoom maxPlayers={9} gameName="NineGames" selectedCells={[]} />
                    </div>

                    <div className="mt-6 rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
                      <h2 className="text-lg font-semibold text-white">Активные игры</h2>
                      <div className="mt-4 h-32 rounded-md bg-gray-700/50"></div>
                    </div>
                  </main>
                </Layout>

                <Sider
                  width={250}
                  className="bg-[#131722] p-3 border border-1 border-gray-700 hidden lg:block"
                >
                  <RightSidebar openModal={openModal} />
                </Sider>

                <ModalComponent
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onConfirm={() => console.log("Баланс пополнен")}
                />
              </Layout>
            </QueryClientProvider>
          }
        />
        <Route path="*" element={<h1 className="text-red-600">404</h1>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
