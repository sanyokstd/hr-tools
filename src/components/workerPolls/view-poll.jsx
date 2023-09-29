import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components';
import returnQType from 'src/helpers/index';
import { pollActions } from 'src/store/actions';

import * as S from './styles';

const VeiwPoll = ({ selectPoll }) => {
  const waiter = useSelector((state) => state.pollReducer.fixWaiter);
  const viewPoll = useSelector((state) => state.pollReducer.viewPoll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pollActions.viewPoll(selectPoll));
  }, []);

  const isCheckedAnswer = (id) => {
    if (viewPoll.result.length === 0) {
      return false;
    }

    return viewPoll.result.some((item) => item.id === id);
  };

  function isCheckedAnswerText(id) {
    let val;
    if (viewPoll.result.length !== 0) {
      viewPoll.result.map((item) => {
        if (item.questionId === id) {
          val = item.value;
        }
        return null;
      });
    }
    return val || '';
  }

  return (
    <>
      {waiter ? (
        <Loader />
      ) : (
        <>
          {viewPoll && (
            <>
              <S.PollTitle>{viewPoll.title}</S.PollTitle>
              {viewPoll.questions.map((item) => (
                <S.QaItem key={item.id}>
                  <S.QaTitle>{item.name}</S.QaTitle>
                  <S.Answers>
                    {item.type === 4 ? (
                      <>
                        {item.answers[1] && item.answers[1].value ? (
                          <S.AnswersItem $align="flex-start">
                            <S.AnswersItemType>{returnQType(4)}</S.AnswersItemType>
                            {isCheckedAnswerText(item.answers[0].questionId)}
                          </S.AnswersItem>
                        ) : (
                          <>No answer</>
                        )}
                      </>
                    ) : (
                      <FormControl fullWidth>
                        <RadioGroup>
                          {item.answers.map((option) => (
                            <FormControlLabel
                              key={option.id}
                              value={option.id}
                              control={<Radio />}
                              label={option.value}
                              checked={isCheckedAnswer(option.id)}
                              disabled
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  </S.Answers>
                </S.QaItem>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};
VeiwPoll.propTypes = {
  selectPoll: PropTypes.number.isRequired,
};
export default VeiwPoll;
