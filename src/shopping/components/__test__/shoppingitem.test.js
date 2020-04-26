import React from 'react';
import { render, fireEvent } from 'utils/testing';

import ShoppingItem from '../shoppingitem';

let result, mockOnDelete, mockOnTogglePick, item;
describe('ShoppingItem', () => {
  beforeEach(() => {
    mockOnDelete = jest.fn();
    mockOnTogglePick = jest.fn();

    item = {
      name: 'Apples',
      quantity: '1kg',
      id: '1',
    };

    result = render(<ShoppingItem
      item={item}
      onTogglePick={mockOnTogglePick}
      onDelete={mockOnDelete}
    />);
  });

  it('should show name and quantity', () => {
      expect(
        result.getByTestId('item-desc')
      ).toHaveTextContent('Apples: 1kg');
  });

  it('should have delete button before picking', () => {
    expect(result.getByText('ico-trash')).toBeTruthy();

    fireEvent.click(result.getByText('ico-shopping-cart'));

    result.rerender(<ShoppingItem
      item={Object.assign(item, {picked: true})}
      onTogglePick={mockOnTogglePick}
      onDelete={mockOnDelete}
    />);

    expect(result.queryByText('ico-trash')).toBeFalsy();
  });

  it('should trigger delete when clicking button delete', () => {
      expect(mockOnDelete).not.toHaveBeenCalled();

      fireEvent.click(result.getByText('ico-trash'));

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith(item.id);
  });

  it('should change picking button when toggling picking', () => {
      expect(item.picked).toBeFalsy();
      const icoShoppingCart =  result.getByText('ico-shopping-cart');

      expect(icoShoppingCart).toHaveClass('is-success');
      expect(icoShoppingCart).not.toHaveClass('is-danger');

      result.rerender(<ShoppingItem
        item={Object.assign(item, {picked: true})}
        onTogglePick={mockOnTogglePick}
        onDelete={mockOnDelete}
      />);

      expect(icoShoppingCart).not.toHaveClass('is-success');
      expect(icoShoppingCart).toHaveClass('is-danger');
  });

  it('should trigger toggle picking when clicking button picking', () => {
    expect(mockOnTogglePick).not.toHaveBeenCalled();

    fireEvent.click(result.getByText('ico-shopping-cart'));

    expect(mockOnTogglePick).toHaveBeenCalledTimes(1);
    expect(mockOnTogglePick).toHaveBeenCalledWith(item.id);

  });
});
