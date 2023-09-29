import {
  Alert,
  Box,
  Button,
  Collapse,
  FormControl,
  getFormLabelUtilityClasses,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyDataPicker } from 'src/components';
import { genderList, maritalStatus, relationship } from 'src/constants';
import * as GS from 'src/global-styles';
import { authActions } from 'src/store/actions';
import { clearErrors } from 'src/store/reducers/auth.reducer';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import * as S from '../../styles';
import ChildRows from './child-rows';
import ContactsPhone from './contacts-phone';
import Emergency from './emergency';
import UploadForm from './ubload-form';

const validationSchema = Yup.object({
  lastName: Yup.string('')
    .required(' Required field')
    .min(2, 'Minimum 2 characters')
    .max(50, 'A maximum of 50 characters')
    .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name')
    .nullable(),
  firstName: Yup.string('')
    .required(' Required field')
    .min(2, 'Minimum 2 characters')
    .max(50, 'A maximum of 50 characters')
    .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name')
    .nullable(),
  middleName: Yup.string('')
    .required(' Required field')
    .min(2, 'Minimum 2 characters')
    .max(50, 'A maximum of 50 characters')
    .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name')
    .nullable(),
  children: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string()
        .required(' Required field')
        .min(2, 'Minimum 2 characters')
        .max(50, 'A maximum of 50 characters')
        .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name'),
    }),
  ),
  region: Yup.string('')
    .required(' Required field')
    .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name')
    .nullable(),
  area: Yup.string('')
    .required(' Required field')
    .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name')
    .nullable(),
  town: Yup.string('')
    .required(' Required field')
    .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name')
    .nullable(),
  postOffice: Yup.string('').required(' Required field').nullable(),
  contactsPhones: Yup.array().of(
    Yup.object().shape({
      phone: Yup.string()
        .required(' Required field')
        .test('len', 'minimum 12 digits', (phone) => {
          if (phone) {
            const phoneNumb = phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '');
            return phoneNumb.length >= 12;
          }
          return false;
        }),
    }),
  ),
  email: Yup.string().email('Incorrect email address').required('Required field'),
  emergency: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string()
        .required(' Required field')
        .min(2, 'Minimum 2 characters')
        .max(50, 'A maximum of 50 characters')
        .matches(/^[^0-9`~!@#$%^&*()_+={}[\]|\\:;“’<,>.?๐]*$/, 'Please enter a valid name'),
      emergencyPhones: Yup.array().of(
        Yup.object().shape({
          phone: Yup.string()
            .required(' Required field')
            .test('len', 'minimum 12 digits', (phone) => {
              if (phone) {
                const phoneNumb = phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '');
                return phoneNumb.length >= 12;
              }
              return false;
            }),
        }),
      ),
    }),
  ),
  linkedin: Yup.string('').nullable(),
  facebook: Yup.string('').nullable(),
});

const PersonalForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const userInfo = useSelector((state) => state.authReducer.user);

  const userInfoFiltered = {
    ...userInfo,
    gender: userInfo.gender || 0,
    maritalStatus: userInfo.maritalStatus || 0,
    contactsPhones: userInfo.contactsPhones,
    emergency:
      userInfo.emergency.length < 1
        ? [
            {
              id: uuidv4(),
              fullName: '',
              relationship: relationship[0].value,
              emergencyPhones: [
                {
                  id: uuidv4(),
                  phone: '',
                },
              ],
            },
          ]
        : userInfo.emergency,
  };

  const dispatch = useDispatch();

  useEffect(() => () => dispatch(clearErrors()), []);

  const handeSend = async (val) => {
    await dispatch(authActions.editPersonalInfo(val));
    setFormSubmit(true);
    setTimeout(() => {
      setFormSubmit(false);
    }, 5000);
  };

  const formik = useFormik({
    initialValues: userInfoFiltered,
    validationSchema,
    onSubmit: (values) => {
      handeSend(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} id="form">
      <S.PersonalBlock>
        <S.PersonaTitle>Basic information</S.PersonaTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="lastName"
                label="Surname"
                value={formik.values.lastName || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="firstName"
                label="Name"
                value={formik.values.firstName || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="middleName"
                label="Middle name"
                value={formik.values.middleName || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                helperText={formik.touched.middleName && formik.errors.middleName}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MyDataPicker
                fullWidth
                maxData
                clearButton={false}
                id="birthday"
                name="birthday"
                label="Date of birth"
                value={formik.values.birthday ? formik.values.birthday : ''}
                setFieldValue={formik.setFieldValue}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="label-gender">Sex</InputLabel>
                <Select
                  labelId="label-gender"
                  id="gender"
                  name="gender"
                  label="Sex"
                  value={formik.values.gender ? formik.values.gender : genderList[0].value}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {genderList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="label-gender">Family status</InputLabel>
                <Select
                  labelId="label-gender"
                  id="maritalStatus"
                  name="maritalStatus"
                  label="Family status"
                  value={
                    formik.values.maritalStatus
                      ? formik.values.maritalStatus
                      : maritalStatus[0].value
                  }
                  onChange={formik.handleChange}
                >
                  {maritalStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </S.PersonalBlock>

      <S.PersonalBlock>
        <S.PersonaTitle>Information about children</S.PersonaTitle>

        <FormikProvider value={formik}>
          <ChildRows
            childList={formik.values.children}
            touched={formik.touched.children ? formik.touched.children : []}
            errors={formik.errors.children ? formik.errors.children : []}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            setFieldValue={formik.setFieldValue}
          />
        </FormikProvider>
      </S.PersonalBlock>

      <S.PersonalBlock>
        <S.PersonaTitle>Address</S.PersonaTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="region"
                label="Region"
                value={formik.values.region || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.region && Boolean(formik.errors.region)}
                helperText={formik.touched.region && formik.errors.region}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="area"
                label="Area"
                value={formik.values.area || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.area && Boolean(formik.errors.area)}
                helperText={formik.touched.area && formik.errors.area}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="town"
                label="City/Village"
                value={formik.values.town || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.town && Boolean(formik.errors.town)}
                helperText={formik.touched.town && formik.errors.town}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                name="postOffice"
                label="The nearest branch of the new post office"
                value={formik.values.postOffice || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.postOffice && Boolean(formik.errors.postOffice)}
                helperText={formik.touched.postOffice && formik.errors.postOffice}
              />
            </Grid>
          </Grid>
        </Box>
      </S.PersonalBlock>

      <S.PersonalBlock>
        <S.PersonaTitle>Contacts</S.PersonaTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={5}>
              <FormikProvider value={formik}>
                <ContactsPhone
                  nameArr="contactsPhones"
                  phonesList={formik.values.contactsPhones}
                  touched={formik.touched.contactsPhones ? formik.touched.contactsPhones : []}
                  errors={formik.errors.contactsPhones ? formik.errors.contactsPhones : []}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
              </FormikProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>
        </Box>
      </S.PersonalBlock>

      <S.PersonalBlock>
        <S.PersonaTitle>Social networks</S.PersonaTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="linkedin"
                label="Linkedin"
                value={formik.values.linkedin || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="facebook"
                label="Facebook"
                value={formik.values.facebook || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <UploadForm
                path={
                  formik.values.resume && formik.values.resume.path ? formik.values.resume.path : ''
                }
                resumeFileName={formik.values.resume ? formik.values.resume.name : ''}
                handleBlur={formik.handleBlur}
                errors={formik.errors.resume ? formik.errors.resume : ''}
              />
            </Grid>
          </Grid>
        </Box>
      </S.PersonalBlock>

      <S.PersonalBlock>
        <S.PersonaTitle>For emergency communication</S.PersonaTitle>
        <FormikProvider value={formik}>
          <Emergency
            emergency={formik.values.emergency}
            touched={formik.touched.emergency ? formik.touched.emergency : []}
            errors={formik.errors.emergency ? formik.errors.emergency : []}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </FormikProvider>
      </S.PersonalBlock>

      <S.PersonalBlock>
        <GS.FlexContainer $justify="flex-end">
          <Button variant="contained" type="submit">
            Save
          </Button>
        </GS.FlexContainer>
      </S.PersonalBlock>

      <Collapse in={formSubmit}>
        <S.PersonalBlock>
          <Alert severity="success">Data saved successfully</Alert>
        </S.PersonalBlock>
      </Collapse>
    </form>
  );
};

export default PersonalForm;
