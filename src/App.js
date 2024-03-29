import { useState } from "react";
import "./App.css";

import { Battle } from "./components/battle/Battle";
import { LandingPage } from "./components/landingpage/LandingPage";
import { Login } from "./components/login/Login";
import { New } from "./components/new/New";
import { WorldMap } from "./components/worldmap/WorldMap";

function App() {
  const [screen, setScreen] = useState("landingPage");
  const nav = (screen) => setScreen(screen);

  const currentScreen = () => {
    switch (screen) {
      case "landingPage":
        return <LandingPage handleNav={nav} />;
      case "continue":
        return <Login handleNav={nav} />;
      case "new":
        return <New handleNav={nav} />;
      case "worldMap":
        return <WorldMap handleNav={nav} />;
      case "battle":
        return <Battle handleNav={nav} />;
      default:
        <LandingPage handleNav={nav} />;
    }
  };

  return <div className="App">{currentScreen()}</div>;
}

export default App;
