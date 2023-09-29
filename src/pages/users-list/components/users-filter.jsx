import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material/';
import { useFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

import * as S from '../styles';

const UsersFilter = ({ setFilterParam }) => {
  const [filterActive, setFilterActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      fRole: 'all',
      fTime: 'all',
      fPosada: 'all',
      fData: 'all',
    },
  });

  useEffect(() => {
    setFilterParam(formik.values);
  }, [formik.values]);

  return (
    <S.UsersFilter className={filterActive && 'active'}>
      <S.UsersFilterTop>Filter</S.UsersFilterTop>
      <S.UsersFilterWrap>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fRole">Role</FormLabel>
            <RadioGroup
              aria-labelledby="fRole"
              defaultValue="all"
              name="fRole"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="3" control={<Radio />} label="HR" />
              <FormControlLabel value="2" control={<Radio />} label="Employee" />
              <FormControlLabel value="1" control={<Radio />} label="Admin" />
              <FormControlLabel value="null" control={<Radio />} label="Zero" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fTime">Working hours</FormLabel>
            <RadioGroup
              aria-labelledby="fTime"
              defaultValue="all"
              name="fTime"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="1" control={<Radio />} label="is" />
              <FormControlLabel value="0" control={<Radio />} label="there is no" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fPosada">Position</FormLabel>
            <RadioGroup
              aria-labelledby="fPosada"
              defaultValue="all"
              name="fPosada"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="1" control={<Radio />} label="is" />
              <FormControlLabel value="0" control={<Radio />} label="there is no" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
        <S.UsersFilterRow>
          <FormControl>
            <FormLabel id="fData">Date of employment</FormLabel>
            <RadioGroup
              aria-labelledby="fData"
              defaultValue="all"
              name="fData"
              onChange={formik.handleChange}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="1" control={<Radio />} label="is" />
              <FormControlLabel value="0" control={<Radio />} label="there is no" />
            </RadioGroup>
          </FormControl>
        </S.UsersFilterRow>
      </S.UsersFilterWrap>
      <S.UsersFilterToggle variant="contained" onClick={() => setFilterActive(!filterActive)}>
        {!filterActive ? <FilterAltIcon /> : <FilterAltOffIcon />}
      </S.UsersFilterToggle>
    </S.UsersFilter>
  );
};

UsersFilter.propTypes = {
  setFilterParam: PropTypes.func.isRequired,
};

export default UsersFilter;
