import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ShoppingFormItem = ({item, onAddItem}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState('');

  const onClick = () => setIsEditing(!isEditing);
  const onChangeQuantity = ({target: {value}}) => setQuantity(value);
  const onSubmit = (event) => {
    event.preventDefault();
    onAddItem({item, quantity});
  }

  return (
    <div className='list-item'>
      <button
        className='no-button-appearance is-block'
        onClick={onClick}
      >
        {!item.id && <i>New:</i>} {item.name}
      </button>
      {isEditing && <form onSubmit={onSubmit} className='has-margin-top-10'>
      <div className='field has-addons'>
        <div className='control is-expanded'>
          <input
            className='input'
            type='text'
            placeholder='quantity'
            onChange={onChangeQuantity}
            value={quantity}
            required
          />
        </div>
        <div className='control'>
          <button className='button is-success is-light' type='submit'>
            <FontAwesomeIcon icon='plus-circle' />
          </button>
        </div>
      </div>
    </form>}
  </div>
  );
};
export default ShoppingFormItem;
