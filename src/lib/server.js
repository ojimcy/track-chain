import axios from './axiosService';
import {
  BOOST_ENERGY,
  BOOST_TAPS,
  CLAIM_TOKENS,
  COMPLET_TASK,
  DAILYREWARD,
  ENERGYLEVELS,
  GET_CARDS,
  GET_DAILY_COMBO,
  GET_MINED_TOKENS,
  GET_USER_CARDS,
  GET_USER_COMBO_CARD,
  LEADERBOARD,
  LEVELS,
  MULTITAPLEVELS,
  MY_DOWNLINES,
  SAVETAPS,
  SUBMIT_COMBO,
  SYNC_ACCOUNT,
  TASK,
  TASKS,
  UPGRADE_CARD,
  USER_BY_ID,
  USER_LEVEL,
  USERS,
} from './endpoints';

export const getUserByTelegramID = async (id) => {
  try {
    const result = await axios.get(USER_BY_ID(id));

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const result = await axios.get(USERS());
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

export const boostTaps = async () => {
  const result = await axios.post(BOOST_TAPS());
  return result.data;
};

export const boostEnergy = async () => {
  const result = await axios.post(BOOST_ENERGY());
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

export const getMtultiTapLevels = async () => {
  const result = await axios.get(MULTITAPLEVELS());
  return result.data;
};

export const getEnergyLevels = async () => {
  const result = await axios.get(ENERGYLEVELS());
  return result.data;
};

export const getLeaderboard = async () => {
  const result = await axios.get(LEADERBOARD());
  return result.data;
};

export const saveTaps = async (score) => {
  const result = await axios.post(SAVETAPS(), { score });
  return result.data;
};

export const claimDailyReward = async () => {
  const result = await axios.post(DAILYREWARD());
  return result.data;
};

export const getCards = async () => {
  const result = await axios.get(GET_CARDS());
  return result.data;
};

export const getUserCards = async () => {
  const result = await axios.get(GET_USER_CARDS());
  return result.data;
};

export const upgradeCard = async (cardId) => {
  const result = await axios.post(UPGRADE_CARD(cardId));
  return result.data;
};

export const claimTokens = async () => {
  const result = await axios.post(CLAIM_TOKENS());
  return result.data;
};

export const getMinedTokens = async () => {
  const result = await axios.get(GET_MINED_TOKENS());
  return result.data;
};

export const getDailyCombo = async () => {
  const result = await axios.get(GET_DAILY_COMBO());
  return result.data;
};

export const submitCombo = async (combos) => {
  const [trackCard, otherCard1, otherCard2] = combos;
  const payload = { trackCard, otherCard1, otherCard2 };
  const result = await axios.post(SUBMIT_COMBO(), payload);
  return result.data;
};

export const getUserComboCard = async () => {
  const result = await axios.get(GET_USER_COMBO_CARD());
  return result.data;
};
