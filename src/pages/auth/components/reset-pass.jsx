import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from 'src/components';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

import * as S from '../styles';

YupPassword(Yup);

const ResetPassSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required field')
    .min(
      8,
      'Password must have 8 or more characters, at least one uppercase letter, at least one lowercase letter and one number',
    )
    .minLowercase(1, 'The password must have at least one lowercase letter')
    .minUppercase(1, 'The password must have at least one capital letter')
    .minNumbers(1, 'Password must have at least one digit'),
  password_confirmation: Yup.string()
    .required('Required field')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

const ResetPass = () => {
  const authLoader = useSelector((state) => state.authReducer.authWaiter);
  const error = useSelector((state) => state.authReducer.errors);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const { userToken, userEmail } = useParams();
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearErrors()), []);

  const handleRequest = async (values) => {
    await dispatch(authActions.resetPass(values));
    setSubmitConfirm(true);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
      token: userToken,
      email: userEmail,
    },
    validationSchema: ResetPassSchema,
    onSubmit: (values) => handleRequest(values),
  });
  return (
    <>
      {!authLoader ? (
        <>
          <S.AuthTitle>Password recovery</S.AuthTitle>

          <form onSubmit={formik.handleSubmit}>
            <S.FormRow>
              <TextField
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="New password"
                type="password"
                name="password"
                id="password"
                variant="outlined"
                error={formik.errors.password && formik.touched.password}
                helperText={
                  formik.errors.password && formik.touched.password && formik.errors.password
                }
              />
            </S.FormRow>
            <S.FormRow>
              <TextField
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="Confirm password"
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                variant="outlined"
                error={formik.errors.password_confirmation && formik.touched.password_confirmation}
                helperText={
                  formik.errors.password_confirmation &&
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
              />
            </S.FormRow>

            <S.FormRow>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
              >
                Change password
              </Button>
            </S.FormRow>
          </form>
          {submitConfirm && !error && (
            <S.AlertStyled severity="success">
              Your password has been changed! <NavLink to="/auth">Sign in</NavLink>
            </S.AlertStyled>
          )}
          {error && (
            <S.AlertStyled severity="error">
              {error} <NavLink to="/auth/forgot-pass/">Send the letter again</NavLink>
            </S.AlertStyled>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ResetPass;
