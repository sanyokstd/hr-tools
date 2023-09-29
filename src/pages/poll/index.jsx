import { useSelector } from 'react-redux';
import { Header, HrAdminPoll, Sidebar, WorkerPolls } from 'src/components';
import * as GS from 'src/global-styles';

const Poll = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <GS.MainWrap>
      <Header pageName="Personal account" />
      <GS.Wrap>
        <GS.Main>
          <GS.MainLeft>
            <Sidebar />
          </GS.MainLeft>
          <GS.MainRight>
            {role === 2 ? <WorkerPolls isMain={false} /> : <HrAdminPoll isMain={false} />}
          </GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default Poll;
