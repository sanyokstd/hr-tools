import { createSlice } from '@reduxjs/toolkit';

import { pollActions } from '../actions';

const pollSlice = createSlice({
  name: 'poll',
  initialState: {
    polls: [],
    pollsMeta: null,
    viewPoll: null,
    detailPoll: null,
    questionType: null,
    errors: false,
    waiter: false,
    detailPollWaiter: false,
    fixWaiter: false,
    typeWaiter: false,
    ableWorkers: [],
  },
  reducers: {
    clearErrors(state) {
      state.errors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get polls worker
      .addCase(pollActions.getPollsWorker.pending, (state) => {
        state.waiter = true;
      })
      .addCase(pollActions.getPollsWorker.fulfilled, (state, action) => {
        state.waiter = false;
        state.polls = action.payload.data.data;
        state.pollsMeta = action.payload.data.meta;
      })
      .addCase(pollActions.getPollsWorker.rejected, (state) => {
        state.waiter = false;
        state.polls = null;
      })

      // get polls hr
      .addCase(pollActions.getPollsHr.pending, (state) => {
        state.waiter = true;
      })
      .addCase(pollActions.getPollsHr.fulfilled, (state, action) => {
        state.polls = action.payload.data.data;
        state.pollsMeta = action.payload.data.meta;
        state.waiter = false;
      })
      .addCase(pollActions.getPollsHr.rejected, (state) => {
        state.waiter = false;
        state.polls = null;
      })

      // get polls admin
      .addCase(pollActions.getPollsAdmin.pending, (state) => {
        state.waiter = true;
      })
      .addCase(pollActions.getPollsAdmin.fulfilled, (state, action) => {
        state.polls = action.payload.data.data;
        state.pollsMeta = action.payload.data.meta;
        state.waiter = false;
      })
      .addCase(pollActions.getPollsAdmin.rejected, (state) => {
        state.waiter = false;
        state.polls = null;
      })

      // get polls type
      .addCase(pollActions.getPollsType.pending, (state) => {
        state.typeWaiter = true;
      })
      .addCase(pollActions.getPollsType.fulfilled, (state, action) => {
        state.typeWaiter = false;
        state.questionType = action.payload.data.data;
      })
      .addCase(pollActions.getPollsType.rejected, (state) => {
        state.typeWaiter = false;
        state.questionType = null;
      })

      // create Poll
      .addCase(pollActions.createPoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.createPoll.fulfilled, (state, action) => {
        const newPoll = action.payload.data.data;
        state.fixWaiter = false;
        state.polls = [newPoll, ...state.polls];
      })
      .addCase(pollActions.createPoll.rejected, (state) => {
        state.fixWaiter = false;
      })

      // do Poll
      .addCase(pollActions.doPoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.doPoll.fulfilled, (state) => {
        state.fixWaiter = false;
      })
      .addCase(pollActions.doPoll.rejected, (state) => {
        state.fixWaiter = false;
      })

      // view Poll
      .addCase(pollActions.viewPoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.viewPoll.fulfilled, (state, action) => {
        state.fixWaiter = false;
        state.viewPoll = action.payload.data.data;
      })
      .addCase(pollActions.viewPoll.rejected, (state) => {
        state.fixWaiter = false;
      })

      // get Poll detail
      .addCase(pollActions.getPollDetail.pending, (state) => {
        state.detailPollWaiter = true;
      })
      .addCase(pollActions.getPollDetail.fulfilled, (state, action) => {
        state.detailPollWaiter = false;
        state.detailPoll = action.payload.data.data;
      })
      .addCase(pollActions.getPollDetail.rejected, (state) => {
        state.detailPollWaiter = false;
      })

      // get users
      .addCase(pollActions.getUsers.pending, (state) => {
        state.detailPollWaiter = true;
        state.ableWorkers = [];
      })
      .addCase(pollActions.getUsers.fulfilled, (state, action) => {
        state.detailPollWaiter = false;
        state.ableWorkers = action.payload.data.data.filter((user) => user.role === 2);
      })
      .addCase(pollActions.getUsers.rejected, (state) => {
        state.detailPollWaiter = false;
      })

      // delete poll
      .addCase(pollActions.deletePoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.deletePoll.fulfilled, (state, action) => {
        state.fixWaiter = false;
        state.polls = state.polls.filter((poll) => poll.id !== action.meta.arg.pollId);
      })
      .addCase(pollActions.deletePoll.rejected, (state) => {
        state.fixWaiter = false;
      })

      // complete poll
      .addCase(pollActions.completePoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.completePoll.fulfilled, (state, action) => {
        const newPoll = action.payload.data.data;

        state.fixWaiter = false;
        state.polls = state.polls.map((item) => {
          if (item.id === newPoll.id) {
            return newPoll;
          }
          return item;
        });
        state.detailPoll = newPoll;
      })
      .addCase(pollActions.completePoll.rejected, (state) => {
        state.fixWaiter = false;
      })

      // send poll
      .addCase(pollActions.sendPoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.sendPoll.fulfilled, (state, action) => {
        const newPoll = action.payload.data.data;
        state.fixWaiter = false;

        state.polls = state.polls.map((item) => {
          if (item.id === newPoll.id) {
            return newPoll;
          }
          return item;
        });
        state.detailPoll = newPoll;
      })
      .addCase(pollActions.sendPoll.rejected, (state) => {
        state.fixWaiter = false;
      })

      // edit Poll
      .addCase(pollActions.editPoll.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(pollActions.editPoll.fulfilled, (state, action) => {
        const newPoll = action.payload.data.data;

        state.fixWaiter = false;
        state.polls = state.polls.map((poll) => {
          if (poll.id === newPoll.id) {
            return newPoll;
          }
          return poll;
        });
        state.detailPoll = newPoll;
      })
      .addCase(pollActions.editPoll.rejected, (state) => {
        state.fixWaiter = false;
      });
  },
});

export const { clearErrors } = pollSlice.actions;
export default pollSlice.reducer;
