## WasteVerification Backend

### Deployed Contracts

| Name | Network | Address |
| :--- | :--- | :--- |
| WasteVerification.sol | Mumbai | [0xD6D7a34BC015a0dEfa6B342BAC5c9d92Fc5c3D40](https://mumbai.polygonscan.com/address/0xD6D7a34BC015a0dEfa6B342BAC5c9d92Fc5c3D40#code) |


### APIs

#### 1. addTripData

Save Trip Collection Data to contract storage. Same API to be used for updating fields as well.
While updating sata please make sure to send all data as payload (even those that do not require updation).

```solidity
@Post('/:tripId/tripdata')
```

#### Parameters (As Param)
 
| Name | Type | Description |
| ---- | ---- | ----------- |
| tripId | string | TripId Primary Key of the dumpyard details db. |

#### Parameters (As Body) 

| Name | Type | Description |
| ---- | ---- | ----------- |
| tripId | string | TripId Primary Key of the dumpyard details db. |
| transId | string | TransId Generated key based on AppId, UserId etc. |
| startDateTime | string | Trip Start time in Date format based on first house scanned. |
| endDateTime | string | Trip End Time in Date format based on the time when the waste is processed at dumpyard. |
| userId | string | Waste Collector UserId. |
| dyId | string | Dumpyard Id. |
| houseList | string[] | List of houses from which the waste is collected. |
| tripNo | string | Number of trips completed for this tripId |
| vehicleNumber | string | Vehicle Number of the mode of transport used for waste collection. |
| totalGcWeight | string | Total Weight Collected for the trip in tonnes. |
| totalDryWeight | string | Total Dry Weight Collected for the trip in tonnes. |
| totalWetWeight | string | Total Wet Weight Collected for the trip in tonnes. |
___

#### Example Payload -

```solidity
{
    "tripId": "1",
    "transId": "3098&17&2022-11-22 12:59:00.995&DYSBA1001&1",
    "startDateTime": "2022-11-22 12:55:00.997",
    "endDateTime": "2022-11-22 12:56:00.997",
    "userId": "12",
    "dyId": "DYSBA1001",
    "houseList": [
        "HPSBA4021",
        "HPSBA4022",
        "HPSBA4023",
        "HPSBA4024"
    ],
    "tripNo": "1",
    "vehicleNumber": "446445",
    "totalGcWeight": "1.0",
    "totalDryWeight": "1.0",
    "totalWetWeight": "2.0"
}
```

### 2. Get Trip Verification Status

Get the current verification status for a TripId.

```solidity
@Get('/:tripId')
```

#### Parameters (As Param)
 
| Name | Type | Description |
| ---- | ---- | ----------- |
| tripId | string | TripId Primary Key of the dumpyard details db. |

##### GarbageQuantityVerificationStatus

```solidity
{
  UNINITIALIZED,
  SUCCESS,
  FAILED
}
```


