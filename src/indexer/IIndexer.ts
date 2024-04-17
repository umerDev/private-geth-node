import {Wallets} from '../wallet/loadWallets';

export interface TotalValuePerUser {
  user: string;
  amount: string;
}

export interface IIndexer {
  totalTokenBalancePerUser(wallets: Wallets): Promise<TotalValuePerUser[]>;
  createTokenBalance(address: string): Promise<string>;
  getTokenBalancePerWallet(wallets: string[]): Promise<string[]>;
}
