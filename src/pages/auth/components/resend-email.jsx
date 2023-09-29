import { Alert, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from 'src/components/';
import * as GS from 'src/global-styles';
import * as S from 'src/pages/auth/styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';

const ResendEmail = () => {
  const [mailSended, setMailSended] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const authLoader = useSelector((state) => state.authReducer.authWaiter);
  const error = useSelector((state) => state.authReducer.errors);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearErrors()), []);

  useEffect(() => {
    const sendTimer = setTimeout(
      () =>
        setSeconds((prev) => {
          if (seconds > 0 && mailSended) {
            return prev - 1;
          }
          setMailSended(false);
          return 0;
        }),
      1000,
    );

    return () => {
      clearTimeout(sendTimer);
    };
  }, [seconds, mailSended]);

  const handleRequest = async () => {
    await dispatch(authActions.resend(userId));

    setMailSended(true);
    setSeconds(10);
  };

  return (
    <>
      {!authLoader ? (
        <>
          <S.AuthTitle>
            Please confirm your email address. To do this, follow the link from the letter that was
            sent to you by mail
          </S.AuthTitle>
          <S.FormRow>
            <GS.FlexContainer $justify="center">
              <Button onClick={handleRequest} disabled={mailSended} variant="contained">
                Send the letter again
              </Button>
            </GS.FlexContainer>
          </S.FormRow>
          {mailSended && (
            <S.FormRow>
              <GS.FlexContainer $justify="center">Message sent.</GS.FlexContainer>
              <GS.FlexContainer $justify="center">
                Can be resubmitted only once per {seconds} seconds
              </GS.FlexContainer>
            </S.FormRow>
          )}
          {error && <Alert severity="error">An error occurred, the message was not sent</Alert>}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ResendEmail;
