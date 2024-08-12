// export const ROOT = 'https://localhost:3001';
export const ROOT = 'https://tsa.moonwifhat.fun';

export const USER_BY_ID = (id) => `${ROOT}/user/${id}`;
export const MY_DOWNLINES = (limit) => `${ROOT}/my-downlines?limit=${limit}`;
export const SYNC_ACCOUNT = () => `${ROOT}/sync-profile`;
export const BOOST_TAPS = () => `${ROOT}/boost-taps`;
export const BOOST_ENERGY = () => `${ROOT}/boost-energy`;
export const TASK = (id) => `${ROOT}/tasks/${id}`;
export const COMPLET_TASK = (userID, taskID) =>
  `${ROOT}/user/${userID}/complete-task/${taskID}`;
export const TASKS = (userID) => `${ROOT}/user/${userID}/tasks`;
export const USER_LEVEL = (userID) => `${ROOT}/user/${userID}/level`;
export const LEVELS = () => `${ROOT}/level`;
export const LEADERBOARD = () => `${ROOT}/leaderboard`;
