import { createSlice } from '@reduxjs/toolkit';

let currentId = 6;

export const shoppingSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    currentItems: [],
    history: [],
    allItems: [
      {id: 1, name: 'Taronges Torres', quantity: '1kg'},
      {id: 2, name: 'Pomes', quantity: '1 bossa'},
      {id: 3, name: 'Mantega Cadi', quantity: '1'},
      {id: 4, name: 'LLom iberic llibrets', quantity: '5 talls'},
      {id: 5, name: 'Dodot pans talla 5', quantity: '1 paquet'},
      {id: 6, name: 'Tomaquet de penjar', quantity: '1 tira'},
    ],
  },
  reducers: {
    addItem: (state, {payload: {item, quantity}}) => {
      let itemWithId = item;
      if(!itemWithId.id) {
        itemWithId = Object.assign({}, item, {id: ++currentId});
        state.allItems.push(itemWithId);
      }
      state.currentItems.push(Object.assign({}, itemWithId, {quantity, picked: false}));
    },
    deleteItem: (state, {payload: {id}}) => {
      state.currentItems = state.currentItems.filter((item) => id !== item.id);
    },
    togglePickItem: (state, {payload: {id}}) => {
      const foundIndex = state.currentItems
        .findIndex((item) => item.id === id);
      const item = state.currentItems[foundIndex];
      item.picked = !item.picked;
    },
    checkoutList: (state) => {
      state.history.push(state.currentItems);
      state.currentItems = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  togglePickItem,
  checkoutList,
} = shoppingSlice.actions;

export const getShoppingList = (state) => state.shoppingList;

export const getAllShoppingItems = (state) => getShoppingList(state).allItems;

export const getCurrentShoppingItems = (state) => getShoppingList(state).currentItems;

export const getUnusedShoppingItems = (state) => {
  const currentItemsId = getCurrentShoppingItems(state).map(({id}) => id);
  return getAllShoppingItems(state).filter(({id}) => currentItemsId.indexOf(id) === -1);
}

export const hasPickedItems = (state) =>
  getCurrentShoppingItems(state).find((item) => item.picked) != null;

export default shoppingSlice.reducer;
