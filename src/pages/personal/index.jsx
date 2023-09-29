import { useSelector } from 'react-redux';
import { Header, Loader, Sidebar } from 'src/components';
import * as GS from 'src/global-styles';

import { PersonalForm } from './components';
import * as S from './styles';

const Personal = () => {
  const waiter = useSelector((state) => state.pollReducer.waiter);

  return (
    <GS.MainWrap>
      <Header pageName="Personal account" />
      <GS.Wrap>
        <GS.Main>
          {!waiter ? (
            <>
              <GS.MainLeft>
                <Sidebar />
              </GS.MainLeft>
              <GS.MainRight>
                <PersonalForm />
              </GS.MainRight>
            </>
          ) : (
            <Loader />
          )}
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default Personal;
