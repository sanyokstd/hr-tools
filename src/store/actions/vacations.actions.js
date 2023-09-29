import { createAsyncThunk } from '@reduxjs/toolkit';
import { vacationsService } from 'src/services';

export const getVacationsAdmin = createAsyncThunk(
  'admin/getVacationsAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.getVacationsAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const acceptVacationAdmin = createAsyncThunk(
  'admin/acceptVacationAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.acceptVacationAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const cancelVacationAdmin = createAsyncThunk(
  'admin/cancelVacationAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.cancelVacationAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getVacationsHr = createAsyncThunk(
  'admin/getVacationsHr',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.getVacationsHr(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const acceptVacationHr = createAsyncThunk(
  'admin/acceptVacationHr',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.acceptVacationHr(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const cancelVacationHr = createAsyncThunk(
  'admin/cancelVacationHr',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.cancelVacationHr(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const myVacation = createAsyncThunk(
  'admin/myVacation',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.myVacation(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const myVacationDelete = createAsyncThunk(
  'admin/myVacationDelete',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.myVacationDelete(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const myVacationCreate = createAsyncThunk(
  'admin/myVacationCreate',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.myVacationCreate(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const myVacationInfo = createAsyncThunk(
  'admin/myVacationInfo',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.myVacationInfo(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
