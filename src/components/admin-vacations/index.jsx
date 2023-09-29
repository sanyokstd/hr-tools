import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { avatarDefault } from 'src/assets/images';
import { FixLoader, Loader } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import * as S from './styles';

function getPosition(userRole) {
  switch (userRole) {
    case 1:
      return 'Admin';
    case 2:
      return 'Employee';
    case 3:
      return 'Hr manager';
    default:
      return 'Admin';
  }
}

function getStatus(status) {
  switch (status) {
    case 0:
      return 'Rejected';
    case 1:
      return 'Approved';
    default:
      return 'Under consideration';
  }
}

function getType(type) {
  switch (type) {
    case 0:
      return 'Vacation';
    case 1:
      return 'Sick';
    default:
      return 'Vacation';
  }
}
const AdminVacations = ({ isMain }) => {
  const dispatch = useDispatch();
  const waiter = useSelector((state) => state.vacationsReducer.waiter);
  const fixWaiter = useSelector((state) => state.vacationsReducer.fixWaiter);
  const vacations = useSelector((state) => state.vacationsReducer.vacations);
  const vacationsMeta = useSelector((state) => state.vacationsReducer.vacationsMeta);

  useEffect(() => {
    dispatch(vacationsActions.getVacationsAdmin(1));
  }, []);

  const handleChangePage = (page) => {
    dispatch(vacationsActions.getVacationsAdmin(page));
  };

  const handleAccept = (id) => {
    dispatch(vacationsActions.acceptVacationAdmin(id));
  };

  const handleCancel = (id) => {
    dispatch(vacationsActions.cancelVacationAdmin(id));
  };

  return (
    <>
      {fixWaiter && <FixLoader />}

      {isMain ? (
        <S.MainTop>
          <S.MainTopTitle>Employee requests</S.MainTopTitle>
          <S.MainTopLink to="vacation">
            Watch all
            <ArrowForwardIcon />
          </S.MainTopLink>
        </S.MainTop>
      ) : (
        <S.MainTop>
          <S.MainTopTitle>Employee requests</S.MainTopTitle>
        </S.MainTop>
      )}
      {!waiter ? (
        <>
          {vacations && vacations.length ? (
            <S.HrList>
              {vacations.map((item) => (
                <S.Vac key={item.id}>
                  <S.VacTop>
                    <S.VacItem>
                      <S.VacLabel>Employee</S.VacLabel>
                      <S.VacWorker>
                        <S.VacWorkerAvatar src={item.user.avatar || avatarDefault} />
                        <S.VacWorkerName>
                          {item.user.fullName}
                          <S.VacWorkerPosition>{getPosition(item.user.role)}</S.VacWorkerPosition>
                        </S.VacWorkerName>
                      </S.VacWorker>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Date/type</S.VacLabel>
                      <S.VacType>{getType(item.type)}</S.VacType>
                      <S.VacData>
                        {item.dateStart} - {item.dateEnd}
                      </S.VacData>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Number of days</S.VacLabel>
                      <S.VacData>{item.daysCount}</S.VacData>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Date of request</S.VacLabel>
                      <S.VacData>{getStatus(item.status)}</S.VacData>
                    </S.VacItem>
                  </S.VacTop>
                  {item.comment && <S.VacComment>{item.comment}</S.VacComment>}
                  {item.status === null && (
                    <S.VacBtns>
                      <Button variant="contained" onClick={() => handleAccept(item.id)}>
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancel(item.id)}
                      >
                        Reject
                      </Button>
                    </S.VacBtns>
                  )}
                </S.Vac>
              ))}
              {vacationsMeta.total > 0 && !isMain && (
                <S.Paginate>
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={(nextPage) => handleChangePage(nextPage.selected + 1)}
                    pageCount={vacationsMeta.last_page}
                    forcePage={vacationsMeta.current_page - 1}
                    activeClassName="active"
                    pageRangeDisplayed="2"
                    marginPagesDisplayed="1"
                  />
                </S.Paginate>
              )}
            </S.HrList>
          ) : (
            <>There are no requests</>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
AdminVacations.propTypes = {
  isMain: PropTypes.bool.isRequired,
};
export default AdminVacations;
