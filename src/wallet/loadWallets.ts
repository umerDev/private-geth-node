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
  const users = getUserAndWallets();
  const addresses = users
    .map(addresses => {
      const address = addresses[1];
      return address;
    })
    .flat();
  return addresses;
};

const getUserAndWallets = () => {
  const wallets = loadWallets();
  const entries = Object.entries(wallets);
  const values = Object.values(entries);
  return values;
};
