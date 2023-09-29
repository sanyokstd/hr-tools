import { Button, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import * as S from './styles';

const DeleteVac = ({ handleClose, deleteId }) => {
  const fixWaiter = useSelector((state) => state.vacationsReducer.fixWaiter);
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(vacationsActions.myVacationDelete(deleteId));
    dispatch(vacationsActions.myVacation(1));
    setFormSubmit(true);
  };

  return (
    <>
      {fixWaiter && <FixLoader />}
      <form onSubmit={handleSubmit} id="form">
        {formSubmit ? (
          <>
            <S.ModalTitle>Request deleted!</S.ModalTitle>
            <Stack mt={2} mb={3} justifyContent="center" direction="row" spacing={2}>
              <Button variant="contained" onClick={handleClose}>
                Ок
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <S.ModalTitle>Delete request ?</S.ModalTitle>
            <Stack mt={2} mb={3} justifyContent="center" direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Yes
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                No
              </Button>
            </Stack>
          </>
        )}
      </form>
    </>
  );
};

DeleteVac.propTypes = {
  deleteId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default DeleteVac;
