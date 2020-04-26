import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getUnusedShoppingItems, addItem} from '../reducers';
import ShoppingFormItem from './shoppingformitem';
import {IS_NEW_ITEM} from '../constants';

import '../sass/shoppingform.sass';

const ShoppingForm = () => {
  const dispatch = useDispatch();
  const unusedItems = useSelector(getUnusedShoppingItems);
  const [matchingItems, setMatchingItems] = useState([]);
  const [query, setQuery] = useState('');

  const onFilterChange = useCallback(({target: {value}}) => {
      setQuery(value);
      if(value.length < 2) {
        return setMatchingItems([]);
      }

      const query = new RegExp(value, 'i');
      const filteredItems = unusedItems.filter(({name}) =>
        name.match(query) !== null);

      // Add current query value in case the user wants to
      // add it as a new item.
      filteredItems.push({name: value});
      setMatchingItems(filteredItems);
    },
    [unusedItems]
  );

  const resetFiltering = () => {
    setQuery('');
    setMatchingItems([]);
  };

  const onAddItem = (payload) => {
    resetFiltering();
    dispatch(addItem(payload));
  }

  return <>
    <div className='panel-block shoppingform'>
      <div className='container'>
        <p className='control has-icons-left'>
          <input
            className='input'
            type='text'
            placeholder='Add items'
            onChange={onFilterChange}
            value={query}
          />
          <span className='icon is-left'>
            <FontAwesomeIcon icon='plus-circle'/>
          </span>
        </p>
        <div className='shoppingform__results'>
          <div className='list' data-testid='items-list'>
            {matchingItems.map((item) =>
              <ShoppingFormItem
                item={item}
                key={item.id || IS_NEW_ITEM}
                onAddItem={onAddItem}
              />)}
          </div>
        </div>
      </div>
    </div>
    {matchingItems.length>0 &&
      <div className='shoppingform__overlay'
        data-testid='overlay'
        onClick={resetFiltering}
      />}
  </>
};
export default ShoppingForm;
