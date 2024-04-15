import * as fs from 'fs';

export interface Wallets {
  [name: string]: string[];
}

export const LoadWallets = () => {
  const wallets: Wallets = JSON.parse(
    fs.readFileSync('addresses.json', 'utf-8')
  );
  return wallets;
};
