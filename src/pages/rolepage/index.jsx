import { Header } from 'src/components';
import * as GS from 'src/global-styles';

import * as S from './styles';

const RolePage = () => (
  <GS.MainWrap>
    <Header pageName="" />
    <GS.Wrap>
      <S.RoleWrap>
        <S.T1>You have successfully logged into the system!</S.T1>
        <S.T2>Wait, soon you will be granted access!</S.T2>
      </S.RoleWrap>
    </GS.Wrap>
  </GS.MainWrap>
);

export default RolePage;
