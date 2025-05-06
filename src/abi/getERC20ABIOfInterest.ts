import { AbiFragment } from 'web3';
import { ERC20ABI } from './ERC20ABI';

export const getERC20ABIOfInterest = (abiName: string): AbiFragment[] => {
  const arr = [];
  const find = Object.values(ERC20ABI).find((entry) => entry.name === abiName);
  if (find) arr.push(find);
  return arr;
};
