import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import * as S from './styles';

const MyDataPicker = ({
  value,
  name,
  setFieldValue,
  maxData,
  clearButton = false,
  ...otherProps
}) => {
  const [dateFormated, setDateFormated] = useState('');
  const handleDateChange = (date) => {
    setDateFormated(date);
    const currentDate = dateFormated ? new Date(dateFormated) : new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setFieldValue(name, formattedDate);
  };

  const handleClear = () => {
    setDateFormated(null);
    setFieldValue(name, null);
  };

  return (
    <S.Picker>
      <DatePicker
        selected={dateFormated}
        maxDate={maxData ? new Date() : null}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => handleDateChange(date)}
        customInput={<TextField readOnly {...otherProps} />}
      />
      {clearButton && value && (
        <S.PickerClear onClick={handleClear}>
          <ClearIcon />
        </S.PickerClear>
      )}
    </S.Picker>
  );
};
MyDataPicker.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  maxData: PropTypes.bool.isRequired,
  clearButton: PropTypes.bool.isRequired,
};
export default MyDataPicker;
