import axios from './axiosService';
import {
  BOOST,
  BOOSTS,
  COMPLET_TASK,
  MY_DOWNLINES,
  SYNC_ACCOUNT,
  TASK,
  TASKS,
  USER_BY_ID,
} from './endpoints';

export const getUserByTelegramID = async (id) => {
  console.log('outside the tc');
  
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

export const getBoosts = async () => {
  const result = await axios.get(BOOSTS());
  return result.data;
};

export const boost = async (input) => {
  const result = await axios.post(BOOST(), input);
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
