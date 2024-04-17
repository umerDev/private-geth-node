import {getBalance} from '../contract/balanceOf';
import {IIndexer, TotalValuePerUser} from './IIndexer';
import Web3 from 'web3';
import {tokenAddress} from '../abi/shared';
import {Wallets} from '../wallet/loadWallets';

export default class Indexer implements IIndexer {
  private web3Client: Web3;

  constructor(web3Client: Web3) {
    this.web3Client = web3Client;
  }

  totalTokenBalancePerUser = async (wallets: Wallets) => {
    const totalBalancePerUser: TotalValuePerUser[] = [];
    let currentUser = '';
    let balancerPerWallet: string[] = [];

    const userAndWalletsArr = Object.entries(wallets).flat();
    for (let i = 0; i < userAndWalletsArr.length; i++) {
      const userOrWallet = userAndWalletsArr[i];

      if (Array.isArray(userOrWallet)) {
        for (let u = 0; u < userOrWallet.length; u++) {
          const balance = await getBalance(
            this.web3Client,
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

    return totalBalancePerUser;
  };

  createTokenBalance = async (address: string) => {
    const amount = await getBalance(this.web3Client, tokenAddress, address);
    return `${address}: ${amount} ETH`;
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
