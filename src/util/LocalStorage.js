const LocalStorage = {
  setInLocalStorage: (key, item) =>
    localStorage.setItem(key,item
      // key,JSON.stringify(item)
      // typeof item == "string" ? item : JSON.stringify(item)
    ),

  // getFromLocalStorage: (key) => (key && JSON.parse(localStorage.getItem(key))),
  getFromLocalStorage: (key) => (key && localStorage.getItem(key))
};

export default LocalStorage;
