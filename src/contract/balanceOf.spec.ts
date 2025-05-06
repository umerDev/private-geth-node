import Web3 from 'web3';
import { tokenAddress } from '../abi/shared';
import { getBalance } from './balanceOf';

const createMockWeb3 = (resolvedValue: any, shouldReject = false): Web3 => {
  return {
    eth: {
      Contract: jest.fn().mockImplementation(() => ({
        methods: {
          balanceOf: jest.fn().mockImplementation(() => ({
            call: jest
              .fn()
              .mockResolvedValueOnce(resolvedValue)
              .mockRejectedValueOnce(shouldReject ? new Error('Call failed') : undefined),
          })),
        },
      })),
    },
    utils: {
      fromWei: jest.fn().mockReturnValue('1'),
    },
  } as unknown as Web3;
};

describe('getBalance', () => {
  it('should return 1 ETH balance for a valid address', async () => {
    const address = '0x9a0d29636f04bc14ad0ffe6a03703115251cdf21';
    const mockWeb3 = createMockWeb3('1000000000000000000');

    const balance = await getBalance(mockWeb3, tokenAddress, address);
    expect(balance?.toString()).toEqual('1');
  });

  it('should return null if address is invalid or balance is zero', async () => {
    const address = 'invalid_address';
    const mockWeb3 = createMockWeb3(null);

    const balance = await getBalance(mockWeb3, tokenAddress, address);
    expect(balance).toBeNull();
  });

  it('should return null if balanceOf call fails', async () => {
    const address = '0x9a0d29636f04bc14ad0ffe6a03703115251cdf21';
    const mockWeb3 = createMockWeb3(null, true);

    const balance = await getBalance(mockWeb3, tokenAddress, address);
    expect(balance).toBeNull();
  });
});
