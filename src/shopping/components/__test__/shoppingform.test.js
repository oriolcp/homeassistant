import React from 'react';
import {reduxRender, fireEvent} from 'utils/testing';

import ShoppingForm from '../shoppingform';


jest.mock('../shoppingformitem', () => ({
  __esModule: true,
  default: ({item, onAddItem}) =>
    <div onClick={() =>
      onAddItem({item, quantity: 'mocked quantity'})
    }>{item.name}</div>
}));

let result;
describe('ShoppingForm', () => {
  beforeEach(() => {
    result = reduxRender(
      <ShoppingForm />,
      {
        preloadedState: {
          shoppingList: {
            currentItems: [],
            history: [],
            allItems: [
              {id: 1, name: 'Apples', quantity: '1kg'},
              {id: 2, name: 'Oranges', quantity: '2kg'},
            ],
          }
        }
      }
    );
  });

  it('should not show anything if query is less than 2 letters', () => {
    expect(result.getByTestId('items-list')).toBeEmpty();
  });

  it('should list unused items on search based on query', () => {
    const input = result.queryByPlaceholderText('Add items');
    fireEvent.change(input, { target: { value: 'Ora' } });
    expect(result.getByText('Oranges')).toBeTruthy();
    expect(result.queryByText('Apples')).toBeFalsy();

    fireEvent.click(result.getByText('Oranges'));

    fireEvent.change(input, { target: { value: 'Ora' } });
    expect(result.queryByText('Apples')).toBeFalsy();
    expect(result.queryByText('Oranges')).toBeFalsy();
  });

  it('should not show anything if query does not match', () => {
    const input = result.queryByPlaceholderText('Add items');
    fireEvent.change(input, { target: { value: 'Ora' } });
    expect(result.queryByText('Oranges')).toBeTruthy();
    fireEvent.change(input, { target: { value: 'OraOXZ' } });
    expect(result.queryByText('Oaranges')).toBeFalsy();
  });

  it('should clear query when clicking div overlay', () => {
    const input = result.queryByPlaceholderText('Add items');
    fireEvent.change(input, { target: { value: 'Ora' } });
    expect(result.queryByText('Oranges')).toBeTruthy();
    fireEvent.click(result.getByTestId('overlay'));
    expect(result.queryByText('Oranges')).toBeFalsy();
  });

  it('should add an item at the end to let user create new items', () => {
    const input = result.queryByPlaceholderText('Add items');
    fireEvent.change(input, { target: { value: 'App' } });
    expect(result.getByText('App')).toBeTruthy();
    expect(result.getByText('Apples')).toBeTruthy();
  });

  it('should reset filtering when adding an item', () => {
    const input = result.queryByPlaceholderText('Add items');
    fireEvent.change(input, { target: { value: 'Ora' } });

    expect(result.getByTestId('overlay')).toBeInTheDocument();

    fireEvent.click(result.getByText('Oranges'));

    expect(result.queryByText('Oranges')).toBeFalsy();
    expect(result.queryByTestId('overlay')).not.toBeInTheDocument();
  });
});
