import { createAsyncThunk } from '@reduxjs/toolkit';
import { pollService } from 'src/services';

export const getPollsWorker = createAsyncThunk(
  'poll/getPollsWorker',
  async (data, { rejectWithValue }) => {
    try {
      const result = await pollService.getPollsWorker(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPollsHr = createAsyncThunk('poll/getPollsHr', async (data, { rejectWithValue }) => {
  try {
    const result = await pollService.getPollsHr(data);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPollsAdmin = createAsyncThunk(
  'poll/getPollsAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await pollService.getPollsAdmin();

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPollsType = createAsyncThunk(
  'poll/getPollsType',
  async (data, { rejectWithValue }) => {
    try {
      const result = await pollService.getPollsType();

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createPoll = createAsyncThunk(
  'poll/createPoll',
  async ({ data, role }, { rejectWithValue }) => {
    try {
      const newData = {
        ...data,
        questions: data.questions.map((item) => {
          if (item.type === 4) {
            return { ...item, answers: [{ value: null }] };
          }
          return item;
        }),
      };

      let result;
      if (role === 3) {
        result = await pollService.createPollHr(newData, role);
      } else {
        result = await pollService.createPollAdmin(newData, role);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const doPoll = createAsyncThunk(
  'poll/doPoll',
  async ({ answerList, pollId }, { rejectWithValue }) => {
    try {
      const answers = { answers: { ...answerList } };
      const result = await pollService.doPoll(answers, pollId);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const viewPoll = createAsyncThunk('poll/viewPoll', async (pollId, { rejectWithValue }) => {
  try {
    const result = await pollService.viewPoll(pollId);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPollDetail = createAsyncThunk(
  'poll/getPollDetail',
  async ({ selectPollId, role }, { rejectWithValue }) => {
    try {
      let result;
      if (role === 3) {
        result = await pollService.getPollDetailHr(selectPollId);
      } else {
        result = await pollService.getPollDetailAdmin(selectPollId);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUsers = createAsyncThunk('admin/getUsers', async (role, { rejectWithValue }) => {
  try {
    let result;
    if (role === 3) {
      result = await pollService.getUsersHr();
    } else {
      result = await pollService.getUsersAdmin();
    }

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePoll = createAsyncThunk(
  'poll/delete',
  async ({ role, pollId }, { rejectWithValue }) => {
    try {
      let result;
      if (role === 3) {
        result = await pollService.deletePollHr(pollId);
      } else {
        result = await pollService.deletePollAdmin(pollId);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const completePoll = createAsyncThunk(
  'admin/completePoll',
  async ({ role, pollId }, { rejectWithValue }) => {
    try {
      let result;
      if (role === 3) {
        result = await pollService.completePollHr(pollId);
      } else {
        result = await pollService.completePollAdmin(pollId);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const sendPoll = createAsyncThunk(
  'admin/sendPoll',
  async ({ pollId, whichId, role }, { rejectWithValue }) => {
    try {
      let result;
      const workers = {
        workers: whichId.map((item) => ({ id: item })),
      };

      if (role === 3) {
        result = await pollService.sendPollHr(pollId, workers);
      } else {
        result = await pollService.sendPollAdmin(pollId, workers);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editPoll = createAsyncThunk(
  'poll/editPoll',
  async ({ data, role, pollId }, { rejectWithValue }) => {
    try {
      const newData = {
        ...data,
        questions: data.questions.map((item) => {
          if (item.type === 4) {
            return {
              answers: [
                {
                  value: null,
                },
              ],
              name: item.name,
              pollId: item.pollId,
              required: item.required,
              type: item.type,
            };
          }
          return {
            answers: item.answers.map((answer) => ({
              value: answer.value,
              questionId: answer.questionId,
            })),
            name: item.name,
            pollId: item.pollId,
            required: item.required,
            type: item.type,
          };
        }),
      };

      let result;
      if (role === 3) {
        result = await pollService.editPollHr(pollId, newData);
      } else {
        result = await pollService.editPollAdmin(pollId, newData);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
