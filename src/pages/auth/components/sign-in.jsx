import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Loader } from 'src/components/';
import * as GS from 'src/global-styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

import * as S from '../styles';

YupPassword(Yup);

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email address').required('Required field'),
  password: Yup.string()
    .required('Required field')
    .min(
      8,
      'Password must have 8 or more characters, at least one uppercase letter, at least one lowercase letter and one number',
    )
    .minLowercase(1, 'The password must have at least one lowercase letter')
    .minUppercase(1, 'The password must have at least one capital letter')
    .minNumbers(1, 'Password must have at least one digit'),
});

const SignIn = () => {
  const errors = useSelector((state) => state.authReducer.errors);
  const authLoader = useSelector((state) => state.authReducer.authWaiter);
  const [emailNotVerify, setEmailNotVerify] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => () => dispatch(clearErrors()), []);

  const handleRequest = async (values) => {
    const res = await dispatch(authActions.authUser(values));

    if (res.payload.data.data.user.email_verified_at) {
      navigate('/');
    } else {
      setEmailNotVerify(res.payload.data.data.user.id);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => handleRequest(values),
  });
  return (
    <>
      {!authLoader ? (
        <>
          <S.AuthTitle>Authorization</S.AuthTitle>

          <form onSubmit={formik.handleSubmit}>
            <S.FormRow>
              <TextField
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.email}
                label="E-mail"
                name="email"
                id="email"
                variant="outlined"
                error={formik.errors.email && formik.touched.email}
                helperText={formik.errors.email && formik.touched.email && formik.errors.email}
              />
            </S.FormRow>
            <S.FormRow>
              <TextField
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                value={formik.values.password}
                label="Password"
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
              <GS.FlexContainer $justify="space-between">
                <S.StyledLink to="/auth/sign-up">Registration</S.StyledLink>
                <S.StyledLink to="/auth/forgot-pass">Forgot your password?</S.StyledLink>
              </GS.FlexContainer>
            </S.FormRow>
            <S.FormRow>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
              >
                Sign in
              </Button>
            </S.FormRow>
            {errors && <Alert severity="error">Invalid login or password</Alert>}

            {emailNotVerify && (
              <S.AlertStyled severity="error">
                Your email is not confirmed{' '}
                <NavLink to={`/auth/resend-email/${emailNotVerify}`}>click to preview</NavLink>
              </S.AlertStyled>
            )}
          </form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SignIn;
