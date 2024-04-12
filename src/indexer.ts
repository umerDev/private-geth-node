import {Web3} from 'web3';
import {LoadWallets} from './loadWallets';
import {getBalance} from './balanceOf';

let tokenAddress = '0x0000000000000000000000000000000000001111';
let wallets = LoadWallets();

const httpProvider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3Client = new Web3(httpProvider);

// The token balance for each ethereum address in addresses.json. Format: <address>: <amount> <symbol>
// The total token balance for each user in addresses.json. Format: <user name>: <amount> <symbol>

const createTokenBalance = async (address: string) => {
  const amount = await getBalance(web3Client, tokenAddress, address);
  return `${address}: ${amount} ETH`;
};

export const getTokenBalancePerWallet = async () => {
  const wallets = getWallets();
  const balances = [];
  for (let i = 0; i < wallets.length; i++) {
    const balance = await createTokenBalance(wallets[i]);
    balances.push(balance);
  }
  return balances;
};

const getWallets = () => {
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
  const entries = Object.entries(wallets);
  const values = Object.values(entries);
  return values;
};
