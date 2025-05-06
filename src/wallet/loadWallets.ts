import * as fs from 'fs';

export interface Wallets {
  [name: string]: string[];
}

export const loadWallets = () => {
  const wallets: Wallets = JSON.parse(
    fs.readFileSync('addresses.json', 'utf-8')
  );
  return wallets;
};

export const getWallets = () => {
  const wallets = loadWallets();
  // wallets is an object: { [name: string]: string[] }
  // We want to return all addresses as a flat array
  return Object.values(wallets).flat();
};
