import styled from '@emotion/styled';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@mui/material/IconButton';

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

export const ResumeLink = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
