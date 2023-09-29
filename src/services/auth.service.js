import { api } from 'src/api';

export const signUp = async (data) => {
  const result = await api.post(`auth/register`, data);

  return result;
};

export const signIn = async (data) => {
  const result = await api.post(`auth/login`, data);

  return result;
};

export const resend = async (data) => {
  const result = await api.post(`email/resend/${data}`);

  return result;
};

export const logout = async (data, headers) => {
  const result = await api.post(`auth/logout`, data, headers);

  return result.data;
};

export const verifyEmail = async (data) => {
  const result = await api.post(`email/verify/${data}`);

  return result;
};

export const forgotPass = async (data) => {
  const result = await api.post(`auth/forgot-password`, data);

  return result;
};

export const resetPass = async (data) => {
  const result = await api.post(`auth/reset`, data);

  return result;
};

export const getUser = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`personal/me`, headers);

  return result;
};

export const editAvatar = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`personal/image`, data, headers);

  return result;
};

export const editPersonalInfo = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.put(`personal/me`, data, headers);

  return result;
};

export const personalResumeUpload = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`personal/resume`, data, headers);

  return result;
};

export const personalResumeDelete = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.delete(`personal/resume`, headers);

  return result;
};
