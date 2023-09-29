import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export const Title = styled.div`
  font-size: 24px;
  border-bottom: 1px dashed #000;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

export const MainTop = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainTopTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  svg {
    margin-right: 10px;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const MainTopLink = styled(Link)`
  display: flex;
  align-items: center;
  svg {
    margin-left: 15px;
    transition: 0.3s all;
  }
  &:hover {
    text-decoration: underline;
  }
  &:hover svg {
    transform: translateX(2px);
  }
  @media (max-width: 600px) {
    font-size: 14px;
    svg {
      margin-left: 5px;
    }
  }
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  mix-blend-mode: 15px;
`;

export const ModalRow = styled.div`
  margin-bottom: 25px;
  margin-top: 15px;
`;

export const ModalLabel = styled.div`
  margin-bottom: 10px;
`;

export const Picker = styled.div`
  position: relative;
`;

export const PickerClear = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const Vac = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const VacItem = styled.div`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid grey;
  margin: 0 15px 15px 15px;
  @media (max-width: 575px) {
    width: 100%;
    margin: 0;
    margin-bottom: 15px;
  }
`;

export const VacItemLabel = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const VacItemText = styled.div`
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  span {
    margin: 0 5px;
    margin-bottom: 5px;
  }
`;
