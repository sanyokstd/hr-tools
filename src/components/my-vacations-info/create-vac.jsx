import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader } from 'src/components';
import { localeUa } from 'src/constants';
import { vacationsActions } from 'src/store/actions';

import * as S from '../my-vacations/styles';

const CreateVac = ({ handleClose }) => {
  const fixWaiter = useSelector((state) => state.vacationsReducer.fixWaiter);
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();
  const myVacationInfoError = useSelector((state) => state.vacationsReducer.myVacationInfoError);

  const handleSubmit = async (data) => {
    const res = await dispatch(vacationsActions.myVacationCreate(data));
    if (res.payload.status === 200) {
      dispatch(vacationsActions.myVacationInfo());
      dispatch(vacationsActions.myVacation(1));
      setFormSubmit(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      type: '0',
      dateStart: '',
      dateEnd: '',
      comment: '',
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  useEffect(() => {
    const currentDate = new Date(startDate);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    formik.setFieldValue('dateStart', formattedDate);
  }, [startDate]);

  useEffect(() => {
    const currentDate = new Date(endDate);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    formik.setFieldValue('dateEnd', formattedDate);
  }, [endDate]);

  return (
    <>
      {fixWaiter && <FixLoader />}
      {formSubmit ? (
        <>
          <S.QaModalTitle>Request Created!</S.QaModalTitle>
          <Stack mt={2} justifyContent="center" direction="row" spacing={2}>
            <Button variant="contained" onClick={handleClose}>
              Ок
            </Button>
          </Stack>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit} id="form">
          <S.ModalTitle>Create a request</S.ModalTitle>
          <S.ModalRow>
            <FormControl>
              <S.ModalLabel>Тип</S.ModalLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="type"
                onChange={formik.handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="Vacation" />
                <FormControlLabel value="1" control={<Radio />} label="Sick" />
              </RadioGroup>
            </FormControl>
          </S.ModalRow>

          <S.ModalRow>
            <S.ModalLabel>Comment</S.ModalLabel>
            <TextField
              mt={1}
              fullWidth
              id="comment"
              label="Comment"
              variant="outlined"
              name="comment"
              multiline
              maxRows={4}
              onChange={formik.handleChange}
            />
          </S.ModalRow>

          <S.ModalLabel>Start and end date</S.ModalLabel>
          <Stack justifyContent="flex-start" direction="row" spacing={2}>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale={localeUa}
            />
          </Stack>

          {myVacationInfoError && (
            <Stack mt={2} mb={2}>
              <Alert severity="error">{myVacationInfoError.message}</Alert>
            </Stack>
          )}

          <Stack mt={2} mb={2} justifyContent="flex-start" direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Create
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Back
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

CreateVac.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default CreateVac;
