import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useWindowSize } from 'src/hooks';

import * as S from './styles';

const mainContainer = document.getElementById('root');

const View = ({ isOpen, children, handleClose, width = 600 }) => {
  const modalBack = useRef();
  const modalWrap = useRef();
  const [wrapHeight, setWrapHeight] = useState();

  const [alignTop, setAlignTop] = useState(false);

  const checkWrapHeight = () => {
    setWrapHeight(modalWrap.current.offsetHeight);
  };

  const dependence = useWindowSize(modalWrap, modalBack, wrapHeight, children);

  useEffect(() => {
    if (dependence[1] > dependence[0] - 30) {
      setAlignTop(true);
    } else {
      setAlignTop(false);
    }
  }, [dependence]);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = '';
    }
  }, [isOpen]);

  return (
    <S.MyModal
      ref={modalBack}
      className={isOpen && 'active'}
      onScroll={checkWrapHeight}
      $align={alignTop}
    >
      <S.MyModalWrap ref={modalWrap} $width={width}>
        <S.MyModalClose aria-label="delete" onClick={() => handleClose()}>
          <CloseIcon />
        </S.MyModalClose>
        {children}
      </S.MyModalWrap>
    </S.MyModal>
  );
};

const MyModal = (props) => createPortal(<View {...props} />, mainContainer);

View.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
export default MyModal;
