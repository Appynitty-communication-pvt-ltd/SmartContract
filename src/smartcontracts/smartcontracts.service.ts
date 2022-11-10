// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
import { Injectable } from '@nestjs/common';
import { AbiItem } from 'web3-utils';
import { RPC_LINK } from '../constants/index';

@Injectable()
export class SmartcontractsService {
  getContract(address, abi) {
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LINK));
    const contract = new web3.eth.Contract(abi as unknown as AbiItem, address);
    return contract;
  }
}
