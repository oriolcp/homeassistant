import { configureStore } from '@reduxjs/toolkit';
import shoppingList from '../shopping/reducers';

//Exported for testing purposes
export const reducer = {
  shoppingList,
}


export default configureStore({
  reducer,
});
