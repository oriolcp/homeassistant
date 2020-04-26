import React from 'react';
import ShoppingFormItem from '../shoppingformitem';
import { render, fireEvent } from 'utils/testing';

let result, item, mockOnAddItem;
describe('ShoppingFormItem', () => {
  beforeEach(() => {
    item = {
      name: 'Apples',
      id: '1',
    };
    mockOnAddItem = jest.fn();
    result = render(<ShoppingFormItem
      item={item}
      onAddItem={mockOnAddItem}
    />);
  });

  it('should show a button with name to add the item', () => {
      expect(result.getByText('Apples').closest('button')).toBeTruthy();
      expect(result.queryByText('New:')).toBeFalsy();
    });

  it('should have "New" if the item does not have an id', () => {
      result.rerender(<ShoppingFormItem
        item={Object.assign(item, {id: null})}
        onAddItem={mockOnAddItem}
      />);
      expect(result.getByText('New:')).toBeTruthy();
  });

  it('should toggle form visibility when clicking on name', () => {
      expect(result.queryByPlaceholderText('quantity')).toBeFalsy();
      expect(result.queryByText('ico-plus-circle')).toBeFalsy();

      fireEvent.click(result.getByText('Apples'));

      expect(result.queryByPlaceholderText('quantity')).toBeTruthy();
      expect(result.getByText('ico-plus-circle')).toBeTruthy();

  });

  it('should require input quantity', () => {
    fireEvent.click(result.getByText('Apples'));

    const input = result.queryByPlaceholderText('quantity');

    fireEvent.click(result.getByText('ico-plus-circle'));
    expect(input).not.toBeValid();

    fireEvent.change(input, { target: { value: '2 Kg' } });

    fireEvent.click(result.getByText('ico-plus-circle'));
    expect(input).toBeValid();
  });

  it('should be able to change the quantity and submit the form', () => {
    fireEvent.click(result.getByText('Apples'));
    expect(mockOnAddItem).not.toHaveBeenCalled();

    const input = result.queryByPlaceholderText('quantity');
    fireEvent.change(input, { target: { value: '2 Kg' } });

    fireEvent.click(result.getByText('ico-plus-circle'));
    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    expect(mockOnAddItem).toHaveBeenCalledWith({
      item,
      quantity: '2 Kg',
    });
  });
});
