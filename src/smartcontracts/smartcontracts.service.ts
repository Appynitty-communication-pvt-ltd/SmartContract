/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { WasteVerificationAbi } from '../resources/abis/wasteVerification.abi';
import Config from 'src/config/configuration';
import { ethers, UnsignedTransaction } from 'ethers';
import { ITripData } from 'src/trips/interfaces/tripData.interface';
const { BigNumber } = ethers;

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
        gasPrice: BigNumber.from('100000000000'),
      };

      let unsignedTransaction: UnsignedTransaction =
        await wasteVerificationContractInstance.populateTransaction.upsertTripData(
          Number(tripId),
          transId,
          Math.floor(new Date(startDateTime).getTime() / 1000),
          Math.floor(new Date(endDateTime).getTime() / 1000),
          Number(userId),
          dyId,
          houseList,
          Number(tripNo),
          vehicleNumber,
          //changing tons to grams and scaling them
          BigNumber.from(Math.floor(Number(totalDryWeight) * 907185.8188)).mul(
            1e12,
          ),
          BigNumber.from(Math.floor(Number(totalGcWeight) * 907185.8188)).mul(
            1e12,
          ),
          BigNumber.from(Math.floor(Number(totalWetWeight) * 907185.8188)).mul(
            1e12,
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

  async tripInfo(tripid: string) {
    try {
      const wasteVerificationContractInstance = this.getContractInstance(
        Config().wasteVerificationContractAddress,
        WasteVerificationAbi,
      );
      const tripdata = await wasteVerificationContractInstance.tripInfo(tripid);
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
