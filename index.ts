import {getTokenBalancePerWallet} from './src/indexer';

(async () => {
  const balances = await getTokenBalancePerWallet();
  console.log(balances);
})().catch(e => {
  console.error(`error occured: ${e}`);
});
