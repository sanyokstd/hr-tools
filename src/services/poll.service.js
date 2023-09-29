import { api } from 'src/api';

export const getPollsWorker = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`polls?page=${data || 1}`, headers);

  return result;
};

export const getPollsHr = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`hr/polls?page=${data || 1}`, headers);

  return result;
};

export const getPollsAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`admin/polls?page=${data || 1}`, headers);

  return result;
};

export const getPollsType = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await api.get(`question-type`, headers);

  return result;
};

export const createPollHr = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`hr/polls`, data, headers);

  return result;
};

export const createPollAdmin = async (data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`admin/polls`, data, headers);

  return result;
};

export const doPoll = async (data, id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`polls/${id}/do`, data, headers);

  return result;
};

export const viewPoll = async (pollId) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.get(`polls/${pollId}/view`, headers);

  return result;
};

export const getPollDetailAdmin = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.get(`admin/polls/${id}`, headers);

  return result;
};

export const getPollDetailHr = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.get(`hr/polls/${id}`, headers);

  return result;
};

export const getUsersAdmin = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.get(`admin/users`, headers);

  return result;
};

export const getUsersHr = async () => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.get(`hr/users`, headers);

  return result;
};

export const deletePollAdmin = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.delete(`admin/polls/${id}`, headers);

  return result;
};

export const deletePollHr = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.delete(`hr/polls/${id}`, headers);

  return result;
};

export const completePollAdmin = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`admin/polls/${id}/complete`, null, headers);

  return result;
};

export const completePollHr = async (id) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`hr/polls/${id}/complete`, null, headers);

  return result;
};

export const sendPollAdmin = async (id, body) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`admin/polls/${id}/send`, body, headers);

  return result;
};

export const sendPollHr = async (id, body) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.post(`hr/polls/${id}/send`, body, headers);

  return result;
};

export const editPollHr = async (id, data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.put(`hr/polls/${id}`, data, headers);

  return result;
};

export const editPollAdmin = async (id, data) => {
  const token = localStorage.getItem('userToken');
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await api.put(`admin/polls/${id}`, data, headers);

  return result;
};
