// export const ROOT = 'https://localhost:3001';
export const ROOT = 'https://tsa.moonwifhat.fun';

export const USER_BY_ID = (id) => `${ROOT}/user/${id}`;
export const USERS = () => `${ROOT}/users`;
export const MY_DOWNLINES = (limit) => `${ROOT}/my-downlines?limit=${limit}`;
export const SYNC_ACCOUNT = () => `${ROOT}/sync-profile`;
export const BOOST_TAPS = () => `${ROOT}/boost-tap`;
export const BOOST_ENERGY = () => `${ROOT}/boost-energy`;
export const TASK = (id) => `${ROOT}/tasks/${id}`;
export const COMPLET_TASK = (userID, taskID) =>
  `${ROOT}/user/${userID}/complete-task/${taskID}`;
export const TASKS = (userID) => `${ROOT}/user/${userID}/tasks`;
export const USER_LEVEL = (userID) => `${ROOT}/user/${userID}/level`;
export const LEVELS = () => `${ROOT}/levels`;
export const MULTITAPLEVELS = () => `${ROOT}/multitap-levels`;
export const ENERGYLEVELS = () => `${ROOT}/energy-levels`;
export const LEADERBOARD = () => `${ROOT}/leaderboard`;
export const SAVETAPS = () => `${ROOT}/save-taps`;
export const DAILYREWARD = () => `${ROOT}/user/claim-daily-reward`;
export const UPGRADE_CARD = (cardId) => `${ROOT}/card/${cardId}/upgrade`;
export const GET_CARDS = () => `${ROOT}/cards`;
export const GET_USER_CARDS = () => `${ROOT}/user-cards`;
export const CLAIM_TOKENS = () => `${ROOT}/claim`;
export const GET_MINED_TOKENS = () => `${ROOT}/get-mined-tokens`;
