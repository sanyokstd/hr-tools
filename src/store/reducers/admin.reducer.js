import { createSlice } from '@reduxjs/toolkit';

import { adminActions } from '../actions';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    usersList: null,
    errors: false,
    waiter: false,
    fixWaiter: false,
  },
  reducers: {
    clearErrors(state) {
      state.errors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUsers
      .addCase(adminActions.adminGetUsers.pending, (state) => {
        state.waiter = true;
      })
      .addCase(adminActions.adminGetUsers.fulfilled, (state, action) => {
        state.waiter = false;
        state.usersList = action.payload.data.data;
      })
      .addCase(adminActions.adminGetUsers.rejected, (state) => {
        state.waiter = false;
      })

      // deleteUsers
      .addCase(adminActions.adminDeleteUser.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(adminActions.adminDeleteUser.fulfilled, (state, action) => {
        state.fixWaiter = false;
        const { userId } = action.payload;
        state.usersList = state.usersList.filter((item) => item.id !== userId);
      })
      .addCase(adminActions.adminDeleteUser.rejected, (state) => {
        state.fixWaiter = false;
      })

      // adminUpdateUser
      .addCase(adminActions.adminUpdateUser.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(adminActions.adminUpdateUser.fulfilled, (state, action) => {
        const newItem = action.payload.data.data;
        state.fixWaiter = false;
        state.usersList = state.usersList.map((item) => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        });
      })
      .addCase(adminActions.adminUpdateUser.rejected, (state) => {
        state.fixWaiter = false;
      })

      // userResumeUpload
      .addCase(adminActions.userResumeUpload.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(adminActions.userResumeUpload.fulfilled, (state, action) => {
        const { userId } = action.payload;
        const file = action.payload.data.data;
        state.fixWaiter = false;
        state.usersList = state.usersList.map((item) => {
          if (item.id === userId) {
            return { ...item, resume: file };
          }
          return item;
        });
      })
      .addCase(adminActions.userResumeUpload.rejected, (state) => {
        state.fixWaiter = false;
      })

      // userResumeDelete
      .addCase(adminActions.userResumeDelete.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(adminActions.userResumeDelete.fulfilled, (state, action) => {
        const { userId } = action.payload;
        state.fixWaiter = false;
        state.usersList = state.usersList.map((item) => {
          if (item.id === userId) {
            return { ...item, resume: null };
          }
          return item;
        });
      })
      .addCase(adminActions.userResumeDelete.rejected, (state) => {
        state.fixWaiter = false;
      });
  },
});

export const { clearErrors } = adminSlice.actions;
export default adminSlice.reducer;
