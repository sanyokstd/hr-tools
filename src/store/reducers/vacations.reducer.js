import { createSlice } from '@reduxjs/toolkit';

import { vacationsActions } from '../actions';

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState: {
    vacations: [],
    vacationsMeta: [],
    myVacations: [],
    myVacationsMeta: [],
    myVacationWaiter: false,
    myVacationInfo: null,
    myVacationInfoError: false,
    myVacationInfoWaiter: false,
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
      // getVacationsAdmin
      .addCase(vacationsActions.getVacationsAdmin.pending, (state) => {
        state.waiter = true;
      })
      .addCase(vacationsActions.getVacationsAdmin.fulfilled, (state, action) => {
        state.vacations = action.payload.data.data;
        state.vacationsMeta = action.payload.data.meta;
        state.waiter = false;
      })
      .addCase(vacationsActions.getVacationsAdmin.rejected, (state) => {
        state.waiter = false;
      })

      // acceptVacationAdmin
      .addCase(vacationsActions.acceptVacationAdmin.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.acceptVacationAdmin.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.acceptVacationAdmin.rejected, (state) => {
        state.fixWaiter = false;
      })

      // cancelVacationAdmin
      .addCase(vacationsActions.cancelVacationAdmin.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.cancelVacationAdmin.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.cancelVacationAdmin.rejected, (state) => {
        state.fixWaiter = false;
      })

      // getVacationsHr
      .addCase(vacationsActions.getVacationsHr.pending, (state) => {
        state.waiter = true;
      })
      .addCase(vacationsActions.getVacationsHr.fulfilled, (state, action) => {
        state.vacations = action.payload.data.data;
        state.vacationsMeta = action.payload.data.meta;
        state.waiter = false;
      })
      .addCase(vacationsActions.getVacationsHr.rejected, (state) => {
        state.waiter = false;
      })

      // acceptVacationHr
      .addCase(vacationsActions.acceptVacationHr.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.acceptVacationHr.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.acceptVacationHr.rejected, (state) => {
        state.fixWaiter = false;
      })

      // cancelVacationHr
      .addCase(vacationsActions.cancelVacationHr.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.cancelVacationHr.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.cancelVacationHr.rejected, (state) => {
        state.fixWaiter = false;
      })

      // myVacation
      .addCase(vacationsActions.myVacation.pending, (state) => {
        state.myVacationWaiter = true;
      })
      .addCase(vacationsActions.myVacation.fulfilled, (state, action) => {
        state.myVacations = action.payload.data.data;
        state.myVacationsMeta = action.payload.data.meta;
        state.myVacationWaiter = false;
      })
      .addCase(vacationsActions.myVacation.rejected, (state) => {
        state.myVacationWaiter = false;
      })

      // myVacationDelete
      .addCase(vacationsActions.myVacationDelete.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.myVacationDelete.fulfilled, (state) => {
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.myVacationDelete.rejected, (state) => {
        state.fixWaiter = false;
      })

      // myVacationCreate
      .addCase(vacationsActions.myVacationCreate.pending, (state) => {
        state.myVacationInfoError = false;
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.myVacationCreate.fulfilled, (state) => {
        state.myVacationInfoError = false;
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.myVacationCreate.rejected, (state, action) => {
        state.myVacationInfoError = action.payload.error;
        state.fixWaiter = false;
      })

      // myVacationInfo
      .addCase(vacationsActions.myVacationInfo.pending, (state) => {
        state.myVacationInfoWaiter = true;
      })
      .addCase(vacationsActions.myVacationInfo.fulfilled, (state, action) => {
        state.myVacationInfo = action.payload.data.data;
        state.myVacationInfoWaiter = false;
      })
      .addCase(vacationsActions.myVacationInfo.rejected, (state) => {
        state.myVacationInfoWaiter = false;
      });
  },
});

export const { clearErrors } = vacationsSlice.actions;
export default vacationsSlice.reducer;
