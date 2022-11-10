export const TripcontractAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
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
        name: 'userId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'totalHousesInTrip',
        type: 'uint256',
      },
    ],
    name: 'AggregatedHouseholdTripData',
    type: 'event',
  },
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
        internalType: 'uint256',
        name: 'tripId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'dumpyardId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'totalCollectedWaste',
        type: 'uint256',
      },
    ],
    name: 'DumpyardTripData',
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
    inputs: [
      { internalType: 'uint256', name: '_tripId', type: 'uint256' },
      { internalType: 'uint256[]', name: '_houseIds', type: 'uint256[]' },
      { internalType: 'uint256', name: '_userId', type: 'uint256' },
      { internalType: 'uint256', name: '_vehicleId', type: 'uint256' },
      { internalType: 'uint256', name: '_tripStartTimestamp', type: 'uint256' },
    ],
    name: 'addAggregatedHouseholdTripData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_tripId', type: 'uint256' },
      { internalType: 'uint256', name: '_dumpyardId', type: 'uint256' },
      {
        internalType: 'uint256',
        name: '_totalCollectedWaste',
        type: 'uint256',
      },
      { internalType: 'uint256', name: '_tripEndTimestamp', type: 'uint256' },
    ],
    name: 'addDumpyardTripData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'averageWasteCollectedPerHouse',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_totalHouses', type: 'uint256' },
    ],
    name: 'calclulateTentativeWasteForHouses',
    outputs: [
      { internalType: 'uint256', name: 'totalTentativeWaste', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tripId', type: 'uint256' }],
    name: 'getTripData',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tripId', type: 'uint256' },
          { internalType: 'uint256[]', name: 'houseIds', type: 'uint256[]' },
          { internalType: 'uint256', name: 'userId', type: 'uint256' },
          { internalType: 'uint256', name: 'vehicleId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'tripStartTimestamp',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'dumpyardId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'totalCollectedWaste',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tripEndTimestamp',
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
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_totalHouses', type: 'uint256' },
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
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'tripInfo',
    outputs: [
      { internalType: 'uint256', name: 'tripId', type: 'uint256' },
      { internalType: 'uint256', name: 'userId', type: 'uint256' },
      { internalType: 'uint256', name: 'vehicleId', type: 'uint256' },
      { internalType: 'uint256', name: 'tripStartTimestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'dumpyardId', type: 'uint256' },
      { internalType: 'uint256', name: 'totalCollectedWaste', type: 'uint256' },
      { internalType: 'uint256', name: 'tripEndTimestamp', type: 'uint256' },
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
];
