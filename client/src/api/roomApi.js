import axiosClient from './axiosClient';

export const roomApi = {
  getAllRooms() {
    const url = '/api/rooms';
    return axiosClient.get(url);
  },
  getRoomById(id) {
    const url = `/api/room/${id}`;
    return axiosClient.get(url);
  },
};
