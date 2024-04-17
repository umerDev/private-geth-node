import {getERC20ABIOfInterest} from './ERC20';

describe('ERC20', () => {
  it('should get balanceOf erc20 abi', () => {
    //arrange
    const balanceOfAbi = [
      {
        constant: true,
        inputs: [{name: '', type: 'address'}],
        name: 'balanceOf',
        outputs: [{name: '', type: 'uint256'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ];

    //act
    const validAbi = getERC20ABIOfInterest('balanceOf');

    //assert
    expect(validAbi).toEqual(balanceOfAbi);
  });

  it('should get burn erc20 abi', () => {
    //arrange
    const burnAbi = [
      {
        constant: false,
        inputs: [{name: '_value', type: 'uint256'}],
        name: 'burn',
        outputs: [{name: 'success', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];

    //act
    const validAbi = getERC20ABIOfInterest('burn');

    //assert
    expect(validAbi).toEqual(burnAbi);
  });

  it('should get non existing erc20 abi', () => {
    //act
    const validAbi = getERC20ABIOfInterest('randomAbi');

    //assert
    expect(validAbi).toEqual([]);
  });
});
