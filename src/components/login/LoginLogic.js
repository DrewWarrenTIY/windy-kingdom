export const handleLogin = (name, next) => {
  if (!name) return window.alert("try a name, dingus");
  const names = JSON.parse(localStorage.getItem("names")) || [];

  let isNameInNames = false;
  for (let i = 0; i < names.length; i++) {
    if (names[i].toLowerCase() === name.toLowerCase()) {
      isNameInNames = true;
    }
  }

  if (isNameInNames) {
    localStorage.setItem("currentPlayer", name);
    return next();
  }

  return window.alert("name not found");
};
