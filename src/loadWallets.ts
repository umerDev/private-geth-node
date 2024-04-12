import * as fs from 'fs';

export interface Wallets {
  [key: string]: string[];
}

export const LoadWallets = () => {
  let wallets: Wallets = JSON.parse(fs.readFileSync('addresses.json', 'utf-8'));
  return wallets;
};
