import React, { createContext, useState } from "react";
import { LEVELS } from "../constants/levels";

export const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(LEVELS().levelOne);

  const value = {
    currentLevel,
    setCurrentLevel,
  };

  return (
    <LevelContext.Provider value={value}>{children}</LevelContext.Provider>
  );
};
