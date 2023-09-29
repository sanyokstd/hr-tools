import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldMask } from 'src/components';
import { Loader } from 'src/components/';
import * as GS from 'src/global-styles';
import * as S from 'src/pages/auth/styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'At least 2 characters')
    .max(50, 'No more than 50 characters')
    .required('Required field'),
  lastName: Yup.string()
    .min(2, 'At least 2 characters')
    .max(50, 'No more than 50 characters')
    .required('Required field'),
  email: Yup.string().email('Incorrect email address').required('Required field'),
  phone: Yup.string().test('len', 'minimum 12 digits', (phone) => {
    if (phone) {
      const phoneNumb = phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '');
      return phoneNumb.length >= 12;
    }
    return false;
  }),
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

const SignUp = () => {
  const errors = useSelector((state) => state.authReducer.errors);
  const authLoader = useSelector((state) => state.authReducer.authWaiter);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearErrors()), []);

  const handleRequest = async (values) => {
    const res = await dispatch(authActions.createUser(values));

    const userId = res.payload.data.data.user.id;
    navigate(`/auth/resend-email/${userId}`);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => handleRequest(values),
  });

  return (
    <>
      {!authLoader ? (
        <>
          <S.AuthTitle>Registration</S.AuthTitle>

          <form onSubmit={formik.handleSubmit}>
            <S.FormRow>
              <TextField
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
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
              <TextField
                required
                value={formik.values.password_confirmation}
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
              <TextField
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                label="Name"
                id="firstName"
                name="firstName"
                variant="outlined"
                error={formik.errors.firstName && formik.touched.firstName}
                helperText={
                  formik.errors.firstName && formik.touched.firstName && formik.errors.firstName
                }
              />
            </S.FormRow>
            <S.FormRow>
              <TextField
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                label="Surnames"
                name="lastName"
                id="lastName"
                variant="outlined"
                error={formik.errors.lastName && formik.touched.lastName}
                helperText={
                  formik.errors.lastName && formik.touched.lastName && formik.errors.lastName
                }
              />
            </S.FormRow>
            <S.FormRow>
              <FieldMask
                required
                value={formik.values.phone}
                mask="+380-99-999-99-99"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                label="Phone number"
                name="phone"
                id="phone"
                variant="outlined"
                error={formik.errors.phone && formik.touched.phone}
                helperText={formik.errors.phone && formik.touched.phone && formik.errors.phone}
              />
            </S.FormRow>
            <S.FormRow>
              <GS.FlexContainer $justify="flex-end">
                <S.StyledLink to="/auth/">Do you have an account? Sign in</S.StyledLink>
              </GS.FlexContainer>
            </S.FormRow>
            <S.FormRow>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Create an account
              </Button>
            </S.FormRow>
          </form>
          {errors ? <Alert severity="error">{errors}</Alert> : null}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SignUp;
