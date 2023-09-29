import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from 'src/services';

export const createUser = createAsyncThunk(
  'auth/create-user',
  async (data, { rejectWithValue }) => {
    const newData = {
      ...data,
      phone: data.phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, ''),
    };

    try {
      const result = await authService.signUp(newData);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const authUser = createAsyncThunk('auth/auth-user', async (data, { rejectWithValue }) => {
  try {
    const result = await authService.signIn(data);

    if (result.data.data.user.email_verified_at) {
      localStorage.setItem('userToken', result.data.data.access_token);
      localStorage.setItem('blockTime', +new Date() + 3600 * 1000);
    }

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('userToken');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await authService.logout(data, headers);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const resend = createAsyncThunk('email/resend', async (data, { rejectWithValue }) => {
  try {
    const result = await authService.resend(data);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const verifyEmail = createAsyncThunk('email/verify', async (data, { rejectWithValue }) => {
  try {
    const result = await authService.verifyEmail(data);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const forgotPass = createAsyncThunk(
  'auth/fogot-password',
  async (data, { rejectWithValue }) => {
    try {
      const result = await authService.forgotPass(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const resetPass = createAsyncThunk(
  'auth/reset-password',
  async (data, { rejectWithValue }) => {
    try {
      const result = await authService.resetPass(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getUser = createAsyncThunk('personal/me', async (data, { rejectWithValue }) => {
  try {
    const result = await authService.getUser();

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editAvatar = createAsyncThunk('personal/image', async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('image', data);

    const result = await authService.editAvatar(formData);

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editPersonalInfo = createAsyncThunk(
  'editPersonalInfo',
  async (data, { rejectWithValue }) => {
    try {
      const newData = {
        ...data,
        contactsPhones: data.contactsPhones.map((item) => {
          const newItem = {
            ...item,
            phone: item.phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, ''),
          };
          return newItem;
        }),
        emergency: data.emergency.map((item) => {
          const newItem = {
            ...item,
            emergencyPhones: item.emergencyPhones.map((phoneItem) => {
              const newPhoneitem = {
                ...phoneItem,
                phone: phoneItem.phone.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, ''),
              };
              return newPhoneitem;
            }),
          };
          return newItem;
        }),
      };

      if (!newData.facebook) {
        delete newData.facebook;
      }
      if (!newData.linkedin) {
        delete newData.linkedin;
      }

      if (newData.contactsPhones) {
        newData.contactsPhones.map((item, index) => {
          delete newData.contactsPhones[index].id;
          return false;
        });
      }
      if (newData.emergency) {
        newData.emergency.map((item, index) => {
          item.emergencyPhones.map((phone, index2) => {
            delete newData.emergency[index].emergencyPhones[index2].id;
            return false;
          });
          return false;
        });
      }

      const result = await authService.editPersonalInfo(newData);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const personalResumeUpload = createAsyncThunk(
  'personal/resume',
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('resume', data);
      const result = await authService.personalResumeUpload(formData);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const personalResumeDelete = createAsyncThunk(
  'personal/resumeUpload',
  async (data, { rejectWithValue }) => {
    try {
      const result = await authService.personalResumeDelete();

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
