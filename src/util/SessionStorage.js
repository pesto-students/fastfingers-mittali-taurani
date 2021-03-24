const SessionStorage = {
  setInSessionStorage: (key, item) => sessionStorage.setItem(key, item),

  getFromSessionStorage: (key) => key && sessionStorage.getItem(key),
};

export default SessionStorage;
