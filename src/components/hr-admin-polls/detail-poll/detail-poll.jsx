import { Button, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader, Loader, MyModal } from 'src/components';
import { pollActions } from 'src/store/actions';

import EditPoll from '../edit-poll';
import * as S from '../styles';
import AnswersTable from './answers-table';
import WorkerListPoll from './worker-list-poll';

const DetailPoll = ({ role, selectPollId, handleClose }) => {
  const fixWaiter = useSelector((state) => state.pollReducer.fixWaiter);
  const detailPollWaiter = useSelector((state) => state.pollReducer.detailPollWaiter);
  const poll = useSelector((state) => state.pollReducer.detailPoll);
  const ableWorkers = useSelector((state) => state.pollReducer.ableWorkers);

  // Модалка видалення
  const [openModalDel, setOpenModalDel] = useState(false);
  const handleOpenDel = () => setOpenModalDel(true);
  const handleCloseDel = () => setOpenModalDel(false);
  const [isDelete, setIsDelete] = useState(false);

  // Модалка завершення
  const [openModalComplete, setOpenModalComplete] = useState(false);
  const handleOpenComplete = () => setOpenModalComplete(true);
  const handleCloseComplete = () => setOpenModalComplete(false);

  // Модалка відправлення
  const [openModalSend, setOpenModalSend] = useState(false);
  const handleOpenSend = () => setOpenModalSend(true);
  const handleCloseSend = () => setOpenModalSend(false);
  const [workerId, setWorkerId] = useState([]);
  const [isSend, setIsSend] = useState(false);

  // Модалка редагування
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenEdit = () => setOpenModalEdit(true);
  const handleCloseEdit = () => setOpenModalEdit(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pollActions.getPollDetail({ selectPollId, role }));
    dispatch(pollActions.getUsers(role));
  }, []);

  const deletePoll = async () => {
    const pollId = poll.id;
    await dispatch(pollActions.deletePoll({ role, pollId }));
    setIsDelete(true);
  };

  const completePoll = async () => {
    const pollId = poll.id;
    await dispatch(pollActions.completePoll({ role, pollId }));
  };

  const handleSendPoll = (whichId) => {
    handleOpenSend();
    setWorkerId(whichId);
  };

  const sendPoll = async (whichId) => {
    const pollId = poll.id;
    await dispatch(pollActions.sendPoll({ pollId, whichId, role }));
    setIsSend(true);
  };

  return (
    <>
      {fixWaiter && <FixLoader />}
      {detailPollWaiter ? (
        <Loader />
      ) : (
        <>
          {poll && (
            <>
              {isDelete ? (
                <Stack mt={5} mb={5}>
                  <S.QaModalTitle>Poll deleted!</S.QaModalTitle>
                  <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
                    <Button variant="contained" type="button" onClick={handleClose}>
                      Ок
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <>
                  <Stack
                    spacing={2}
                    mt={1}
                    mb={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <S.detailTitle> {poll.title}</S.detailTitle>

                    <Stack spacing={2} direction="row">
                      {poll.status === 1 && (
                        <Button variant="contained" onClick={() => handleOpenEdit()}>
                          Edit
                        </Button>
                      )}

                      <Button variant="contained" color="error" onClick={() => handleOpenDel()}>
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                  <S.detailInfo>
                    {poll.author && (
                      <S.detailInfoItem>Author: {poll.author.fullName}</S.detailInfoItem>
                    )}
                    {poll.date && <S.detailInfoItem>Created {poll.date}</S.detailInfoItem>}
                    <S.detailInfoItem>Anonymously {poll.anonymous ? 'Так' : 'Ні'}</S.detailInfoItem>
                  </S.detailInfo>
                  <Stack
                    mt={2}
                    mb={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <S.detailWorkersList>
                      {poll.status !== 3 && (
                        <WorkerListPoll
                          workers={ableWorkers}
                          wichList={poll.workers}
                          sendPoll={handleSendPoll}
                        />
                      )}
                    </S.detailWorkersList>
                    <S.detailStatusInfo>
                      <S.detailStatus>
                        Passed/Total
                        <S.detailStatusText>
                          {poll.resultCount}/{poll.workersCount}
                        </S.detailStatusText>
                      </S.detailStatus>
                      {poll.status === 3 ? (
                        <>Poll completed</>
                      ) : (
                        <Button variant="contained" onClick={handleOpenComplete}>
                          to complete
                        </Button>
                      )}
                    </S.detailStatusInfo>
                  </Stack>
                  <AnswersTable />
                </>
              )}
            </>
          )}

          <MyModal
            isOpen={openModalDel}
            handleOpen={handleOpenDel}
            handleClose={handleCloseDel}
            width={400}
          >
            {openModalDel && (
              <>
                <S.QaModalTitle>Delete this Poll?</S.QaModalTitle>
                <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                  <Button variant="contained" type="button" onClick={handleCloseDel}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      deletePoll();
                      handleCloseDel();
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </>
            )}
          </MyModal>

          <MyModal
            isOpen={openModalComplete}
            handleOpen={handleOpenComplete}
            handleClose={handleCloseComplete}
            width={400}
          >
            {openModalComplete && (
              <>
                <S.QaModalTitle>You really want to finish this Poll?</S.QaModalTitle>
                <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                  <Button variant="contained" type="button" onClick={handleCloseComplete}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      completePoll();
                      handleCloseComplete();
                    }}
                  >
                    to complete
                  </Button>
                </Stack>
              </>
            )}
          </MyModal>

          <MyModal
            isOpen={openModalSend}
            handleOpen={handleOpenSend}
            handleClose={() => {
              handleCloseSend();
              setIsSend(false);
            }}
            width={400}
          >
            {openModalSend && !fixWaiter ? (
              <>
                {isSend ? (
                  <>
                    <S.QaModalTitle>Poll sent</S.QaModalTitle>
                    <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        type="button"
                        onClick={() => {
                          handleCloseSend();
                          setIsSend(false);
                        }}
                      >
                        Ок
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    {poll.status === 2 ? (
                      <S.QaModalTitle>
                        Are you sure you want to make changes and submit again?
                      </S.QaModalTitle>
                    ) : (
                      <S.QaModalTitle>Send this to Poll Employees?</S.QaModalTitle>
                    )}

                    <Stack mt={2} mb={2} justifyContent="center" direction="row" spacing={2}>
                      <Button variant="contained" type="button" onClick={handleCloseSend}>
                        No
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          sendPoll(workerId);
                        }}
                      >
                        Yes
                      </Button>
                    </Stack>
                  </>
                )}
              </>
            ) : (
              <Loader />
            )}
          </MyModal>

          <MyModal
            isOpen={openModalEdit}
            handleOpen={handleOpenEdit}
            handleClose={handleCloseEdit}
            width={1000}
          >
            {openModalEdit && (
              <EditPoll
                title={poll.title}
                anonymous={poll.anonymous}
                questions={poll.questions}
                pollId={poll.id}
                handleClose={handleCloseEdit}
                handleOpen={handleOpenEdit}
              />
            )}
          </MyModal>
        </>
      )}
    </>
  );
};
DetailPoll.propTypes = {
  handleClose: PropTypes.func.isRequired,
  selectPollId: PropTypes.number.isRequired,
  role: PropTypes.number.isRequired,
};
export default DetailPoll;
