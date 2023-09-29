import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import returnQType from 'src/helpers/index';
import { pollActions } from 'src/store/actions';

import * as S from './styles';

const DoPoll = ({ selectPoll, closeComponent }) => {
  const waiter = useSelector((state) => state.pollReducer.fixWaiter);
  const poll = useSelector(
    (state) => state.pollReducer.polls.filter((item) => item.id === selectPoll)[0],
  );

  const pollId = poll?.id || 0;

  const [showValidate, setShowValidate] = useState(false);
  const [valid, setValid] = useState(false);
  const answers = poll.questions
    ? poll.questions.map((item) => {
        if (item.type === 3 || item.type === 2) {
          return item.answers[0];
        }
        return [];
      })
    : [];
  const [isSubmit, setIsSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      answers,
    },
  });

  const handleChangeSelectVal = (questionsId, answerId) => {
    const NewAnswer = poll.questions[questionsId].answers.filter(
      (answer) => answer.id === answerId,
    )[0];

    formik.setFieldValue(`answers[${questionsId}]`, NewAnswer);
  };

  const handleChangeTextVal = (questionsId, value) => {
    const NewAnswer = { ...poll.questions[questionsId].answers[0], value, id: 0 };

    formik.setFieldValue(`answers[${questionsId}]`, NewAnswer);
  };

  const handleChangeCheckVal = (questionsId, answerId, cheked) => {
    if (cheked) {
      let NewAnswers = poll.questions[questionsId].answers.filter(
        (answer) => answer.id === answerId,
      )[0];
      if (formik.values.answers[questionsId]) {
        if (formik.values.answers[questionsId][0]) {
          NewAnswers = [...formik.values.answers[questionsId], NewAnswers];
        } else {
          NewAnswers = [NewAnswers];
        }
      }
      formik.setFieldValue(`answers[${questionsId}]`, NewAnswers);
    } else {
      const newAnswers = formik.values.answers[questionsId].filter((item) => item.id !== answerId);

      formik.setFieldValue(`answers[${questionsId}]`, newAnswers);
    }
  };

  const handleSubmit = () => {
    setShowValidate(true);
    let isValid = true;
    formik.values.answers.map((item, index) => {
      if (poll.questions[index].required) {
        if (item.length === 0) {
          isValid = false;
        }
      }

      return false;
    });
    if (isValid) {
      handleOpen();
    }
  };

  useEffect(() => {
    if (showValidate) {
      setValid(false);
      formik.values.answers.map((item, index) => {
        if (poll.questions[index].required) {
          if (item.length === 0) {
            setValid(true);
          }
        }

        return false;
      });
    }
  }, [formik.values, showValidate]);

  const handleDispatch = async () => {
    const newData = formik.values.answers;
    const answerList = [];

    newData.map((item, index) => {
      if (poll.questions[index].type !== 1) {
        if (item.value) {
          answerList.push({ ...item });
        }

        return false;
      }
      if (item.length > 0) {
        item.map((answer) => {
          answerList.push({ ...answer });
          return false;
        });

        return false;
      }
      return false;
    });

    await dispatch(pollActions.doPoll({ answerList, pollId }));
    dispatch(pollActions.getPollsWorker());

    setIsSubmit(true);
    return false;
  };

  return (
    <>
      <form>
        <S.PollTitle>{poll.title}</S.PollTitle>
        {poll.anonymous && <S.PollTitleAnonim>This is Poll Anonymous</S.PollTitleAnonim>}

        {poll.questions.map((item, index) => (
          <S.QaItem key={item.id}>
            <S.QaTitle>
              {item.name} {item.required && `*`}
            </S.QaTitle>

            <S.Answers>
              {item.type === 4 && (
                <S.AnswersItem $align="center">
                  <S.AnswersItemType>{returnQType(item.type)}</S.AnswersItemType>

                  <TextField
                    fullWidth
                    id={`answers[${index}][0].value`}
                    name={`answers[${index}][0].value`}
                    onChange={(e) => handleChangeTextVal(index, e.target.value)}
                    onBlur={(e) => handleChangeTextVal(index, e.target.value)}
                    inputProps={{ maxLength: 100 }}
                    error={
                      showValidate &&
                      item.required &&
                      Boolean(formik.values.answers[index] && !formik.values.answers[index].value)
                    }
                    helperText={
                      showValidate &&
                      item.required &&
                      formik.values.answers[index] &&
                      !formik.values.answers[index].value &&
                      'This is a required field'
                    }
                  />
                </S.AnswersItem>
              )}

              {item.type === 3 && (
                <FormControl fullWidth>
                  <InputLabel id={`label-type${item.id}}`}>Answer</InputLabel>
                  <Select
                    labelId={`label-type${item.id}}`}
                    label="Answer"
                    name={`answers[${index}]`}
                    value={
                      formik.values.answers[index]
                        ? formik.values.answers[index].id
                        : item.answers[0].id
                    }
                    onChange={(e) => handleChangeSelectVal(index, e.target.value)}
                  >
                    {item.answers.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <S.QaListRowTypeFlex>{option.value}</S.QaListRowTypeFlex>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {item.type === 1 && (
                <FormControl
                  fullWidth
                  error={showValidate && item.required && formik.values.answers[index].length === 0}
                >
                  <FormGroup
                    name={`answerName${item.id}`}
                    onChange={(e) =>
                      handleChangeCheckVal(index, Number(e.target.value), e.target.checked)
                    }
                  >
                    {item.answers.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Checkbox />}
                        label={option.value}
                      />
                    ))}
                  </FormGroup>
                  {showValidate && item.required && formik.values.answers[index].length === 0 && (
                    <FormHelperText>Choose at least one answer</FormHelperText>
                  )}
                </FormControl>
              )}

              {item.type === 2 && (
                <FormControl fullWidth>
                  <RadioGroup
                    defaultValue={item.answers[0].id}
                    name={`answerName${item.id}`}
                    onChange={(e) => handleChangeSelectVal(index, Number(e.target.value))}
                  >
                    {item.answers.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Radio />}
                        label={option.value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </S.Answers>
          </S.QaItem>
        ))}

        <Stack justifyContent="flex-end" direction="row" mt={2}>
          <Button variant="contained" type="button" onClick={handleSubmit}>
            Send
          </Button>
        </Stack>

        <Collapse in={valid}>
          <Stack mt={2}>
            <Alert severity="error">You did not give all the mandatory answers</Alert>
          </Stack>
        </Collapse>
      </form>
      <MyModal
        isOpen={openModal}
        handleOpen={handleOpen}
        handleClose={!isSubmit ? handleClose : closeComponent}
        width={400}
      >
        {openModal && (
          <>
            {waiter ? (
              <Loader />
            ) : (
              <>
                {isSubmit ? (
                  <>
                    <S.QaModalTitle>Poll passed successfully!</S.QaModalTitle>
                    <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
                      <Button variant="contained" type="button" onClick={closeComponent}>
                        Ок
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <S.QaModalTitle>Are you sure you want to send answers?</S.QaModalTitle>
                    <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
                      <Button variant="contained" type="button" onClick={handleClose}>
                        No
                      </Button>
                      <Button variant="contained" onClick={handleDispatch}>
                        Yes
                      </Button>
                    </Stack>
                  </>
                )}
              </>
            )}
          </>
        )}
      </MyModal>
    </>
  );
};

DoPoll.propTypes = {
  selectPoll: PropTypes.number.isRequired,
  closeComponent: PropTypes.func.isRequired,
};

export default DoPoll;
