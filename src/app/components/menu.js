import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import '../sass/menu.sass';

const MenuItem = ({isActive, icon, children}) => (
  <li className={isActive && 'is-active'}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a>
      {icon && <span className='icon is-small'>
        <FontAwesomeIcon icon={icon} />
      </span>}
      <span>{children}</span>
    </a>
  </li>
);

const Menu = () => (
  <div className='menu has-background-white-ter'>
    <div className='tabs is-toggle is-fullwidth'>
      <ul>
        <MenuItem isActive={true} icon='shopping-cart'>Shopping</MenuItem>
        <MenuItem disabled={true} icon='utensils'>Cooking</MenuItem>
        <MenuItem disabled={true}>Timers</MenuItem>
      </ul>
    </div>
  </div>
);
export default Menu;
