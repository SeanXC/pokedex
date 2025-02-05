import { useState } from "react";
import Header from "./components/Header";
import Pokedex from "./pages/Pokedex";
import WhosThatPokemon from "./pages/WhosThatPokemon";
import MyAccount from "./pages/MyAccount";
import Home from "./pages/Home";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [username, setUsername] = useState("");

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <Home setPage={setCurrentPage} setUsername={setUsername} />;
      case "Pokedex":
        return <Pokedex username={username} />;
      case "WhosThatPokemon":
        return <WhosThatPokemon username={username} />;
      case "MyAccount":
        return <MyAccount setPage={setCurrentPage} username={username} />;
      default:
        return <Home setPage={setCurrentPage} setUsername={setUsername} />;
    }
  };

  return (
    <>
      {(currentPage === "Pokedex" ||
        currentPage === "WhosThatPokemon" ||
        currentPage === "MyAccount") && (
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      )}
      {renderPage()}
    </>
  );
}

export default App;
