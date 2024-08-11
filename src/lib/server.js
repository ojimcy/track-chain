import axios from './axiosService';
import {
  BOOST_ENERGY,
  BOOST_TAPS,
  COMPLET_TASK,
  LEVELS,
  MY_DOWNLINES,
  SYNC_ACCOUNT,
  TASK,
  TASKS,
  USER_BY_ID,
  USER_LEVEL,
} from './endpoints';

export const getUserByTelegramID = async (id) => {
  try {

    const result = await axios.get(USER_BY_ID(id));

    console.log('Telegram result', result);

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMyDownlines = async (limit = 0) => {
  try {
    const result = await axios.get(MY_DOWNLINES(limit));
    return result.data;
  } catch (error) {
    return null;
  }
};

export const createAccount = async (userData) => {
  const result = await axios.post(SYNC_ACCOUNT(), userData);
  return result.data;
};

export const boostTaps = async (input) => {
  const result = await axios.post(BOOST_TAPS(), input);
  return result.data;
};

export const boostEnergy = async (input) => {
  const result = await axios.post(BOOST_ENERGY(), input);
  return result.data;
};

export const getTasks = async (userId) => {
  const result = await axios.get(TASKS(userId));
  return result.data;
};

export const getTask = async () => {
  const result = await axios.get(TASK());
  return result.data;
};

export const completeTask = async (userId, taskId, proof) => {
  const result = await axios.post(COMPLET_TASK(userId, taskId), { proof });
  return result.data;
};

export const getUserLevel = async (userId) => {
  const result = await axios.get(USER_LEVEL(userId));
  return result.data.level;
};

export const getLevels = async () => {
  const result = await axios.get(LEVELS());
  return result.data;
};