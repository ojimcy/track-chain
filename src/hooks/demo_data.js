import lvl1 from '../assets/images/level1.png';
import lvl2 from '../assets/images/level2.png';
import lvl3 from '../assets/images/level3.png';
import lvl4 from '../assets/images/level4.png';
import lvl5 from '../assets/images/level5.png';
import lvl6 from '../assets/images/level6.png';
import lvl7 from '../assets/images/level7.png';
import lvl8 from '../assets/images/level8.png';
import lvl9 from '../assets/images/level9.png';
import lvl10 from '../assets/images/level10.png';

// import placeholder from '../assets/images/placeholder.png';

import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import card3 from '../assets/images/card3.png';
import card4 from '../assets/images/card4.png';
import card5 from '../assets/images/card5.jpeg';
import card6 from '../assets/images/card6.png';
import card7 from '../assets/images/card7.png';
import card8 from '../assets/images/card8.png';
import card9 from '../assets/images/card9.png';
import card10 from '../assets/images/card10.png';
import card11 from '../assets/images/card11.png';
import card12 from '../assets/images/card12.png';
import card13 from '../assets/images/card13.png';
import card14 from '../assets/images/card14.png';
import card15 from '../assets/images/card15.png';
import card16 from '../assets/images/card16.png';
import card17 from '../assets/images/card17.png';
import card18 from '../assets/images/card18.png';
import card19 from '../assets/images/card19.png';
import card20 from '../assets/images/card20.png';
import card21 from '../assets/images/card21.png';
import card22 from '../assets/images/card22.jpeg';
import card23 from '../assets/images/card23.jpg';
import card24 from '../assets/images/card24.png';
import card25 from '../assets/images/card25.png';
import card26 from '../assets/images/card26.png';
import card27 from '../assets/images/card27.png';
import card28 from '../assets/images/card28.png';

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
    earning_per_hour: 2550,
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
    {
      level: 7,
      name: 'Grandmaster',
      tokensRequiredForLevel: 50000000,
      icon: lvl7,
    },
    {
      level: 8,
      name: 'Legendary',
      tokensRequiredForLevel: 100000000,
      icon: lvl8,
    },
    {
      level: 9,
      name: 'Mythical',
      tokensRequiredForLevel: 500000000,
      icon: lvl9,
    },
    {
      level: 10,
      name: 'Divine',
      tokensRequiredForLevel: 1000000000,
      icon: lvl10,
    },
  ],

  cards: [
    {
      id: 1,
      name: 'Token security',
      initialHMR: 600,
      initialUpgradeCost: 100000,
      requirements: null,
      category: 'Tokenization',
      maxLevel: '50',
      image: card1,
    },
    {
      id: 2,
      name: 'Token-issuance',
      initialHMR: 5000,
      initialUpgradeCost: 1000000,
      requirements: null,
      category: 'Tokenization',
      maxLevel: 50,
      image: card2,
    },
    {
      id: 3,
      name: 'Token creation',
      initialHMR: 600,
      initialUpgradeCost: 100000,
      requirements: true,
      category: 'Tokenization',
      maxLevel: 50,
      image: card3,
    },
    {
      id: 4,
      name: 'Real world assets (RWA)',
      initialHMR: 5000,
      initialUpgradeCost: 1000000,
      requirements: null,
      category: 'Tokenization',
      maxLevel: 50,
      image: card4,
    },
    {
      id: 5,
      name: 'Traditional Bridge',
      initialHMR: 600,
      initialUpgradeCost: 100000,
      requirements: null,
      category: 'Tokenization',
      maxLevel: 50,
      image: card5,
    },
    {
      id: 6,
      name: 'Real Estate (RWA)',
      initialHMR: 5000,
      initialUpgradeCost: 1000000,
      requirements: true,
      category: 'Tokenization',
      maxLevel: 50,
      image: card6,
    },
    {
      id: 7,
      name: 'Fractional Ownership',
      initialHMR: 600,
      initialUpgradeCost: 100000,
      requirements: true,
      category: 'Tokenization',
      maxLevel: 50,
      image: card7,
    },
    {
      id: 8,
      name: '(RWA)-Cars',
      initialHMR: 5000,
      initialUpgradeCost: 1000000,
      requirements: true,
      category: 'Tokenization',
      maxLevel: 50,
      image: card8,
    },
    {
      id: 9,
      name: 'P2P',
      initialHMR: 1000,
      initialUpgradeCost: 10000000,
      requirements: true,
      category: 'Marketplace',
      maxLevel: '50',
      image: card9,
    },
    {
      id: 10,
      name: 'Fans token ',
      initialHMR: 50,
      initialUpgradeCost: 200,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card10,
    },
    {
      id: 11,
      name: 'BTC Pairs',
      initialHMR: 100,
      initialUpgradeCost: 300,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card11,
    },
    {
      id: 12,
      name: 'ETH Pairs',
      initialHMR: 200,
      initialUpgradeCost: 400,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card12,
    },
    {
      id: 13,
      name: 'Deposit',
      initialHMR: 300,
      initialUpgradeCost: 500,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card13,
    },
    {
      id: 14,
      name: 'Staking',
      initialHMR: 400,
      initialUpgradeCost: 600,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card14,
    },
    {
      id: 15,
      name: 'NFT',
      initialHMR: 500,
      initialUpgradeCost: 700,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card15,
    },
    {
      id: 16,
      name: 'Withdrawal',
      initialHMR: 600,
      initialUpgradeCost: 800,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card16,
    },
    {
      id: 17,
      name: 'Meme coin',
      initialHMR: 700,
      initialUpgradeCost: 900,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card17,
    },
    {
      id: 18,
      name: 'Utility token',
      initialHMR: 700,
      initialUpgradeCost: 900,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card18,
    },
    {
      id: 19,
      name: 'Coin Marketcap',
      initialHMR: 500,
      initialUpgradeCost: 500,
      requirements: null,
      category: 'Marketplace',
      maxLevel: 50,
      image: card19,
    },
    {
      id: 20,
      name: 'Launchpad',
      initialHMR: 10000,
      initialUpgradeCost: 1000000,
      requirements: true,
      category: 'Web3',
      maxLevel: '50',
      image: card20,
    },
    {
      id: 21,
      name: 'Web3 Jobs',
      initialHMR: 1000,
      initialUpgradeCost: 200000,
      requirements: null,
      category: 'Web3',
      maxLevel: '50',
      image: card21,
    },
    {
      id: 22,
      name: 'Nft marketplace',
      initialHMR: 500,
      initialUpgradeCost: 290000,
      requirements: null,
      category: 'Web3',
      maxLevel: '50',
      image: card22,
    },
    {
      id: 23,
      name: 'Sport collectible marketplace',
      initialHMR: 25000,
      initialUpgradeCost: 5000000,
      requirements: true,
      category: 'Web3',
      maxLevel: '50',
      image: card23,
    },

    {
      id: 24,
      name: 'Market Making',
      initialHMR: 15000,
      initialUpgradeCost: 50000000,
      requirements: true,
      category: 'Web3',
      maxLevel: '50',
      image: card24,
    },

    {
      id: 25,
      name: 'Dex wallet',
      initialHMR: 5000,
      initialUpgradeCost: 1000000,
      requirements: true,
      category: 'Web3',
      maxLevel: '50',
      image: card25,
    },
    {
      id: 26,
      name: 'Friendship is key',
      initialHMR: 5000,
      initialUpgradeCost: 1000,
      requirements: null,
      category: 'Track',
      maxLevel: '50',
      image: card26,
    },
    {
      id: 27,
      name: 'Fight to win',
      initialHMR: 5000,
      initialUpgradeCost: 10000,
      requirements: true,
      category: 'Track',
      maxLevel: '50',
      image: card27,
    },
    {
      id: 28,
      name: 'Support Each-other',
      initialHMR: 5000,
      initialUpgradeCost: 20000,
      requirements: null,
      category: 'Track',
      maxLevel: '50',
      image: card28,
    },
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
