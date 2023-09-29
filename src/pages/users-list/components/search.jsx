import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as S from '../styles';

const Search = ({ setSearchId }) => {
  const [open, setOpen] = useState(false);
  const usersList = useSelector((state) => state.adminReducer.usersList);
  const waiter = useSelector((state) => state.adminReducer.waiter);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersList) {
      const usersArr = usersList.map((item) => ({ title: item.fullName, id: item.id }));

      setUsers(usersArr);
    }
  }, [usersList]);

  return (
    <>
      <S.SearchText>Enter user name to search</S.SearchText>
      <S.SearchForm>
        <S.SearchField
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              setSearchId(newValue.id);
            } else {
              setSearchId(0);
            }
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={users}
          loading={waiter}
          renderInput={(params) => (
            <TextField
              size="small"
              placeholder="Search..."
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {waiter ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </S.SearchForm>
    </>
  );
};

Search.propTypes = {
  setSearchId: PropTypes.func.isRequired,
};

export default Search;
