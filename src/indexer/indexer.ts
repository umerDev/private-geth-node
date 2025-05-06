import * as BN from 'bn.js';
import Web3 from 'web3';
import { tokenAddress } from '../abi/shared';
import { getBalance } from '../contract/balanceOf';
import { Wallets } from '../wallet/loadWallets';
import { IIndexer, TotalValuePerUser } from './IIndexer';

export default class Indexer implements IIndexer {
  private web3Client: Web3;

  constructor(web3Client: Web3) {
    this.web3Client = web3Client;
  }

  calcTotal = (balancerPerWallet: BN[]) => {
    let total = new BN(0);

    for (let i = 0; i < balancerPerWallet.length; i++) {
      total = new BN(balancerPerWallet[i]).add(total);
    }
    return total;
  };

  totalTokenBalancePerUser = async (wallets: Wallets) => {
    const totalBalancePerUser: TotalValuePerUser[] = [];
    let currentUser = '';
    let balancerPerWallet: BN[] = [];

    const userAndWalletsArr = Object.entries(wallets).flat();
    for (let i = 0; i < userAndWalletsArr.length; i++) {
      const userOrWallet = userAndWalletsArr[i];

      if (Array.isArray(userOrWallet)) {
        for (let u = 0; u < userOrWallet.length; u++) {
          const balance = await getBalance(this.web3Client, tokenAddress, userOrWallet[u]);
          if (balance) {
            balancerPerWallet.push(balance);
          }
        }

        const totalBalance = this.calcTotal(balancerPerWallet);

        totalBalancePerUser.push({
          user: currentUser,
          amount: `${totalBalance} ETH`,
        });
      } else {
        currentUser = userOrWallet;
        balancerPerWallet = [];
      }
    }

    return totalBalancePerUser;
  };

  createTokenBalance = async (address: string) => {
    const amount = await getBalance(this.web3Client, tokenAddress, address);
    return `${address}: ${amount?.toString()} ETH`;
  };

  getTokenBalancePerWallet = async (wallets: string[]) => {
    const balances = [];
    for (let i = 0; i < wallets.length; i++) {
      const balance = await this.createTokenBalance(wallets[i]);
      balances.push(balance);
    }
    return balances;
  };
}
