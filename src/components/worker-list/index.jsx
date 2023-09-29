import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Search from './search';
import * as S from './styles';

const WorkerList = ({ action, userId, wichList }) => {
  const [searchId, setSearchId] = useState(0);
  const workersList = useSelector((state) =>
    state.adminReducer.usersList.filter((item) => item.role === 2),
  );
  const [filtetedList, setFilteredList] = useState(workersList);
  const [wichWorkers, setWichWorkers] = useState();
  const [whichId, setWichId] = useState(wichList.map((item) => item.id));

  // Додавання та видалееня вибраних
  const addWichId = (id) => {
    const whichIdCopy = [...whichId];
    whichIdCopy.push(id);
    setWichId(whichIdCopy);
  };

  const removeWichId = (id) => {
    let whichIdCopy = [...whichId];
    whichIdCopy = whichIdCopy.filter((item) => item !== id);

    setWichId(whichIdCopy);
  };

  // Add All
  const toggleWich = (e) => {
    if (e.target.checked) {
      const whichIdCopy = workersList.map((item) => item.id);
      setWichId(whichIdCopy);
    } else {
      setWichId([]);
    }
  };

  // Отримання вибраних
  useEffect(() => {
    const wichWorkersList = workersList.filter((item) => {
      if (whichId.includes(item.id)) {
        return item;
      }
      return false;
    });
    setWichWorkers(wichWorkersList);

    action(whichId);
  }, [whichId]);

  // Пошук та брибираємо самого юзера із списку
  useEffect(() => {
    let list = workersList || [];
    if (userId) {
      list = list.filter((item) => item.id !== userId);
    }
    if (searchId) {
      list = list.filter((item) => item.id === searchId);
    }

    setFilteredList(list);
  }, [searchId, whichId]);

  return (
    <S.WorkerList>
      <S.WorkerCol>
        <S.SearchText>Employees</S.SearchText>
        <Search setSearchId={setSearchId} />
        <S.PickAll>
          <FormControlLabel
            control={<Checkbox defaultChecked={false} onChange={toggleWich} />}
            label="All Users"
          />
        </S.PickAll>

        <S.List>
          {filtetedList ? (
            <>
              {filtetedList.map((item) => {
                if (!whichId.includes(item.id)) {
                  return (
                    <S.Item key={item.id} onClick={() => addWichId(item.id)}>
                      <S.Name>
                        {item.shortName} {item.manager && `(Hr)`}
                      </S.Name>
                      <IconButton>
                        <AddIcon />
                      </IconButton>
                    </S.Item>
                  );
                }
                return false;
              })}
            </>
          ) : (
            <S.emtyText>There are no Employees to choose from</S.emtyText>
          )}
        </S.List>
      </S.WorkerCol>
      <S.WorkerCol className="which">
        <S.SearchText>Chosen</S.SearchText>
        <S.WorkerColFLex>
          <S.List className="which">
            {wichWorkers && wichWorkers.length ? (
              <>
                {wichWorkers.map((item) => {
                  if (whichId.includes(item.id)) {
                    return (
                      <S.Item key={item.id} onClick={() => removeWichId(item.id)}>
                        <S.Name>
                          {item.shortName} {item.manager && `(Hr)`}
                        </S.Name>
                        <IconButton>
                          <RemoveIcon />
                        </IconButton>
                      </S.Item>
                    );
                  }
                  return false;
                })}
              </>
            ) : (
              <S.emtyText>There are no Employees to choose from</S.emtyText>
            )}
          </S.List>
        </S.WorkerColFLex>
      </S.WorkerCol>
    </S.WorkerList>
  );
};

WorkerList.propTypes = {
  action: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  wichList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default WorkerList;
