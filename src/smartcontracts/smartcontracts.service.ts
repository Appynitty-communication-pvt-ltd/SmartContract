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

      //For now for quick confirmations on Mumbai
      const transactionOptions = {
        gasPrice: ethers.utils.parseUnits(Config().gasPrice, 'gwei'),
      };

      let unsignedTransaction: UnsignedTransaction =
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

      unsignedTransaction = Object.assign(
        unsignedTransaction,
        transactionOptions,
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
}
