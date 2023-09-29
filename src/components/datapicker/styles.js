import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';

export const Picker = styled.div`
  position: relative;
`;

export const PickerClear = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;
