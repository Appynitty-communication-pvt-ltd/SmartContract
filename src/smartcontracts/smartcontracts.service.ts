/* eslint-disable @typescript-eslint/no-var-requires */
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
import { Injectable } from '@nestjs/common';
import { AbiItem } from 'web3-utils';
import Common from 'ethereumjs-common';
import { RPC_LINK, TRIP_CONTRACT_ADDRESS } from '../constants/index';
import { Householdwaste, Dumpyardwaste } from './interfaces/index';
import { TripcontractAbi } from '../constants/abis/tripcontract.abi';

@Injectable()
export class SmartcontractsService {
  async getContract(address, abi) {
    const OWNER_ADDRRESS = process.env.OWNER_ADDRRESS;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LINK));
    const contract = new web3.eth.Contract(abi as unknown as AbiItem, address, {
      from: OWNER_ADDRRESS,
    });
    return contract;
  }
  async prepareTranscation(contractData) {
    try {
      const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
      const OWNER_ADDRRESS = process.env.OWNER_ADDRRESS;
      const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LINK));
      const privateKey = Buffer.from(OWNER_PRIVATE_KEY, 'hex');
      const txCount = await web3.eth.getTransactionCount(OWNER_ADDRRESS);
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceHex = web3.utils.toHex(gasPrice);
      const gasLimitHex = web3.utils.toHex(3000000);
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: TRIP_CONTRACT_ADDRESS,
        value: '0x0',
        gasLimit: gasLimitHex,
        data: contractData,
        gasPrice: gasPriceHex,
      };
      const common = Common.forCustomChain(
        'mainnet',
        {
          name: 'matic-mumbai', //polygon-mainnet
          networkId: 80001, //137
          chainId: 80001, //137
        },
        'petersburg',
      );
      const tx = new Tx(txObject, { common });
      tx.sign(privateKey);
      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');
      return raw;
    } catch (error) {
      console.log('error', error);
    }
  }
  async addAggregatedHouseholdTripData(houseAggregatorData: Householdwaste) {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LINK));
      const tripContract = await this.getContract(
        web3.utils.toChecksumAddress(TRIP_CONTRACT_ADDRESS),
        TripcontractAbi,
      );
      const contractData = tripContract.methods
        .addAggregatedHouseholdTripData(
          houseAggregatorData.tripId,
          houseAggregatorData.houseIds,
          houseAggregatorData.userId,
          houseAggregatorData.vehicleId,
          houseAggregatorData.tripStartTimestamp,
        )
        .encodeABI();
      const rawTrancation = await this.prepareTranscation(contractData);
      const transcation = await web3.eth.sendSignedTransaction(rawTrancation);
      return {
        success: true,
        error: null,
        data: transcation,
      };
    } catch (error) {
      console.log('error', error);
      return {
        success: false,
        error,
        data: null,
      };
    }
  }
  async addDumpyardTripData(dumpyardwaste: Dumpyardwaste) {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LINK));
      const tripContract = await this.getContract(
        web3.utils.toChecksumAddress(TRIP_CONTRACT_ADDRESS),
        TripcontractAbi,
      );
      const contractData = tripContract.methods
        .addDumpyardTripData(
          dumpyardwaste.tripId,
          dumpyardwaste.dumpyardId,
          dumpyardwaste.totalCollectedWaste,
          dumpyardwaste.tripEndTimestamp,
        )
        .encodeABI();
      const rawTrancation = await this.prepareTranscation(contractData);
      const transcation = await web3.eth.sendSignedTransaction(rawTrancation);
      return {
        success: true,
        error: null,
        data: transcation,
      };
    } catch (error) {
      return {
        success: false,
        error,
        data: null,
      };
    }
  }
  async tripInfo(tripid: string) {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LINK));
      const tripContract = await this.getContract(
        web3.utils.toChecksumAddress(TRIP_CONTRACT_ADDRESS),
        TripcontractAbi,
      );
      const tripdata = await tripContract.methods.tripInfo(tripid).call();
      return {
        success: true,
        data: tripdata,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error,
      };
    }
  }
}
