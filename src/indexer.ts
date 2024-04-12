import {Web3} from 'web3';
import {LoadWallets} from './loadWallets';
import {getBalance} from './balanceOf';

let tokenAddress = '0x0000000000000000000000000000000000001111';

const httpProvider = new Web3.providers.HttpProvider(
  'http://geth-rpc-endpoint:8545'
);
const web3Client = new Web3(httpProvider);

interface TotalValuePerUser {
  user: string;
  amount: string;
}

export const totalTokenBalancePerUser = async () => {
  // The total token balance for each user in addresses.json. Format: <user name>: <amount> <symbol>

  const totalBalancePerUser: TotalValuePerUser[] = [{user: '', amount: ''}];
  let currentUser = '';
  let balancerPerWallet: string[] = [];

  const userAndWalletsArr = Object.entries(LoadWallets()).flat();
  for (let i = 0; i < userAndWalletsArr.length; i++) {
    const userOrWallet = userAndWalletsArr[i];

    if (Array.isArray(userOrWallet)) {
      for (let u = 0; u < userOrWallet.length; u++) {
        const balance = await getBalance(
          web3Client,
          tokenAddress,
          userOrWallet[u]
        );
        if (balance) {
          balancerPerWallet.push(balance);
        }
      }
      const totalBalance = balancerPerWallet.reduce(
        (partialSum, a) => partialSum + Number(a),
        0
      );
      totalBalancePerUser.push({
        user: currentUser,
        amount: `${totalBalance} ETH`,
      });
    } else {
      currentUser = userOrWallet;
      balancerPerWallet = [];
    }
  }

  return totalBalancePerUser.filter(i => i.user !== '');
};

const createTokenBalance = async (address: string) => {
  const amount = await getBalance(web3Client, tokenAddress, address);
  return `${address}: ${amount} ETH`;
};

export const getTokenBalancePerWallet = async (wallets: string[]) => {
  const balances = [];
  for (let i = 0; i < wallets.length; i++) {
    const balance = await createTokenBalance(wallets[i]);
    balances.push(balance);
  }
  return balances;
};

export const getWallets = () => {
  const users = getUserAndWallets();
  const addresses = users
    .map(addresses => {
      let address = addresses[1];
      return address;
    })
    .flat();
  return addresses;
};

const getUserAndWallets = () => {
  const wallets = LoadWallets();

  const entries = Object.entries(wallets);
  const values = Object.values(entries);
  return values;
};
