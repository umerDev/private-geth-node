import {
  getTokenBalancePerWallet,
  getWallets,
  totalTokenBalancePerUser,
} from './src/indexer';
(async () => {
  const wallets = getWallets();
  const totalBalancePerUser = await totalTokenBalancePerUser();
  const totalBalancePerWallet = await getTokenBalancePerWallet(wallets);
  console.log('----- Printing totalBalancePerWallet -----\n ');
  console.log(totalBalancePerWallet);
  console.log('\n ----- Printing totalBalancePerUser ----- \n');
  console.log(totalBalancePerUser);
})().catch(e => {
  console.error(`error occured: ${e}`);
});
