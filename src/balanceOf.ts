import Web3 from 'web3';

const balanceOfABI = [
  {
    constant: true,
    inputs: [{name: '_owner', type: 'address'}],
    name: 'balanceOf',
    outputs: [{name: 'balance', type: 'uint256'}],
    type: 'function',
  },
];

export const getBalance = async (
  web3Client: Web3,
  tokenAddress: string,
  walletAddress: string
) => {
  const contract = new web3Client.eth.Contract(balanceOfABI, tokenAddress);
  const result = await contract.methods.balanceOf(walletAddress).call();
  if (!result) return;

  const resultInEther = web3Client.utils.fromWei(Number(result), 'ether');

  return parseFloat(resultInEther).toFixed(4);
};
