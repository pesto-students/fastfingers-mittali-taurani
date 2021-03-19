const SessionStorage = {

    setInSessionStorage : (itemName, item) => localStorage.setItem(itemName, typeof item == 'string' ? item : JSON.stringify(item)),
  
    getFromSessionStorage : (itemName = '') => localStorage.getItem(itemName)
  
  }
  
  export default SessionStorage;