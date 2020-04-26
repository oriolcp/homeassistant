import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getCurrentShoppingItems,
  hasPickedItems,
  togglePickItem,
  deleteItem,
  checkoutList,
} from '../reducers';

import ShoppingForm from './shoppingform';
import ShoppingItem from './shoppingitem';

const Shopping = () => {
  const dispatch = useDispatch();
  const shopItems = useSelector(getCurrentShoppingItems);
  const hasPicked = useSelector(hasPickedItems);

  const onTogglePickItem = useCallback((id) => {
    dispatch(togglePickItem({id}));
  }, [dispatch]);

  const onDeleteItem = useCallback((id) => {
    dispatch(deleteItem({id}));
  }, [dispatch]);

  const onCheckoutList = () => dispatch(checkoutList());

  return <>
    <article className='panel is-primary'>
      <p className='panel-heading'>
        Shopping List
      </p>

      <ShoppingForm />

      {shopItems.map((item) =>
        <ShoppingItem
          item={item}
          onDelete={onDeleteItem}
          onTogglePick={onTogglePickItem}
          key={item.id}
        />
      )}

      {hasPicked &&
        <div className='panel-block'>
          <button
            className='button is-link is-fullwidth'
            onClick={onCheckoutList}
          >
            I am done, let's checkout
          </button>
      </div>}
    </article>
    {!shopItems.length &&
    <div className='content has-text-centered'>
      <h4 className='is-small'>Your list is empty!</h4>
      <p>You can start adding items to create your shopping list.</p>
    </div>}
  </>
};
export default Shopping;
