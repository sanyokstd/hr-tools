import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';
import { MyDataPicker } from 'src/components';
import { genderList } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';

import * as S from '../../styles';

const ChildRows = ({ childList, errors, touched, handleChange, handleBlur, setFieldValue }) => {
  const exemplePush = {
    id: uuidv4(),
    fullName: '',
    gender: genderList[0].value,
    birthday: null,
  };
  return (
    <FieldArray
      name="children"
      render={(helpers) => (
        <>
          <S.EmergencyBlock>
            {childList &&
              childList.map((child, index) => (
                <S.EmergencyRow key={child.id}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          id={`children[${index}].fullName`}
                          name={`children[${index}].fullName`}
                          label="Full name of the child"
                          value={child.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched &&
                            touched[index] &&
                            touched[index].fullName &&
                            Boolean(errors && errors[index] && errors[index].fullName)
                          }
                          helperText={
                            touched &&
                            touched[index] &&
                            touched[index].fullName &&
                            errors &&
                            errors[index] &&
                            errors[index].fullName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel id={`label-childGender${index}`}>Sex</InputLabel>
                          <Select
                            labelId={`label-childGender${index}`}
                            id={`children[${index}].gender`}
                            name={`children[${index}].gender`}
                            label="Sex"
                            value={child.gender ? child.gender : genderList[0].value}
                            onChange={handleChange}
                          >
                            {genderList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <MyDataPicker
                          fullWidth
                          maxData
                          clearButton={false}
                          id={`children[${index}].birthday`}
                          name={`children[${index}].birthday`}
                          label="Date of birth"
                          value={child.birthday ? child.birthday : ''}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </S.EmergencyRow>
              ))}
          </S.EmergencyBlock>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            {childList.length >= 1 && (
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => helpers.remove(childList.length - 1)}
              >
                Delete
              </Button>
            )}

            <Button variant="contained" size="small" onClick={() => helpers.push(exemplePush)}>
              Add
            </Button>
          </Stack>
        </>
      )}
    />
  );
};
ChildRows.propTypes = {
  childList: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      gender: PropTypes.number.isRequired,
    }),
  ).isRequired,
  errors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  touched: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};
export default ChildRows;
