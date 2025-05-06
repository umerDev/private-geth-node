import { BN } from 'bn.js';
import Web3 from 'web3';
import { getERC20ABIOfInterest } from '../abi/getERC20ABIOfInterest';

export const getBalance = async (web3Client: Web3, tokenAddress: string, walletAddress: string) => {
  try {
    const balanceOfAbi = getERC20ABIOfInterest('balanceOf');
    const contract = new web3Client.eth.Contract(balanceOfAbi, tokenAddress);
    const result = await contract.methods.balanceOf(walletAddress).call();

    if (!result || Array.isArray(result)) return null;

    const resultInEther = web3Client.utils.fromWei(result, 'ether');
    return new BN(resultInEther);
  } catch (error) {
    console.error(`[getBalance]: unable to get balance for ${tokenAddress}`, { error });
    return null;
  }
};
