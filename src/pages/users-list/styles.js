import styled from '@emotion/styled';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Autocomplete, Button, IconButton } from '@mui/material';

export const UsersListFlex = styled.div`
  display: flex;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

export const SearchText = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
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

export const UsersTable = styled.div`
  width: calc(100% - 200px);
  padding-right: 15px;
  @media (max-width: 1023px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const UsersTableWrap = styled.div`
  margin-bottom: 25px;
  tbody tr:hover {
    cursor: pointer;
  }
  .MuiTableCell-head {
    padding: 5px;
    font-size: 12px;
    line-height: 1.2;
  }
  th {
    border-top: 1px solid rgba(224, 224, 224, 1);
  }
  th,
  td {
    border-right: 1px solid rgba(224, 224, 224, 1);
    font-size: 12px;
    line-height: 1.2;
    padding: 3px;
  }
  .MuiPaper-elevation {
    border-radius: 0;
  }
`;

export const UsersTableTop = styled.div`
  font-size: 24px;
  border-bottom: 1px dashed #000;
  margin-bottom: 25px;
  display: flex;
  padding-bottom: 5px;
`;

export const UsersTableTopTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const UsersFilterTop = styled.div`
  border: 1px solid #333;
  text-align: center;
  font-size: 20px;
  padding: 5px;
`;

export const UsersFilterWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.04);
  padding: 0 15px 15px;
  @media (max-width: 1023px) {
    flex: 1;
    overflow: auto;
  }
`;

export const UsersFilterRow = styled.div`
  padding: 15px 0;
  border-bottom: 1px dashed #333;
  &:last-child {
    border-bottom: 0;
  }
`;
export const UsersFilter = styled.form`
  min-width: 200px;
  width: 200px;
  max-width: 100%;
  background-color: #fff;
  margin-bottom: 25px;
  @media (max-width: 1023px) {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    transition: 0.3s all;
    transform: translateX(100%);
    &.active {
      transform: translate(0);
    }
  }
  .MuiRadio-root {
    padding: 5px;
  }
`;
export const UsersFilterToggle = styled(Button)`
  display: none;
  position: absolute;
  left: 0;
  transform: translate(-100%, -50%);
  top: 50%;
  @media (max-width: 1023px) {
    display: inline-flex;
  }
`;
export const UserDeleteModal = styled.div`
  margin-bottom: 15px;
`;
export const UserDeleteTitle = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: bold;
`;

export const PersonalBlock = styled.div`
  margin-bottom: 40px;
`;

export const PersonaTitle = styled.h2`
  font-size: 24px;
  border-bottom: 1px dashed #000;
  margin-bottom: 25px;
`;

export const PersonalWrap = styled.div`
  padding-right: 50px;
  position: relative;
  margin-bottom: 15px;
`;

export const PersonalButtonAdd = styled(IconButton)`
  color: #000;
  position: absolute;
  top: 22px;
  right: 0;
`;

export const UploadFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-top: 15px;
`;

export const UploadFlexButton = styled.div`
  margin-right: 35px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

export const UploadText = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export const UploadErr = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: red;
`;

export const UploadFile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 100px;
`;
export const UploadFileIcon = styled(InsertDriveFileIcon)`
  width: 2em;
  height: 2em;
`;
export const UploadFileText = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 100%;
`;
export const UploadFileIconDelete = styled(HighlightOffIcon)`
  width: 1em;
  height: 1em;
  padding: 2px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
  transition: 0.1s all;
  &:hover {
    transform: scale(1.05);
  }
`;
export const EmergencyBlock = styled.div``;
export const EmergencyRow = styled.div`
  padding-bottom: 15px;
  margin-bottom: 25px;
  border-bottom: 1px solid #d6d6d6;
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
  }
`;
export const UserEditInfo = styled.div`
  padding: 0 25px;
  @media (max-width: 1215px) {
    padding: 0;
  }
`;
export const UserEditT = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const UserEditFlex = styled.div`
  display: flex;
  @media (max-width: 1215px) {
    flex-direction: column;
  }
`;

export const UserEditLeft = styled.div`
  width: calc(100% - 400px);
  padding-right: 25px;
  @media (max-width: 1215px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const UserEditRight = styled.div`
  width: 400px;
  max-width: 100%;
`;

export const UserEditRole = styled.div`
  .MuiRadio-root {
    padding: 5px;
  }
`;

export const PersonaTitleMini = styled.div`
  font-size: 18px;
  border-bottom: 1px dashed #000;
  margin-bottom: 15px;
`;

export const PersonalBlockMini = styled.div`
  margin-bottom: 25px;
`;

export const tableData = styled.div`
  white-space: nowrap;
`;

export const ResumeLink = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
