import PropTypes from 'prop-types';

import * as S from './styles';

const UserIcon = ({ img, name, isHr }) => (
  <S.Row>
    <S.Img $img={img} />
    <S.Name>
      {isHr && <S.Role> Hr Manager</S.Role>}
      {name}
    </S.Name>
  </S.Row>
);
UserIcon.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isHr: PropTypes.bool.isRequired,
};
export default UserIcon;
