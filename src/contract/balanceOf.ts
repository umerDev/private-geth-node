import Web3 from 'web3';
import {getERC20ABIOfInterest} from '../abi/ERC20';
import {BN} from 'bn.js';

export const getBalance = async (
  web3Client: Web3,
  tokenAddress: string,
  walletAddress: string
) => {
  const balanceOfAbi = getERC20ABIOfInterest('balanceOf');
  const contract = new web3Client.eth.Contract(balanceOfAbi, tokenAddress);
  const result = await contract.methods.balanceOf(walletAddress).call();
  if (!result) return;

  const resultInEther = web3Client.utils.fromWei(Number(result), 'ether');

  return new BN(resultInEther);
};
