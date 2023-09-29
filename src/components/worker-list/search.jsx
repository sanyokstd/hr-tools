import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as S from './styles';

const Search = ({ setSearchId }) => {
  const [open, setOpen] = useState(false);
  const workerList = useSelector((state) =>
    state.adminReducer.usersList.filter((item) => item.role === 2),
  );
  const waiter = useSelector((state) => state.adminReducer.waiter);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (workerList) {
      const usersArr = workerList.map((item) => ({ title: item.shortName, id: item.id }));

      setUsers(usersArr);
    }
  }, []);

  return (
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
  );
};

Search.propTypes = {
  setSearchId: PropTypes.func.isRequired,
};

export default Search;
