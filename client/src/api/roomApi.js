import axiosClient from './axiosClient';

export const roomApi = {
  getAllRooms(params) {
    const url = `/api/rooms?${params}`;
    return axiosClient.get(url,params);
  },
  getRoomById(id) {
    const url = `/api/room/${id}`;
    return axiosClient.get(url);
  },
};
