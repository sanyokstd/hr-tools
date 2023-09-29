import { api } from 'src/api';

export const getVacationsAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`admin/vacation?page=${data || 1}`, headers);

  return result;
};

export const acceptVacationAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`admin/vacation/${data}/accept`, null, headers);

  return result;
};

export const cancelVacationAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`admin/vacation/${data}/cancel`, null, headers);

  return result;
};

export const getVacationsHr = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`hr/vacation?page=${data || 1}`, headers);

  return result;
};

export const acceptVacationHr = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`hr/vacation/${data}/accept`, null, headers);

  return result;
};

export const cancelVacationHr = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`hr/vacation/${data}/cancel`, null, headers);

  return result;
};

export const myVacation = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`vacation`, headers);

  return result;
};

export const myVacationDelete = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.delete(`vacation/${id}`, headers);

  return result;
};

export const myVacationCreate = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.post(`vacation`, data, headers);

  return result;
};
export const myVacationInfo = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`vacation/info`, headers);

  return result;
};
