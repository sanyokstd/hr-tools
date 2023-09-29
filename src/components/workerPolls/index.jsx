import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import { pollActions } from 'src/store/actions';

import DoPoll from './do-poll';
import * as S from './styles';
import VeiwPoll from './view-poll';

const WorkerPolls = ({ isMain }) => {
  const waiter = useSelector((state) => state.pollReducer.waiter);
  const polls = useSelector((state) => state.pollReducer.polls);

  const [openDoPoll, setOpenDoPoll] = useState(false);
  const [selectPoll, setSelectPoll] = useState(0);
  const handleOpen = (id) => {
    setSelectPoll(id);
    setOpenDoPoll(true);
  };
  const handleClose = () => setOpenDoPoll(false);

  const [openViewPoll, setOpenViewPoll] = useState(false);
  const handleOpenViewPoll = (id) => {
    setSelectPoll(id);
    setOpenViewPoll(true);
  };
  const handleCloseViewPoll = () => setOpenViewPoll(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pollActions.getPollsWorker());
  }, []);

  return (
    <>
      {isMain ? (
        <S.MainTop>
          <S.MainTopTitle>My Poll</S.MainTopTitle>
          <S.MainTopLink to="poll">
            Watch all
            <ArrowForwardIcon />
          </S.MainTopLink>
        </S.MainTop>
      ) : (
        <S.MainTop>
          <S.MainTopTitle>All Poll</S.MainTopTitle>
        </S.MainTop>
      )}

      {!waiter ? (
        <>
          {polls && polls.length ? (
            <S.PollList>
              <>
                {polls.map((item) => (
                  <S.PollRow key={item.id}>
                    <S.PollName>{item.title}</S.PollName>
                    <S.PollData>{item.date}</S.PollData>
                    <S.PollButton>
                      {!item.passed ? (
                        <Button variant="contained" onClick={() => handleOpen(item.id)}>
                          Pass
                        </Button>
                      ) : (
                        <Button onClick={() => handleOpenViewPoll(item.id)}>passed</Button>
                      )}
                    </S.PollButton>
                  </S.PollRow>
                ))}
              </>
            </S.PollList>
          ) : (
            <>There are no polls</>
          )}
        </>
      ) : (
        <Loader />
      )}

      <MyModal isOpen={openDoPoll} handleOpen={handleOpen} handleClose={handleClose} width={1000}>
        {openDoPoll && <DoPoll selectPoll={selectPoll} closeComponent={handleClose} />}
      </MyModal>

      <MyModal
        isOpen={openViewPoll}
        handleOpen={handleOpenViewPoll}
        handleClose={handleCloseViewPoll}
        width={1000}
      >
        {openViewPoll && <VeiwPoll selectPoll={selectPoll} />}
      </MyModal>
    </>
  );
};

WorkerPolls.propTypes = {
  isMain: PropTypes.bool.isRequired,
};

export default WorkerPolls;
