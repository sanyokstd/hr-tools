import styled from '@emotion/styled';
import { Autocomplete, Button, IconButton } from '@mui/material';

export const WorkerList = styled.div`
  display: flex;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 5px;
`;
export const WorkerCol = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  &.which {
    padding-left: 5px;
    border-left: 1px solid #e7e7e7;
  }
`;

export const WorkerColFLex = styled.div`
  flex: 1;
  padding-bottom: 10px;
`;

export const List = styled.div`
  height: 250px;
  overflow: auto;

  &.which {
    height: 300px;
  }
`;
export const Item = styled.div`
  display: flex;
  align-items: center;
  .MuiSvgIcon-root {
    width: 0.7em;
    height: 0.7em;
    color: #000;
  }
  &:hover {
    cursor: pointer;
    background-color: #e7e7e7;
  }
`;

export const Avatar = styled.div`
  min-width: 25px;
  height: 25px;
  width: 25px;
  margin-right: 10px;
  background-image: url(${({ $img }) => $img});
  background-size: cover;
  background-position: center;
  border-radius: 100%;
`;

export const Name = styled.div`
  font-size: 12px;
  flex: 1;
`;
export const SearchText = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  text-align: center;
`;

export const SearchForm = styled.div`
  display: flex;
  align-items: flex-start;
  .MuiAutocomplete-inputRoot {
    padding: 0;
  }
  .MuiAutocomplete-input {
    font-size: 12px;
  }
`;

export const SearchField = styled(Autocomplete)`
  & .MuiAutocomplete-popupIndicator {
    display: none;
  }
  & .MuiAutocomplete-clearIndicator {
    opacity: 1;
    visibility: visible;
  }
`;

export const emtyText = styled.div`
  font-size: 12px;
  text-align: center;
`;

export const PickAll = styled.div`
  .MuiFormControlLabel-label {
    font-size: 12px;
  }
`;
