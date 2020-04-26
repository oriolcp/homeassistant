import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import cx from 'classnames';

const ShoppingItem = ({item, onDelete, onTogglePick}) => (
  <div className='panel-block columns is-gapless has-not-margin-bottom is-mobile'>
      <p className="column" data-testid='item-desc'>
        {item.name}: <i>{item.quantity}</i>
      </p>
      <div className='column is-one-third'>
        <div className='buttons has-addons is-right'>
          <button
            className={cx(
              'button is-small is-light',
              {'is-success': !item.picked, 'is-danger': item.picked},
            )}
            onClick={() => onTogglePick(item.id)}
          >
            <FontAwesomeIcon icon='shopping-cart'/>
          </button>
          {!item.picked &&
            <button
              className='button is-small is-danger is-light'
              onClick={() => onDelete(item.id)}
            >
              <FontAwesomeIcon icon='trash'/>
            </button>}
        </div>
      </div>
  </div>
);
export default ShoppingItem;
