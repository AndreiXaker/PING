import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeftSidebar from "./component/left-sidebar";
import RightSidebar from "./component/right-sidebar";
import Header from "./component/Header/header";
import GameRoom from "./component/game/game-room";
import { useState } from "react";
import ModalComponent from "./component/Modal";
import { QueryClientProvider, QueryClient } from "react-query";
import Auth from "./auth/Auth";
import NewsletterForm from "./component/LetterForm";
import ActiveGames from "./component/ActiveGames";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = new QueryClient();

  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <QueryClientProvider client={queryClient}>
              
              <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
                
                <LeftSidebar />
                
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="flex-1 p-4 text-white overflow-auto">
                    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    <div className="space-y-6">
                        <GameRoom maxPlayers={3} gameName="G3ME" />
                         
                        <div className="flex justify-center bg-gray-800 rounded-xl p-6 shadow-xl">
                          <NewsletterForm />
                        </div>
                      </div>

                      <GameRoom maxPlayers={6} gameName="G6ME" />
                      <GameRoom maxPlayers={9} gameName="G9ME"  />
                    </div>

                    {/* <div className="mt-6 rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
                      <h2 className="text-lg font-semibold text-white">Активные игры</h2>
                      <div className="mt-4 h-32 rounded-md bg-gray-700/50"></div>
                    </div> */}
                    <ActiveGames/>
                  </main>
                </div>
             
                <RightSidebar />

                <ModalComponent
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onConfirm={() => console.log("Баланс пополнен")}
                />
              </div>
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
