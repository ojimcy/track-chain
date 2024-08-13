import lvl1 from '../assets/images/lvl1.png';
import lvl2 from '../assets/images/lvl2.png';
import lvl3 from '../assets/images/lvl3.png';
import lvl4 from '../assets/images/lvl4.png';
import lvl5 from '../assets/images/lvl5.png';
import lvl6 from '../assets/images/lvl6.png';
import lvl7 from '../assets/images/lvl7.png';
import lvl8 from '../assets/images/lvl8.png';
import lvl9 from '../assets/images/lvl9.png';
import lvl10 from '../assets/images/lvl10.png';

const data = {
  user: {
    id: 278699491,
    first_name: 'Anthony',
    last_name: "Ademu (won't ask you for money)",
    username: 'Oxa2e',
    language_code: 'en',
    allows_write_to_pm: true,
    level: 5,
    balance: 1750000,
    total_balance: 1500000,
    earning_per_hour: 2350,
    energy_limit: 5000,
    energy_level: 4,
    multi_tap: 5,
    tap_level: 4,
  },
  chat_instance: '8110049788557690445',
  chat_type: 'sender',
  start_param: 'qwer',
  auth_date: '1715000453',
  hash: 'd68f66763c03179bb2fd83836af6d6bd2e4ed4a7e45eb3b30fde27a501b3b116',

  levels: [
    { level: 1, name: 'Bronze', tokensRequiredForLevel: 10000, icon: lvl1 },
    { level: 2, name: 'Silver', tokensRequiredForLevel: 50000, icon: lvl2 },
    { level: 3, name: 'Gold', tokensRequiredForLevel: 250000, icon: lvl3 },
    { level: 4, name: 'Platinum', tokensRequiredForLevel: 1000000, icon: lvl4 },
    { level: 5, name: 'Diamond', tokensRequiredForLevel: 3500000, icon: lvl5 },
    { level: 6, name: 'Master', tokensRequiredForLevel: 10000000, icon: lvl6 },
    { level: 7, name: 'Grandmaster', tokensRequiredForLevel: 50000000, icon: lvl7 },
    { level: 8, name: 'Legendary', tokensRequiredForLevel: 100000000, icon: lvl8 },
    { level: 9, name: 'Mythical', tokensRequiredForLevel: 500000000, icon: lvl9 },
    { level: 10, name: 'Divine', tokensRequiredForLevel: 1000000000, icon: lvl10 },
  ],
  

  energy: [
    { level: 1, point: 500, cost: 1000 },
    { level: 2, point: 500, cost: 2000 },
    { level: 3, point: 500, cost: 4000 },
    { level: 4, point: 500, cost: 8000 },
    { level: 5, point: 500, cost: 16000 },
  ],

  multiTap: [
    { level: 1, tap: 1, cost: 1000 },
    { level: 2, tap: 1, cost: 2000 },
    { level: 3, tap: 1, cost: 4000 },
    { level: 4, tap: 1, cost: 8000 },
    { level: 5, tap: 1, cost: 16000 },
  ],
  
};

export default data;
