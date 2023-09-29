import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Logo } from 'src/components';
import * as GS from 'src/global-styles';
import { authActions } from 'src/store/actions/';

import { MainMenu } from './components';
import * as S from './styles';

const Header = ({ pageName }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(authActions.logoutUser());
    window.localStorage.clear();
    window.location = '/';
  };

  useEffect(() => {
    if (menuToggle) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = '';
    }
  }, [menuToggle]);

  return (
    <S.Header>
      <GS.Wrap>
        <S.HeaderFlex>
          <S.HeaderLeft>
            <Logo />
          </S.HeaderLeft>
          <S.HeaderRight>
            <S.Menu className={menuToggle ? 'active' : ''}>
              <MainMenu />

              <Button onClick={() => handleLogout()} variant="contained">
                Log out
              </Button>

              <S.MenuIconButton
                size="large"
                aria-label="burger-close"
                onClick={() => setMenuToggle(false)}
              >
                <CloseIcon />
              </S.MenuIconButton>
            </S.Menu>
            <S.MenuIconButton
              size="35px"
              aria-label="burger-open"
              onClick={() => setMenuToggle(true)}
            >
              <MenuIcon />
            </S.MenuIconButton>
          </S.HeaderRight>
        </S.HeaderFlex>
      </GS.Wrap>
      <GS.Wrap>
        <S.PageName>{pageName}</S.PageName>
      </GS.Wrap>
    </S.Header>
  );
};
Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};
export default Header;
