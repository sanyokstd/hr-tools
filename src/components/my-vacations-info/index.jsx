import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import CreateVac from './create-vac';
import * as S from './styles';

const MyVacationsInfo = () => {
  const dispatch = useDispatch();
  const myVacationInfo = useSelector((state) => state.vacationsReducer.myVacationInfo);
  const waiter = useSelector((state) => state.vacationsReducer.myVacationInfoWaiter);
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  useEffect(() => {
    dispatch(vacationsActions.myVacationInfo());
  }, []);

  return (
    <>
      <S.MainTop>
        <S.MainTopTitle> Vacation/Sick</S.MainTopTitle>
        <Button startIcon={<AddIcon />} onClick={() => handleOpenCreate()}>
          Create a request
        </Button>
      </S.MainTop>
      {waiter ? (
        <Loader />
      ) : (
        <S.Vac>
          {myVacationInfo && (
            <>
              <S.VacItem>
                <S.VacItemLabel>Vacation</S.VacItemLabel>
                <S.VacItemText>
                  <span>Available: {myVacationInfo.availableVacationsDays}</span>{' '}
                  <span>Used: {myVacationInfo.vacationDaysUsed}</span>
                </S.VacItemText>
              </S.VacItem>
              <S.VacItem>
                <S.VacItemLabel>Sick</S.VacItemLabel>
                <S.VacItemText>
                  <span>Used: {myVacationInfo.hospitalDaysUsed}</span>
                </S.VacItemText>
              </S.VacItem>
            </>
          )}
        </S.Vac>
      )}
      <MyModal isOpen={openCreate} handleClose={handleCloseCreate} width={600}>
        {openCreate && <CreateVac handleClose={handleCloseCreate} />}
      </MyModal>
    </>
  );
};

export default MyVacationsInfo;
