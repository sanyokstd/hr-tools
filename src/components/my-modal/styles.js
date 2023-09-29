import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';

export const MyModalWrap = styled.div`
  position: relative;

  background-color: #fff;

  width: ${({ $width }) => `${$width}px`};
  max-width: 100%;
  padding: 40px 15px 15px;
`;
export const MyModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: 0.3s all;
  z-index: 99;
  display: none;
  overflow: auto;
  align-items: ${({ $align }) => ($align ? 'flex-start' : 'center')};
  justify-content: center;
  padding: 15px;
  &.active {
    display: flex;
    animation: fadein 0.2s linear;
  }
`;

export const MyModalClose = styled(IconButton)`
  color: #333;
  position: absolute;
  top: 0;
  right: 0;
`;
