import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Grid } from '@mui/material';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';
import { FieldMask } from 'src/components';
import { v4 as uuidv4 } from 'uuid';

import * as S from '../../styles';

const ContactsPhone = ({ nameArr, phonesList, errors, touched, handleChange, handleBlur }) => (
  <FieldArray
    name={nameArr}
    render={(helpers) => (
      <>
        {phonesList &&
          phonesList.map((child, index) => (
            <Box sx={{ flexGrow: 1 }} key={child.id}>
              <S.PersonalWrap>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FieldMask
                      mask="+380-99-999-99-99"
                      fullWidth
                      id={`${nameArr}[${index}].phone`}
                      name={`${nameArr}[${index}].phone`}
                      value={child.phone}
                      label="Phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched &&
                        touched[index] &&
                        touched[index].phone &&
                        Boolean(errors && errors[index] && errors[index].phone)
                      }
                      helperText={
                        touched &&
                        touched[index] &&
                        touched[index].phone &&
                        errors &&
                        errors[index] &&
                        errors[index].phone
                      }
                    />
                  </Grid>
                </Grid>
                {index >= phonesList.length - 1 && index < 1 ? (
                  <S.PersonalButtonAdd
                    onClick={() => helpers.push({ id: uuidv4(), phone: '' })}
                    title="Add Phone"
                  >
                    <ControlPointIcon />
                  </S.PersonalButtonAdd>
                ) : (
                  <S.PersonalButtonAdd onClick={() => helpers.remove(index)} title="Delete Phone">
                    <RemoveCircleOutlineIcon />
                  </S.PersonalButtonAdd>
                )}
              </S.PersonalWrap>
            </Box>
          ))}
      </>
    )}
  />
);

ContactsPhone.propTypes = {
  nameArr: PropTypes.string.isRequired,
  phonesList: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  errors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  touched: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.bool)).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default ContactsPhone;
