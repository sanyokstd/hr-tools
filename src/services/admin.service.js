import { api } from 'src/api';

export const adminGetUsers = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.get(`admin/users`, headers);

  return result;
};

export const adminDeleteUser = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.delete(`admin/users/${id}`, headers);

  return result;
};

export const adminUpdateUser = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.put(`admin/users/${data.id}`, data, headers);

  return result;
};

export const userResumeUpload = async (file, userId) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`admin/users/${userId}/resume`, file, headers);

  return result;
};

export const userResumeDelete = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.delete(`admin/users/${id}/resume`, headers);

  return result;
};
