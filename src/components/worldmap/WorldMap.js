import { useContext } from "react";
import { LevelContext } from "../../context/LevelContext";
import { LEVELS } from "../../constants/levels";

export const WorldMap = (props) => {
  const { setCurrentLevel } = useContext(LevelContext);

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
    props.handleNav("battle");
  };

  // TODO: Hide Levels that have not been unlocked yet

  return (
    <div>
      <h1>World Map</h1>
      <button onClick={() => handleLevelClick(LEVELS().levelOne)}>
        Level 1
      </button>
      <button onClick={() => handleLevelClick(LEVELS().levelTwo)}>
        Level 2
      </button>
      <button onClick={() => handleLevelClick(LEVELS().levelThree)}>
        Level 3
      </button>
      <button onClick={() => props.handleNav("landingPage")}>Exit</button>
    </div>
  );
};
