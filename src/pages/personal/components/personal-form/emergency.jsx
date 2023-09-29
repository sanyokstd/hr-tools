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
import { relationship } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';

import * as S from '../../styles';
import ContactsPhone from './contacts-phone';

const Emergency = ({ emergency, errors, touched, handleChange, handleBlur }) => {
  const exemplePush = {
    id: uuidv4(),
    fullName: '',
    relationship: relationship[0].value,
    emergencyPhones: [
      {
        id: uuidv4(),
        phone: '',
      },
    ],
  };

  return (
    <FieldArray
      name="emergency"
      render={(helpers) => (
        <>
          <S.EmergencyBlock>
            {emergency &&
              emergency.map((child, index) => (
                <S.EmergencyRow key={child.id}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          id={`emergency[${index}].fullName`}
                          name={`emergency[${index}].fullName`}
                          label="Full name"
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
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id={`label-childGender${index}`}>Relations</InputLabel>
                          <Select
                            labelId={`label-childGender${index}`}
                            id={`emergency[${index}].relationship`}
                            name={`emergency[${index}].relationship`}
                            label="Relations"
                            value={child.relationship}
                            onChange={handleChange}
                          >
                            {relationship.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ContactsPhone
                          nameArr={`emergency[${index}].emergencyPhones`}
                          phonesList={child.emergencyPhones}
                          touched={
                            touched[index] && touched[index].emergencyPhones
                              ? touched[index].emergencyPhones
                              : []
                          }
                          errors={
                            errors[index] && errors[index].emergencyPhones
                              ? errors[index].emergencyPhones
                              : []
                          }
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </S.EmergencyRow>
              ))}
          </S.EmergencyBlock>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            {emergency.length > 1 && (
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => helpers.remove(emergency.length - 1)}
              >
                Delete
              </Button>
            )}
            {emergency.length < 2 && (
              <Button variant="contained" size="small" onClick={() => helpers.push(exemplePush)}>
                Add
              </Button>
            )}
          </Stack>
        </>
      )}
    />
  );
};
Emergency.propTypes = {
  emergency: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      relationship: PropTypes.number.isRequired,
    }),
  ).isRequired,
  errors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  touched: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default Emergency;
