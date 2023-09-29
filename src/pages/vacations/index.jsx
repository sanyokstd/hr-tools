import { useSelector } from 'react-redux';
import {
  AdminVacations,
  Header,
  HrVacations,
  MyVacations,
  MyVacationsInfo,
  Sidebar,
} from 'src/components';
import * as GS from 'src/global-styles';

import * as S from './styles';

const Vacations = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <GS.MainWrap>
      <Header pageName="Vacation/Sick" />
      <GS.Wrap>
        <GS.Main>
          <GS.MainLeft>
            <Sidebar />
          </GS.MainLeft>
          <GS.MainRight>
            {role === 1 && (
              <S.MainRightBlock>
                <AdminVacations isMain={false} />
              </S.MainRightBlock>
            )}
            {role === 2 && (
              <>
                <S.MainRightBlock>
                  <MyVacationsInfo />
                </S.MainRightBlock>
                <S.MainRightBlock>
                  <MyVacations />
                </S.MainRightBlock>
              </>
            )}
            {role === 3 && (
              <>
                <S.MainRightBlock>
                  <MyVacationsInfo />
                </S.MainRightBlock>
                <S.MainRightBlock>
                  <MyVacations />
                </S.MainRightBlock>
                <S.MainRightBlock>
                  <HrVacations isMain={false} />
                </S.MainRightBlock>
              </>
            )}
          </GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default Vacations;
