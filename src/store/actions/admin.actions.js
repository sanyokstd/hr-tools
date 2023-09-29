import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from 'src/services';

export const adminGetUsers = createAsyncThunk('admin/getUsers', async (id, { rejectWithValue }) => {
  try {
    const result = await adminService.adminGetUsers();

    return result;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const adminDeleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const result = await adminService.adminDeleteUser(id);
      const newResult = { ...result, userId: id };
      return newResult;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const adminUpdateUser = createAsyncThunk(
  'admin/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      let newData = {
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
      if (!newData.hireDate) {
        delete newData.hireDate;
      }
      if (!newData.position) {
        delete newData.position;
      }
      if (!newData.role) {
        delete newData.role;
      } else {
        newData = { ...newData, role: Number(newData.role) };
      }
      if (!newData.workTime) {
        delete newData.workTime;
      } else {
        newData = { ...newData, workTime: String(newData.workTime) };
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
      if (!newData.area) {
        delete newData.area;
      }
      if (!newData.region) {
        delete newData.region;
      }
      if (!newData.town) {
        delete newData.town;
      }
      if (!newData.postOffice) {
        delete newData.postOffice;
      }
      if (!newData.middleName) {
        delete newData.middleName;
      }

      const result = await adminService.adminUpdateUser(newData);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const userResumeUpload = createAsyncThunk(
  'admin/resume',
  async ({ file, userId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const result = await adminService.userResumeUpload(formData, userId);
      const newResult = { ...result, userId };
      return newResult;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const userResumeDelete = createAsyncThunk(
  'admin/resumeDelete',
  async (userId, { rejectWithValue }) => {
    try {
      const result = await adminService.userResumeDelete(userId);
      const newResult = { ...result, userId };

      return newResult;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
