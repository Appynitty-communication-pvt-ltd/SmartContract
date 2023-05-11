/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { WasteVerificationAbi } from '../resources/abis/wasteVerification.abi';
import Config from 'src/config/configuration';
import { ethers, UnsignedTransaction } from 'ethers';
import { ITripData } from 'src/trips/interfaces/tripData.interface';
const { BigNumber } = ethers;
import { Decimal } from 'decimal.js';

@Injectable()
export class SmartContractsService {
  public getContractInstance(
    contractAddress: string,
    contractAbi: any,
  ): ethers.Contract {
    const provider = new ethers.providers.JsonRpcProvider(Config().rpcLink);
    return new ethers.Contract(contractAddress, contractAbi, provider);
  }

  public getOwnerWallet(): ethers.Wallet {
    const provider = new ethers.providers.JsonRpcProvider(Config().rpcLink);
    return new ethers.Wallet(Config().ownerPrivateKey, provider);
  }

  async addTripData(tripData: ITripData) {
    try {
      const wasteVerificationContractInstance = this.getContractInstance(
        Config().wasteVerificationContractAddress,
        WasteVerificationAbi,
      );
      const ownerWallet = new ethers.Wallet(
        Config().ownerPrivateKey,
        wasteVerificationContractInstance.provider,
      );

      const {
        tripId,
        transId,
        startDateTime,
        endDateTime,
        userId,
        dyId,
        houseList,
        tripNo,
        vehicleNumber,
        totalDryWeight,
        totalGcWeight,
        totalWetWeight,
      } = tripData;

      const unsignedTransaction: UnsignedTransaction =
        await wasteVerificationContractInstance.populateTransaction.upsertTripData(
          Number(tripId),
          transId,
          startDateTime,
          endDateTime,
          Number(userId),
          dyId,
          houseList,
          Number(tripNo),
          vehicleNumber,
          //changing tons to grams and scaling them by a total of 1e12
          BigNumber.from(String(new Decimal(totalGcWeight).times(1e8))).mul(
            BigNumber.from(907185.8188 * 1e4),
          ),
          BigNumber.from(String(new Decimal(totalDryWeight).times(1e8))).mul(
            BigNumber.from(907185.8188 * 1e4),
          ),
          BigNumber.from(String(new Decimal(totalWetWeight).times(1e8))).mul(
            BigNumber.from(907185.8188 * 1e4),
          ),
        );

      await ownerWallet.signTransaction(unsignedTransaction);
      const sentTransaction = await ownerWallet.sendTransaction(
        unsignedTransaction,
      );
      console.log(
        `Transaction Submitted. Waiting for confirmation. Tx Hash - ${sentTransaction.hash}`,
      );
      const txReceipt = await sentTransaction.wait();
      const { transactionHash } = txReceipt;
      return {
        success: true,
        error: null,
        data: transactionHash,
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

  async tripInfo(transId: string) {
    try {
      const wasteVerificationContractInstance = this.getContractInstance(
        Config().wasteVerificationContractAddress,
        WasteVerificationAbi,
      );
      const tripdata = await wasteVerificationContractInstance.getTripData(
        transId,
      );
      console.log(tripdata);
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

  async getTransactionStatus(transactionHash: string) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(Config().rpcLink);
      const transactionReceipt = await provider.getTransactionReceipt(
        transactionHash,
      );
      const transactionDetails = await provider.getTransaction(transactionHash);

      if (transactionReceipt === null) {
        if (transactionDetails === null) {
          return {
            success: false,
            data: null,
            error: null,
            message: 'Invalid Transaction Hash',
          };
        } else {
          return {
            success: false,
            data: null,
            error: null,
            message: 'Pending',
          };
        }
      } else {
        const blockDetails = await provider.getBlock(
          transactionDetails.blockNumber,
        );
        const result = {
          'Transaction Hash': transactionHash,
          Block: transactionDetails.blockNumber,
          Timestamp: blockDetails.timestamp,
          From: transactionDetails.from,
          To: transactionDetails.to,
          Value: String(transactionDetails.value),
          'Gas Price': `${Number(
            ethers.utils.formatUnits(transactionDetails.gasPrice, 'gwei'),
          ).toFixed(4)} Gwei`,
          'Gas Limit': String(transactionDetails.gasLimit),
        };

        const iface = new ethers.utils.Interface(WasteVerificationAbi);
        const parsedData = iface.parseTransaction({
          data: transactionDetails.data,
        });
        if (parsedData && parsedData.args && parsedData.args['_tripId']) {
          //this means this is a upsertTripData transaction, so we can return the input params
          const {
            _tripId,
            _transId,
            _startDateTime,
            _endDateTime,
            _userId,
            _dyId,
            _houseList,
            _tripNo,
            _vehicleNumber,
            _totalGcWeight,
            _totalDryWeight,
            _totalWetWeight,
          } = parsedData.args;

          const inputData = {
            tripId: String(_tripId),
            transId: _transId,
            startDateTime: String(_startDateTime),
            endDateTime: String(_endDateTime),
            userId: String(_userId),
            dyId: _dyId,
            houseList: _houseList,
            tripNo: String(_tripNo),
            vehicleNumber: _vehicleNumber,
            totalDryWeight: String(_totalGcWeight),
            totalGcWeightL: String(_totalDryWeight),
            totalWetWeight: String(_totalWetWeight),
          };
          result['Input Data'] = inputData;
        }

        if (transactionReceipt.status == 1) {
          result['Status'] = 'Success';
          return {
            success: true,
            data: result,
            error: null,
            message: 'Success',
          };
        } else if (transactionReceipt.status == 0) {
          result['Status'] = 'Failed';
          return {
            success: false,
            data: result,
            error: null,
            message: 'Failed',
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error,
        message: 'Invalid Transaction Hash',
      };
    }
  }
}
