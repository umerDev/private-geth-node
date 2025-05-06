import BN from 'bn.js';
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

  private calcTotal(balances: BN[]): BN {
    return balances.reduce((acc, balance) => acc.add(balance), new BN(0));
  }

  async totalTokenBalancePerUser(wallets: Wallets): Promise<TotalValuePerUser[]> {
    const result: TotalValuePerUser[] = [];

    for (const [user, addresses] of Object.entries(wallets)) {
      const balances: BN[] = [];

      for (const address of addresses) {
        const balance = await getBalance(this.web3Client, tokenAddress, address);
        if (balance) balances.push(balance);
      }

      const total = this.calcTotal(balances);

      result.push({
        user,
        amount: `${total.toString()} ETH`,
      });
    }

    return result;
  }

  async createTokenBalance(address: string): Promise<string> {
    const balance = await getBalance(this.web3Client, tokenAddress, address);
    return `${address}: ${balance?.toString() ?? '0'} ETH`;
  }

  async getTokenBalancePerWallet(wallets: string[]): Promise<string[]> {
    return Promise.all(wallets.map((wallet) => this.createTokenBalance(wallet)));
  }
}
