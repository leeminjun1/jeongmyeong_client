import api from './api';

export const appService = {
  getHello: () => api.get<string>('/'),
};
