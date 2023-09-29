import { createSlice } from '@reduxjs/toolkit';

import { authActions } from '../actions';

const userInitial = {
  area: null,
  avatar: null,
  birthday: null,
  children: [],
  contactsPhones: [],
  email: null,
  email_verified_at: null,
  emergency: [],
  firstName: null,
  gender: null,
  id: null,
  lastName: null,
  maritalStatus: null,
  middleName: null,
  postOffice: null,
  region: null,
  resumeFile: null,
  role: null,
  town: null,
};

// Видаляєм токен авторизації через 1 годину
if (+new Date() >= parseInt(localStorage.getItem('blockTime'), 10)) {
  localStorage.clear();
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userInitial,
    userToken: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null,
    errors: false,
    waiter: false,
    fixWaiter: false,
    authWaiter: false,
  },
  reducers: {
    clearErrors(state) {
      state.errors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // createUser
      .addCase(authActions.createUser.pending, (state) => {
        state.authWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.createUser.fulfilled, (state) => {
        state.authWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.createUser.rejected, (state, action) => {
        state.authWaiter = false;
        state.errors = action.payload.message;
      })

      // authUser
      .addCase(authActions.authUser.pending, (state) => {
        state.authWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.authUser.fulfilled, (state, action) => {
        if (action.payload.data.data.user.email_verified_at) {
          state.user = action.payload.data.data.user;
          state.userToken = action.payload.data.data.access_token;
        }

        state.authWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.authUser.rejected, (state, action) => {
        state.authWaiter = false;
        state.errors = action.payload.errors.message;
      })

      // logoutUser
      .addCase(authActions.logoutUser.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(authActions.logoutUser.fulfilled, (state) => {
        state.user = userInitial;
        state.userToken = null;
        state.fixWaiter = false;
      })
      .addCase(authActions.logoutUser.rejected, (state, action) => {
        state.fixWaiter = false;
      })

      // resend
      .addCase(authActions.resend.pending, (state) => {
        state.authWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.resend.fulfilled, (state) => {
        state.authWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.resend.rejected, (state) => {
        state.authWaiter = false;
        state.errors = true;
      })

      // verifyEmail
      .addCase(authActions.verifyEmail.pending, (state) => {
        state.authWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.verifyEmail.fulfilled, (state) => {
        state.authWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.verifyEmail.rejected, (state) => {
        state.authWaiter = false;
        state.errors = true;
      })

      // forgotPass
      .addCase(authActions.forgotPass.pending, (state) => {
        state.authWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.forgotPass.fulfilled, (state) => {
        state.authWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.forgotPass.rejected, (state, action) => {
        state.authWaiter = false;
        state.errors = action.payload.message;
      })

      // resetPass
      .addCase(authActions.resetPass.pending, (state) => {
        state.authWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.resetPass.fulfilled, (state) => {
        state.authWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.resetPass.rejected, (state, action) => {
        state.authWaiter = false;
        state.errors = action.payload.error.message;
      })

      // getUser
      .addCase(authActions.getUser.pending, (state) => {
        state.waiter = true;
      })
      .addCase(authActions.getUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.waiter = false;
      })
      .addCase(authActions.getUser.rejected, (state) => {
        state.waiter = false;
      })

      // editAvatar
      .addCase(authActions.editAvatar.pending, (state) => {
        state.fixWaiter = true;
        state.errors = false;
      })
      .addCase(authActions.editAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.fixWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.editAvatar.rejected, (state) => {
        state.fixWaiter = false;
        state.errors = true;
      })

      // editPersonalInfo
      .addCase(authActions.editPersonalInfo.pending, (state) => {
        state.errors = false;
        state.fixWaiter = true;
      })
      .addCase(authActions.editPersonalInfo.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.fixWaiter = false;
        state.errors = false;
      })
      .addCase(authActions.editPersonalInfo.rejected, (state) => {
        state.fixWaiter = false;
        state.errors = true;
      })

      // personalResume
      .addCase(authActions.personalResumeUpload.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(authActions.personalResumeUpload.fulfilled, (state) => {
        state.fixWaiter = false;
      })
      .addCase(authActions.personalResumeUpload.rejected, (state) => {
        state.fixWaiter = false;
      })

      .addCase(authActions.personalResumeDelete.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(authActions.personalResumeDelete.fulfilled, (state) => {
        state.fixWaiter = false;
      })
      .addCase(authActions.personalResumeDelete.rejected, (state) => {
        state.fixWaiter = false;
      });
  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
