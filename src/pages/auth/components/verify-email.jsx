import { Button } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Loader } from 'src/components/';
import * as GS from 'src/global-styles';
import * as S from 'src/pages/auth/styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const View = () => {
  const authLoader = useSelector((state) => state.authReducer.authWaiter);
  const error = useSelector((state) => state.authReducer.errors);
  if (authLoader) {
    return <Loader />;
  }
  if (error) {
    return <S.AuthTitle>Confirmation has expired</S.AuthTitle>;
  }
  return (
    <>
      <S.AuthTitle>Thank you for confirming your email address</S.AuthTitle>
      <S.FormRow>
        <GS.FlexContainer $justify="center">
          <NavLink to="/auth">
            <Button variant="contained" type="button" size="large">
              Sign in
            </Button>
          </NavLink>
        </GS.FlexContainer>
      </S.FormRow>
    </>
  );
};

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const { userId } = useParams();

  useEffect(() => () => dispatch(clearErrors()), []);

  useEffect(() => {
    const expires = query.get('expires');
    const hash = query.get('hash');
    const signature = query.get('signature');
    const getParameters = `${userId}?expires=${expires}&hash=${hash}&signature=${signature}`;

    dispatch(authActions.verifyEmail(getParameters));

    return () => dispatch(clearErrors());
  }, []);

  return <View />;
};

export default VerifyEmail;
