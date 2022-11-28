export const WasteVerificationAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'newAverageWasteCollectedPerHouse',
        type: 'uint256',
      },
    ],
    name: 'AverageWasteCollectedPerHouseUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'newTolerancePercentage',
        type: 'uint256',
      },
    ],
    name: 'TolerancePercentageUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tripId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'totalHousesInTrip',
        type: 'uint256',
      },
    ],
    name: 'TripData',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tripId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType:
          'enum WasteVerification.GarbageQuantityVerificationStatus',
        name: 'garbageQuantityVerificationStatus',
        type: 'uint8',
      },
    ],
    name: 'TripGarbageQuantityVerificationStatus',
    type: 'event',
  },
  {
    inputs: [],
    name: 'averageWasteCollectedPerHouse',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_totalHouses',
        type: 'uint256',
      },
    ],
    name: 'calclulateTentativeWasteForHouses',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalTentativeWaste',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tripId',
        type: 'uint256',
      },
    ],
    name: 'getTripData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tripId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'transId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDateTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDateTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'dyId',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'houseList',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'tripNo',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'vehicleNumber',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'totalGcWeight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDryWeight',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalWetWeight',
            type: 'uint256',
          },
          {
            internalType:
              'enum WasteVerification.GarbageQuantityVerificationStatus',
            name: 'garbageQuantityVerificationStatus',
            type: 'uint8',
          },
        ],
        internalType: 'struct WasteVerification.TripInfo',
        name: 'trip',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_totalHouses',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_totalCollectedWaste',
        type: 'uint256',
      },
    ],
    name: 'processGarbageQuantityVerificationStatus',
    outputs: [
      {
        internalType:
          'enum WasteVerification.GarbageQuantityVerificationStatus',
        name: 'garbageQuantityVerificationStatus',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tolerancePercentage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tripInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tripId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'transId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startDateTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endDateTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'userId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'dyId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'tripNo',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'vehicleNumber',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'totalGcWeight',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalDryWeight',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalWetWeight',
        type: 'uint256',
      },
      {
        internalType:
          'enum WasteVerification.GarbageQuantityVerificationStatus',
        name: 'garbageQuantityVerificationStatus',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newAverageWasteCollectedPerHouse',
        type: 'uint256',
      },
    ],
    name: 'updateAverageWasteCollectedPerHouseValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newTolerancePercentage',
        type: 'uint256',
      },
    ],
    name: 'updateTolerancePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tripId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_transId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_startDateTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endDateTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_userId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_dyId',
        type: 'string',
      },
      {
        internalType: 'string[]',
        name: '_houseList',
        type: 'string[]',
      },
      {
        internalType: 'uint256',
        name: '_tripNo',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_vehicleNumber',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_totalGcWeight',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_totalDryWeight',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_totalWetWeight',
        type: 'uint256',
      },
    ],
    name: 'upsertTripData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
