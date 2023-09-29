import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FixLoader, Header } from 'src/components';
import * as GS from 'src/global-styles';

import { Search, UsersFilter, UsersTable } from './components';
import * as S from './styles';

const UsersList = () => {
  const [searchId, setSearchId] = useState(0);
  const [filterParam, setFilterParam] = useState({
    fRole: 'all',
    fTime: 'all',
    fPosada: 'all',
    fData: 'all',
  });
  const fixWaiter = useSelector((state) => state.adminReducer.fixWaiter);
  return (
    <>
      <GS.MainWrap>
        <Header pageName="" />
        <GS.Wrap>
          <Search setSearchId={setSearchId} />
          <S.UsersListFlex>
            <UsersTable searchId={searchId} filterParam={filterParam} />
            <UsersFilter setFilterParam={setFilterParam} />
          </S.UsersListFlex>
        </GS.Wrap>
      </GS.MainWrap>

      {fixWaiter && <FixLoader />}
    </>
  );
};

export default UsersList;
