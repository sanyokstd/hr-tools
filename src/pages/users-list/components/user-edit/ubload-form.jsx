import { Alert, Button, Collapse } from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { suportedFormat } from 'src/constants';
import { adminActions } from 'src/store/actions';

import * as S from '../../styles';

const UploadForm = ({ resumeFileName, userId, path }) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState(resumeFileName);
  const inputFile = useRef(null);
  const [err, setErr] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const handleAction = async (file) => {
    try {
      await dispatch(adminActions.userResumeUpload({ file, userId }));
      setFileName(file.name);
      setIsSave(true);
      setTimeout(() => {
        setIsSave(false);
      }, 5000);
    } catch (error) {
      setErr('an error occurred');
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }
  };

  const onFileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      if (file.size >= 5000000) {
        setErr('file is too big!');
      } else if (!suportedFormat.includes(file.type)) {
        setErr('Invalid file type!');
      } else {
        handleAction(file);
      }
    }
  };

  const onFileRemove = async () => {
    try {
      await dispatch(adminActions.userResumeDelete(userId));
      inputFile.current.value = '';
      setFileName('');
      setIsSave(true);
      setTimeout(() => {
        setIsSave(false);
      }, 5000);
    } catch (error) {
      setErr('an error occurred');
      setTimeout(() => {
        setErr(false);
      }, 5000);
    }
  };

  return (
    <>
      <S.UploadFlex>
        <S.UploadFlexButton>
          <Button variant="contained" component="label">
            Add resume
            <input
              ref={inputFile}
              name="resume"
              id="resume"
              hidden
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              type="file"
              onChange={onFileChange}
            />
          </Button>
          <S.UploadText>doc, docs, PDF (up to 5mb)</S.UploadText>
        </S.UploadFlexButton>
        {fileName ? (
          <S.UploadFile>
            <S.UploadFileIconDelete onClick={() => onFileRemove()} />
            <S.ResumeLink target="_blank" href={path}>
              <S.UploadFileIcon />
              <S.UploadFileText>resume loaded</S.UploadFileText>
            </S.ResumeLink>
          </S.UploadFile>
        ) : null}
      </S.UploadFlex>

      <Collapse in={isSave}>
        <S.PersonalBlock>
          <Alert severity="success">Data saved successfully</Alert>
        </S.PersonalBlock>
      </Collapse>

      <Collapse in={Boolean(err)}>
        <S.PersonalBlock>
          <Alert severity="error">{err}</Alert>
        </S.PersonalBlock>
      </Collapse>
    </>
  );
};
UploadForm.propTypes = {
  userId: PropTypes.number.isRequired,
  resumeFileName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
export default UploadForm;
