import Web3 from 'web3';
import { tokenAddress } from '../abi/shared';
import { getBalance } from './balanceOf';

describe('getBalance', () => {
  it('should return balance of wallet', async () => {
    // arrange
    const address = '0x9a0d29636f04bc14ad0ffe6a03703115251cdf21';
    const mockweb3 = {
      eth: {
        Contract: jest.fn().mockImplementation(() => ({
          methods: {
            balanceOf: jest.fn().mockImplementation(() => ({
              call: jest.fn().mockResolvedValue('1000000000000000000'), // 1 ETH
            })),
          },
        })),
      },
      utils: {
        fromWei: jest.fn().mockReturnValue('1'), // 1 ETH
      },
    } as unknown as Web3;

    // act
    const balance = await getBalance(mockweb3, tokenAddress, address);

    // assert
    expect(balance?.toString()).toEqual('1');
  });

  it('should return null if address is invalid', async () => {
    // arrange
    const address = 'invalid_address';
    const mockweb3 = {
      eth: {
        Contract: jest.fn().mockImplementation(() => ({
          methods: {
            balanceOf: jest.fn().mockImplementation(() => ({
              call: jest.fn().mockResolvedValue(null),
            })),
          },
        })),
      },
    } as unknown as Web3;

    // act
    const balance = await getBalance(mockweb3, tokenAddress, address);

    // assert
    expect(balance).toBeNull();
  });

  it('should return null if balanceOf call fails', async () => {
    // arrange
    const address = '0x9a0d29636f04bc14ad0ffe6a03703115251cdf21';
    const mockweb3 = {
      eth: {
        Contract: jest.fn().mockImplementation(() => ({
          methods: {
            balanceOf: jest.fn().mockImplementation(() => ({
              call: jest.fn().mockRejectedValue(new Error('Call failed')),
            })),
          },
        })),
      },
    } as unknown as Web3;

    // act
    const balance = await getBalance(mockweb3, tokenAddress, address);

    // assert
    expect(balance).toBeNull();
  });
});
