import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { menuItems, menuItemsAdmin, menuItemsHr, menuItemsWorker } from 'src/constants';

import * as S from '../styles';

function swichMenu(role) {
  switch (role) {
    case null:
      return menuItems;
    case 1:
      return menuItemsAdmin;
    case 2:
      return menuItemsWorker;
    case 3:
      return menuItemsHr;
    default:
      return menuItems;
  }
}

const MainMenu = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  const roleMenu = swichMenu(role);
  return (
    <S.HeaderNav>
      <ul>
        {roleMenu.map((item) => (
          <li key={item.id}>
            <NavLink to={`/${item.to}`}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </S.HeaderNav>
  );
};

export default MainMenu;
