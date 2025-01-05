import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/users";

export const listUsers = () => axios.get(BASE_URL);

export const addUser = (user) => axios.post(BASE_URL, user);

export const getUser = (userId) => axios.get(BASE_URL + '/' + userId);

export const updateUser = (userId, user) => axios.put(BASE_URL + '/' + userId, user);

export const deleteUser = (userId) => axios.delete(BASE_URL + '/' + userId);