## WasteVerification Backend

### Deployed Contracts

| Name | Network | Address |
| :--- | :--- | :--- |
| WasteVerification.sol | Mumbai | [0xfeffe5ab480e8f63543ea200aa827b396773f1e8](https://mumbai.polygonscan.com/address/0xfeffe5ab480e8f63543ea200aa827b396773f1e8#code) |

All the APIs are authenticated by Basic Authentication so make sure to pass the correct username and password while sending the request.


### APIs

#### 1. addTripData

Save Trip Collection Data to contract storage. Same API to be used for updating fields as well.
While updating sata please make sure to send all data as payload (even those that do not require updation).

```solidity
@Post('/trips')
```

#### Parameters (As Body) 

| Name | Type | Description |
| ---- | ---- | ----------- |
| tripId | string | TripId Primary Key of the dumpyard details db. |
| transId | string | TransId Generated key based on AppId, UserId etc. |
| startDateTime | string | Trip Start time in epoch timestamp format based on first house scanned. |
| endDateTime | string | Trip End Time in epoch timestamp format based on the time when the waste is processed at dumpyard. |
| userId | string | Waste Collector UserId. |
| dyId | string | Dumpyard Id. |
| totalNumberOfHouses | string | Total Number of Houses covered |
| houseList | string[] | List of houses from which the waste is collected. |
| tripNo | string | Number of trips completed for this tripId |
| vehicleNumber | string | Vehicle Number of the mode of transport used for waste collection. |
| totalGcWeight | string | Total Weight Collected for the trip in tonnes. |
| totalDryWeight | string | Total Dry Weight Collected for the trip in tonnes. |
| totalWetWeight | string | Total Wet Weight Collected for the trip in tonnes. |
| totalHours | string | Total trip duration in hours |
___

#### Example Payload -

```solidity
{
    "tripId": "24",
    "transId": "3098&17&2022-11-22 12:59:00.995&DYSBA1001&1",
    "startDateTime": "1671002700",
    "endDateTime": "1671006360",
    "userId": "12",
    "dyId": "DYSBA1001",
    "totalNumberOfHouses": "4",
    "houseList": [
        "HPSBA4021",
        "HPSBA4022",
        "HPSBA4023",
        "HPSBA4024"
    ],
    "tripNo": "1",
    "vehicleNumber": "446445",
    "totalGcWeight": "0.003666",
    "totalDryWeight": "0.0015",
    "totalWetWeight": "0.0020",
    "totalHours": "01:01:00"
}
```

### 2. Get Trip Verification Status

Get the current verification status for a TransId.

```solidity
@Get('/trips?transId={transId}')
```

#### Parameters (As Query Param) 
 
| Name | Type | Description |
| ---- | ---- | ----------- |
| transId | string | TransId Key of the dumpyard details db. |
___

#### Example TransId (To be sent in Query Param) -

```solidity
{
    "transId": "3098&17&2022-11-22 12:59:00.995&DYSBA1001&1"
}
```

##### GarbageQuantityVerificationStatus

```solidity
{
  UNINITIALIZED,
  SUCCESS,
  FAILED
}
```


