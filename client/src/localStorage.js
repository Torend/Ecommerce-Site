const myLocalStorage = () => {
  return {
    getAllItems: () => {
      let myStorage = localStorage.getItem('desktop.cart.storage');
      if (!myStorage) return [];
      myStorage = JSON.parse(myStorage);
      return myStorage.map((id) => {
        return { id: id, amount: localStorage.getItem(id) };
      });
    },
    addItem: (id, amount) => {
      let myStorage = localStorage.getItem('desktop.cart.storage');
      if (myStorage) myStorage = JSON.parse(myStorage);
      else myStorage = [];
      if (!myStorage.includes(id)) myStorage.push(id);
      localStorage.setItem('desktop.cart.storage', JSON.stringify(myStorage));

      const prevAmount = localStorage.getItem(id);
      if (!prevAmount) localStorage.setItem(id, amount);
      else localStorage.setItem(id, parseInt(amount) + parseInt(prevAmount));
    },
    removeItem: (id) => {
      localStorage.removeItem(id);

      let myStorage = localStorage.getItem('desktop.cart.storage');
      if (myStorage) {
        myStorage = JSON.parse(myStorage);
        myStorage = myStorage.filter((el) => el !== id);
        localStorage.setItem('desktop.cart.storage', JSON.stringify(myStorage));
      }
    },
    updateItemAmount: (id, amount) => {
      localStorage.removeItem(id);
      localStorage.setItem(id, amount);
    },
    clearStorage: () => {
      localStorage.clear();
    },
    idExist: (id) => {
      return localStorage.getItem(id) ? true : false;
    },
    addUser: (jwt) => {
      localStorage.setItem('user', jwt);
    },
    getUser: () => {
      return localStorage.getItem('user');
    },
  };
};

export default myLocalStorage();
