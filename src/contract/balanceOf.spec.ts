// const web3 = Web3 as unknown as jest.Mock<Web3>;

// beforeEach(() => {
// const mockBalanceOf = jest.fn().mockImplementation(() => {
//   return 100;
// });

// const mockContract = {
//   methods: {
//     balanceOf: mockBalanceOf,
//   },
// };
//   web3.mockImplementation(() => ({
//     eth: {
//       Contract: () => {
//         mockContract;
//       },
//     },
//     providers: () => {
//       // eslint-disable-next-line no-unused-labels
//       () => jest.fn().mockImplementation();
//     },
//   }));
// });

// const mockContact = jest.spyOn(web3, 'Contract', 'set');
// const mockProvider = jest.spyOn(web3, 'providers', 'set');

// web3.mockImplementation(() => ({
//   eth: {
//     Contract: () => {
//       mockContract;
//     },
//   },
// }));

// mockProvider.mockImplementation(() => jest.fn());

// const mockClient = {
//   providers: () => jest.fn(),
//   eth: {
//     Contract: () => {
//       jest.fn();
//     },
//   },
// };

// eslint-disable-next-line node/no-unpublished-import
import {mockDeep} from 'jest-mock-extended';
import Web3 from 'web3';
import {getBalance} from './balanceOf';
import {tokenAddress} from '../abi/shared';
jest.mock('web3', () => {
  const web3 = jest.requireActual('web3');
  jest.spyOn(web3, 'Contract').mockReturnValue({
    Contract: () => ({
      methods: jest.fn().mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        balanceOf: (_walletAddress: string) => ({
          call: jest.fn(),
        }),
      })),
    }),
  });

  // jest.spyOn(web3, 'Web3').mockImplementation(() => {
  web3.providers.HttpProvider = jest.fn().mockImplementation(() => 4);
  // });

  return web3;
});

describe('getBalance', () => {
  it('should return balance of wallet', async () => {
    //arrange
    const address = '0x9a0d29636f04bc14ad0ffe6a03703115251cdf21';
    const mockweb3 = mockDeep<Web3>();

    // jest.mock('web3', () => {
    //   const lib = jest.requireActual('web3');

    //   return {
    //     ...lib,
    //     eth: jest.fn().mockImplementation(() => ({
    //       Contract: {
    //         methods: {
    //           balanceOf: jest.fn().mockImplementation(() => ({
    //             call: jest.fn().mockImplementation(),
    //           })),
    //         },
    //       },
    //     })),
    //   };
    // });

    // let mockContracts = jest.fn().mockImplementation(() => ({
    //   contract: {
    //     methods: {
    //       balanceOf: jest.fn().mockImplementation(() => ({
    //         call: jest.fn().mockImplementation(),
    //       })),
    //     },
    //   },
    // }));

    // mockw = {
    //   ...mockw,
    //   eth: {
    //     Contract: jest.fn().mockImplementation(() => {
    //       methods: {
    //         balanceOf: jest.fn();
    //       }
    //     }),
    //   },
    // };

    // const mockc = mockDeep<typeof eth.contract>();
    // const cons = {
    //   Contract: jest.fn().mockImplementation(() => {
    //     balanceOf: jest.fn();
    //   }),
    // };
    mockweb3.providers.HttpProvider = jest.fn();

    //act
    const balance = await getBalance(mockweb3, tokenAddress, address);

    //assert
    expect(balance).toEqual({});
  });
});
