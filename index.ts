import Web3 from 'web3';
import Indexer from './src/indexer/indexer';
import { getWallets, loadWallets } from './src/wallet/loadWallets';
(async () => {
  const httpProvider = new Web3.providers.HttpProvider('http://geth-rpc-endpoint:8545');
  const web3Client = new Web3(httpProvider);

  const wallets = getWallets();
  const indexer = new Indexer(web3Client);
  const totalBalancePerUser = await indexer.totalTokenBalancePerUser(loadWallets());
  const totalBalancePerWallet = await indexer.getTokenBalancePerWallet(wallets);
  console.log('----- Printing totalBalancePerWallet -----\n ');
  console.log(totalBalancePerWallet);
  console.log('\n ----- Printing totalBalancePerUser ----- \n');
  console.log(totalBalancePerUser);
})().catch((e) => {
  console.error(`error occured: ${e}`);
});
